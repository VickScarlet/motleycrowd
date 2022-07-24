import Storage from "./storage.js";
import Session from "./session.js";
import Commander from './cmd/index.js';
import User from './user.js';
import Game from './game.js';

export default class Core {
    constructor(configure) {
        this.#configure = configure || {};
    }

    #configure;
    #storage;
    #session;
    #commander;
    #user;
    #game;

    get storage() { return this.#storage; }
    get user() { return this.#user; }
    get game() { return this.#game; }

    async initialize() {
        this.#storage = new Storage(this, this.#configure.storage);
        this.#session = new Session(this, this.#configure.session, {
            boardcast: (data) => {
                console.debug('[Server|boardcast]', data);
            },
            connect: ({version}, online) => {
                console.debug('[Server|connect] [version:%s] [online:%s]', version, online);
            },
            message: data => this.#serverpush(data),
        });
        this.#commander = new Commander(this, this.#configure.commander,
            (...args)=>this.#session.command(...args)
        );
        this.#user = new User(this, this.#configure.user);
        this.#game = new Game(this, this.#configure.game);

        await this.#session.initialize();
        await this.#commander.initialize();
        await this.#user.initialize();
        await this.#game.initialize();
    }

    async start() {
        return this.#session.start();
    }

    async ping() { return this.#session.ping(); }

    cmd(command, ...args) {
        return this.#commander.do(command, ...args);
    }

    async #serverpush({c,d}) {
        console.debug('[Server|push] [cmd:%s] data:', c, d);
        switch(c) {
            case 'question':
            case 'join':
            case 'leave':
            default:
                const result = await $.ui.serverpush(c, d);
                console.debug('[Local|dopush] [cmd:%s] result:', c, result);
                break;
        }
    }

}