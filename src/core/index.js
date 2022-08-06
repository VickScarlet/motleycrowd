import Storage from "./storage.js";
import Question from "./question/index.js";
import Session from "./session.js";
import User from './user.js';
import Game from './game.js';

export default class Core {
    constructor(configure) {
        this.#configure = configure || {};
    }

    #proxy = new Map();
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

    proxy(proxy, cmds) {
        if(this.#proxy.has(proxy)) {
            console.info('[System] proxy <%s> %s', proxy, 'already exists.');
            return;
        }
        const map = new Map();
        for(const cmd in cmds)
            map.set(cmd, cmds[cmd]);
        this.#proxy.set(proxy, map);
    }

    async initialize() {
        this.#storage = new Storage(this, this.#configure.storage);
        this.#question = new Question(this, this.#configure.question);
        this.#session = new Session(this, this.#configure.session, {
            boardcast: data => this.#serverpush('boardcast', data),
            connect: data => this.#serverpush('connect', data),
            message: data => this.#serverpush('message', data),
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

    async #serverpush(type, data) {
        switch(type) {
            case 'boardcast':
            case 'connect':
                return;
            case 'message':
            default: break;
        }

        const {c,d} = data;
        if(!c) return;

        const [p, cmd] = c.split(".");
        const proxy = this.#proxy.get(p);
        if(!proxy || !proxy.has(cmd)) return;
        proxy.get(cmd)(d);
    }

}