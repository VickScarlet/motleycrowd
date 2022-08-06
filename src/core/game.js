import { IModule } from "./imodule.js";
export default class Game extends IModule {

    #room;
    #isGaming = false;
    #isPrivate = false;
    #isReady = false;
    #questions = [];
    #users = new Map();
    #lastSettlement = null;
    #currentQuestion = null;
    #currentAnswerSize = 0;

    get room() { return this.#room; }
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
        const result = await this.#command('pair', {type});
        if(result.r) {
            const {users} = result.info;
            this.#isPrivate = false;
            this.#join(users);
        }
        return result;
    }

    async create(type) {
        const result = await this.#command('create', {type});
        if(result.r) {
            const {room, info: {users}} = result;
            this.#isPrivate = true;
            this.#room = room;
            this.#join(users);
        }
        return result;
    }

    async join(room) {
        const result = await this.#command('join', {room});
        if(result.r) {
            const {users} = result.info;
            this.#isPrivate = true;
            this.#room = room;
            this.#join(users);
        }
        return result;
    }

    async leave() {
        if(!this.#isGaming) return true;
        const result = await this.#command('leave');
        if(result.r) {
            this.#isPrivate = false;
            this.#isGaming = false;
            this.#isReady = false;
            this.#currentQuestion = null;
            this.#currentAnswerSize = 0;
            this.#questions = [];
            this.#users.clear();
        }
        return result;
    }

    async answer(answer) {
        if(!this.#currentQuestion) return {r: false};
        return this.#command('answer', {answer, question: this.currentQuestion.id});
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
        this.#questions.push(question);
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
        this.#isGaming = false;
        this.#isReady = false;
        this.#isPrivate = false;
        this.#currentQuestion = null;
        this.#questions = [];
        this.#currentAnswerSize = 0;
        this.#lastSettlement = data;
        this.#users.clear();
        $.emit('game.settlement', data);
    }
}