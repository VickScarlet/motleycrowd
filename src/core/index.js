import Storage from "./storage.js";
import Question from "./question/index.js";
import Session from "./session.js";
import User from './user.js';
import Game from './game.js';

export default class Core {
    constructor(configure) {
        this.#configure = configure || {};
    }

    #configure;
    #storage;
    #question;
    #session;
    #user;
    #game;

    get storage() { return this.#storage; }
    get question() { return this.#question; }
    get user() { return this.#user; }
    get game() { return this.#game; }

    async initialize() {
        this.#storage = new Storage(this, this.#configure.storage);
        this.#question = new Question(this, this.#configure.question);
        this.#session = new Session(this, this.#configure.session, {
            boardcast: (data) => {
                console.debug('[Server|boardcast]', data);
            },
            connect: ({version}, online) => {
                console.debug('[Server|connect] [version:%s] [online:%s]', version, online);
            },
            message: data => this.#serverpush(data),
        });
        this.#user = new User(this, this.#configure.user);
        this.#game = new Game(this, this.#configure.game);

        await this.#session.initialize();
        await this.#user.initialize();
        await this.#game.initialize();
    }

    async start() {
        return this.#session.start();
    }

    async ping() { return this.#session.ping(); }

    async command(command, data) {
        return this.#session.command(command, data);
    }

    async #serverpush({c,d}) {
        console.debug('[Server|push] [cmd:%s] data:', c, d);
        switch(c) {
            case 'game.user':
            case 'game.ready':
            case 'game.question':
            case 'game.answer':
            case 'game.settlement':
            default:
                const result = await $.ui.serverpush(c, d);
                console.debug('[Local|dopush] [cmd:%s] result:', c, result);
                break;
        }
    }

}