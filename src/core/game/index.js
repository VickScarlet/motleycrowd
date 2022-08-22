import { IModule } from "../imodule.js";
import SettlementData from "./settlementdata.js";
export default class Game extends IModule {

    #room = '';
    #limit = 0;
    #isGaming = false;
    #isPrivate = false;
    #isReady = false;
    #users = new Map();
    #currentQuestion = null;
    #index = -1;
    #currentAnswerSize = 0;
    #lastSettlement = null;

    get room() { return this.#room; }
    get limit() { return this.#limit; }
    get isGaming() { return this.#isGaming; }
    get isPrivate() { return this.#isPrivate; }
    get isReady() { return this.#isReady; }
    get users() { return this.#users; }
    get currentQuestion() { return this.#currentQuestion; }
    get currentAnswerSize() { return this.#currentAnswerSize; }
    get lastSettlement() { return this.#lastSettlement; }

    async initialize() {
        this.$core.proxy('game', {
            user: ([join, leave])=>this.#user(join, leave),
            ready: wait=>this.#ready(wait),
            pending: size=>this.#pending(size),
            question: ([idx, id, picked])=>this.#question(idx, id, picked),
            answer: ([idx, size])=>this.#answer(idx, size),
            settlement: data=>this.#settlement(data),
        });
    }

    async #command(type, data) {
        return this.$core.command(`game.${type}`, data);
    }

    async pair(type) {
        const {success, data} = await this.#command('pair', {type});
        if(success) {
            const {users, limit} = data;
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
            this.#isPrivate = true;
            this.#room = room;
            this.#limit = limit;
            this.#join(users);
        }
        return success;
    }

    async leave() {
        if(!this.#isGaming) return true;
        const {success} = await this.#command('leave');
        if(success) this.clear();
        return success;
    }

    async answer(answer) {
        if(!this.#currentQuestion) return false;
        const {success} = await this.#command('answer', [
            this.#index, answer
        ]);
        return success;
    }

    #join(users) {
        for(const user of users) {
            const [uuid, guest, username] = user;
            this.#users.set(uuid, {
                uuid, guest, username,
            });
        }
    }

    #leave(uuids) {
        for(const uuid of uuids)
            this.#users.delete(uuid);
    }

    #user(join, leave) {
        this.#join(join);
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
        this.#currentAnswerSize = 0;
        if(!this.#isGaming) {
            this.#isGaming = true;
            $.emit('game.start');
        }
        $.emit('game.question', question);
    }

    #answer(idx, size) {
        if(idx != this.#index) return;
        this.#currentAnswerSize = size;
        $.emit('game.answer', size);
    }

    #settlement(data) {
        this.#lastSettlement = new SettlementData(
            this.$core.user.uuid,
            this.$core.question.get,
            data,
        );

        this.clear();
        $.emit('game.settlement', data);
    }
    clear() {
        this.#room = '';
        this.#limit = 0;
        this.#isGaming = false;
        this.#isReady = false;
        this.#isPrivate = false;
        this.#currentQuestion = null;
        this.#index = -1;
        this.#currentAnswerSize = 0;
        this.#users.clear();
    }
}