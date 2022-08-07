import { IModule } from "./imodule.js";
export default class Game extends IModule {

    #room = '';
    #limit = 0;
    #isGaming = false;
    #isPrivate = false;
    #isReady = false;
    #users = new Map();
    #currentQuestion = null;
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
            user: ({join, leave})=>this.#user(join, leave),
            ready: wait=>this.#ready(wait),
            pending: size=>this.#pending(size),
            question: ({id})=>this.#question(id),
            answer: ({id, size})=>this.#answer(id, size),
            settlement: data=>this.#settlement(data),
        });
    }

    async #command(type, data) {
        return this.$core.command(`game.${type}`, data);
    }

    async pair(type) {
        const {r, info} = await this.#command('pair', {type});
        if(r) {
            const {users, limit} = info;
            this.#isPrivate = false;
            this.#limit = limit;
            this.#join(users);
        }
        return r;
    }

    async create(type) {
        const {r, room, info} = await this.#command('create', {type});
        if(r) {
            const {users, limit} = info;
            this.#isPrivate = true;
            this.#room = room;
            this.#limit = limit;
            this.#join(users);
        }
        return r;
    }

    async join(room) {
        const {r, info} = await this.#command('join', {room});
        if(r) {
            const {users, limit} = info;
            this.#isPrivate = true;
            this.#room = room;
            this.#limit = limit;
            this.#join(users);
        }
        return r;
    }

    async leave() {
        if(!this.#isGaming) return true;
        const {r} = await this.#command('leave');
        if(r) this.clear();
        return r;
    }

    async answer(answer) {
        if(!this.#currentQuestion) return false;
        const {r} = await this.#command('answer', {
            answer, question: this.#currentQuestion.id
        });
        return r;
    }

    #join(users) {
        for(const user of users) {
            const [uid, guest, username] = user;
            this.#users.set(uid, {
                uid, guest, username,
            });
        }
    }

    #leave(uids) {
        for(const uid of uids)
            this.#users.delete(uid);
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

    #question(id) {
        const question = this.$core.question.get(id);
        this.#currentQuestion = question;
        this.#currentAnswerSize = 0;
        if(!this.#isGaming) {
            this.#isGaming = true;
            $.emit('game.start');
        }
        $.emit('game.question', question);
    }

    #answer(id, size) {
        if(!this.#currentQuestion) return;
        if(id != this.#currentQuestion.id) return;
        this.#currentAnswerSize = size;
        $.emit('game.answer', size);
    }

    #settlement(data) {
        this.#lastSettlement = data;
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
        this.#currentAnswerSize = 0;
        this.#users.clear();
    }
}