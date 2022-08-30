import Database from "./database/index.js";
import Question from "./question/index.js";
import Session from "./session.js";
import User from './user.js';
import Game from './game/index.js';

export default class Core {
    constructor(configure) {
        this.#configure = configure || {};
    }

    #proxy = new Map();
    #configure;
    #database;
    #question;
    #session;
    #user;
    #game;

    get database() { return this.#database; }
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
        this.#database = new Database(this, this.#configure.database);
        this.#question = new Question(this, this.#configure.question);
        this.#session = new Session(this, this.#configure.session, {
            boardcast: data => this.#serverpush('boardcast', data),
            connect: data => this.#serverpush('connect', data),
            message: data => this.#serverpush('message', data),
        });
        this.#user = new User(this, this.#configure.user);
        this.#game = new Game(this, this.#configure.game);

        await this.#database.initialize();
        await this.#question.initialize();
        await this.#user.initialize();
        await this.#game.initialize();
        await this.#session.initialize();
        $.on('debug.push', (action, data)=>
            this.#serverpush('message', [action, data])
        );
    }

    async start() {
        return this.#session.start();
    }

    async ping() { return this.#session.ping(); }

    async command(command, data) {
        return this.#session.command(command, data);
    }

    async #serverpush(type, message) {
        switch(type) {
            case 'boardcast':
            case 'connect':
                return;
            case 'message':
            default: break;
        }

        const [sCommand, data] = message;
        if(!sCommand) return;

        const [proxyName, command] = sCommand.split(".");
        const proxy = this.#proxy.get(proxyName);
        if(!proxy || !proxy.has(command)) return;
        proxy.get(command)(data);
    }

}