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
    #lastSettlement = null;

    get room() { return this.#room; }
    get limit() { return this.#limit; }
    get isInRoom() { return this.#isInRoom; }
    get isStarted() { return this.#isStarted; }
    get isPrivate() { return this.#isPrivate; }
    get isReady() { return this.#isReady; }
    get users() { return this.#users; }
    get currentQuestion() { return this.#currentQuestion; }
    get lastSettlement() { return this.#lastSettlement; }

    async initialize() {
        this.$core.proxy('game', {
            user: ([join, leave])=>this.#user(join, leave),
            ready: wait=>this.#ready(wait),
            pending: size=>this.#pending(size),
            question: ([idx, id, picked])=>this.#question(idx, id, picked),
            answer: ([idx, size])=>this.#answer(idx, size),
            settlement: data=>this.#settlement(data),
            resume: data=>this.#resume(data),
        });
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
            this.#join(users);
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
        await this.$core.user.gets(this.#users);
    }

    #leave(uuids) {
        for(const uuid of uuids)
            this.#users.delete(uuid);
    }

    async #user(join, leave) {
        await this.#join(join);
        this.#leave(leave);
        $.emit('game.user', this.#users);
    }

    #ready() {
        this.#isReady = true;
        $.emit('game.ready');
    }

    #pending() {
        this.#isReady = false;
        $.emit('game.pending');
    }

    #question(idx, id, picked) {
        const question = this.$core.question.get(id, picked);
        this.#index = idx;
        this.#currentQuestion = question;
        if(!this.#isStarted) {
            this.#isStarted = true;
            $.emit('game.start');
        }
        $.emit('game.question', question);
    }

    #answer(idx, size) {
        if(idx != this.#index) return;
        const question = this.#currentQuestion;
        if(question) question.size = size;
        $.emit('game.answer', size);
    }

    #settlement(data) {
        const settlement = new SettlementData(
            this.$core.user.uuid,
            this.$core.question.get,
            data,
        );
        this.#lastSettlement = settlement;
        this.clear();
        $.emit('game.settlement', settlement);
    }

    async #resume({info, start, question}) {
        this.#isInRoom = true;
        const {users, limit} = info;
        this.#isPrivate = false;
        this.#limit = limit;
        await this.#join(users);
        if(!start)
            return $.emit('game.resume.room');

        const {idx, id, picked, left, size, answer} = question;
        question = this.$core.question.get(id, picked, left, answer);
        question.size = size;
        this.#isStarted = true;
        this.#index = idx;
        this.#currentQuestion = question;
        $.emit('game.resume.question', {question, answer});
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
    #debug() {
        $.on('debug.game.settlement', data=>{
            const settlement = new SettlementData(
                data.users.includes(this.$core.user.uuid)
                    ?this.$core.user.uuid
                    :data.users[0],
                this.$core.question.get,
                data,
            );
            $.emit('game.settlement', settlement);
        });
    }
}