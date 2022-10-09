import IModule from "../imodule.js";
import SettlementData from "./settlementdata.js";
export default class Game extends IModule {

    #room = '';
    #limit = 0;
    #isInRoom = false;
    #isStarted = false;
    #isPrivate = false;
    #isReady = false;
    #users = new Set();
    #currentQuestion = null;
    #index = -1;
    #page = 0;

    get room() { return this.#room; }
    get limit() { return this.#limit; }
    get isInRoom() { return this.#isInRoom; }
    get isStarted() { return this.#isStarted; }
    get isPrivate() { return this.#isPrivate; }
    get isReady() { return this.#isReady; }
    get users() { return this.#users; }
    get currentQuestion() { return this.#currentQuestion; }

    proxy() {
        return {
            user: ([join, leave])=>this.#user(join, leave),
            ready: wait=>this.#ready(wait),
            pending: size=>this.#pending(size),
            question: ([idx, id, picked])=>this.#question(idx, id, picked),
            answer: ([idx, size])=>this.#answer(idx, size),
            settlement: data=>this.#settlement(data),
            resume: data=>this.#resume(data),
        };
    }

    async initialize() {
        const {page} = this.$configure;
        this.#page = page;
        this.#debug();
    }

    async #command(type, data) {
        return this.$core.command(`game.${type}`, data);
    }

    async pair(type) {
        const {success, data} = await this.#command('pair', {type});
        if(success) {
            const {users, limit} = data;
            this.#isInRoom = true;
            this.#isPrivate = false;
            this.#limit = limit;
            await this.#join(users);
        }
        return success;
    }

    async create(type) {
        const {success, data} = await this.#command('create', {type});
        if(success) {
            const {room, info: {users, limit}} = data;
            this.#isInRoom = true;
            this.#isPrivate = true;
            this.#room = room;
            this.#limit = limit;
            this.#join(users);
        }
        return success;
    }

    async join(room) {
        const {success, data} = await this.#command('join', {room});
        if(success) {
            const {users, limit} = data;
            this.#isInRoom = true;
            this.#isPrivate = true;
            this.#room = room;
            this.#limit = limit;
            this.#join(users);
        }
        return success;
    }

    async leave() {
        if(!this.#isInRoom) return true;
        const {success} = await this.#command('leave');
        if(success) this.clear();
        return success;
    }

    async answer(answer) {
        if(!this.#currentQuestion) return false;
        const question = this.#currentQuestion;
        const {success} = await this.#command('answer', [
            this.#index, answer
        ]);
        if(success) question.answer = answer;
        return success;
    }

    async #join(uuids) {
        for(const uuid of uuids) {
            this.#users.add(uuid);
        }
        await this.$user.gets(this.#users);
    }

    #leave(uuids) {
        for(const uuid of uuids)
            this.#users.delete(uuid);
    }

    async #user(join, leave) {
        await this.#join(join);
        this.#leave(leave);
        $emit('game.user', this.#users);
    }

    #ready() {
        this.#isReady = true;
        $emit('game.ready');
    }

    #pending() {
        this.#isReady = false;
        $emit('game.pending');
    }

    #question(idx, id, picked) {
        const question = this.$core.question.get(id, picked);
        this.#index = idx;
        this.#currentQuestion = question;
        if(!this.#isStarted) {
            this.#isStarted = true;
            $emit('game.start');
        }
        $emit('game.question', question);
    }

    #answer(idx, size) {
        if(idx != this.#index) return;
        const question = this.#currentQuestion;
        if(question) question.size = size;
        $emit('game.answer', size);
    }

    async #settlement(data) {
        await this.$db.settlement.set(data);
        this.clear();
        $emit('game.settlement', data);
    }

    async #resume({info, start, question}) {
        this.#isInRoom = true;
        const {users, limit} = info;
        this.#isPrivate = false;
        this.#limit = limit;
        await this.#join(users);
        if(!start)
            return $emit('game.resume.room');

        const {idx, id, picked, left, size, answer} = question;
        question = this.$question.get(id, picked, left, answer);
        question.size = size;
        this.#isStarted = true;
        this.#index = idx;
        this.#currentQuestion = question;
        $emit('game.resume.question', {question, answer});
    }

    clear() {
        this.#room = '';
        this.#limit = 0;
        this.#isInRoom = false;
        this.#isStarted = false;
        this.#isReady = false;
        this.#isPrivate = false;
        this.#currentQuestion = null;
        this.#index = -1;
        this.#users.clear();
    }

    async get(settlement) {
        const local = await this.$db.settlement.get(settlement);
        if(local) return local;
        const {success, data} = await this.#command('get', settlement);
        if(!success) return null;
        await this.$db.settlement.set(data);
        return data;
    }

    async pages() {
        const total = await this.total();
        if(!total) return 0;
        return Math.ceil(total / this.#page);
    }

    async total() {
        const uuid = this.$user.uuid;
        const {c:{priv,pair}={}} = await this.$db.record.gets(uuid);
        return (priv||0) + (pair||0);
    }

    async history(page) {
        const total = await this.total();
        if(!total) return [];
        const uuid = this.$user.uuid;
        const local = await this.$db.history.gets(uuid);
        const p = this.#page;
        const skip = page * p;
        let start = total - skip;
        const end = Math.max(start+p, 0);
        start = Math.max(start, 0);
        const map = new Map();
        const list = [];
        for(let i=start; i<end; i++) {
            const l = local.get(i);
            if(l) {
                map.set(i, l);
                continue;
            }
            list.push(i);
        }
        if(list.length > 0) {
            const min = list[0];
            const max = list.pop() + 1;
            const {success, data} = await this.#command('history', [min, max-min]);
            if(!success) return [];
            for(let i=0; i<data.length; i++) {
                map.set(min+i, data[i]);
            }
            await this.$db.history.puts(uuid, map);
        }
        return Array.from(map.values()).reverse();
    }

    packSettlement(data) {
        const uuid = this.$user.uuid;
        const {questions, scores} = data;
        return new SettlementData(
            uuid,
            questions.map(
                ([q,p])=>this.$question.get(q,p)
            ),
            scores
        );
    }

    #debug() {
        $on('debug.game.settlement', data=>{
            $emit('game.settlement', data);
        });
    }
}