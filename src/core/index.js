import { clone } from "../functions/index.js";
import { ErrorCode, ErrorMessage } from "./error.js";
import Database from "./database/index.js";
import Question from "./question/index.js";
import Session from "./session/index.js";
import User from './user/index.js';
import Game from './game/index.js';
import Rank from './rank/index.js';

export default class Core {
    constructor(configure) {
        this.#configure = configure || {};
    }

    #proxy = new Map();
    #configure;
    /** @type {Database} */
    #database;
    /** @type {Question} */
    #question;
    /** @type {Session} */
    #session;
    /** @type {User} */
    #user;
    /** @type {Game} */
    #game;
    /** @type {Rank} */
    #rank;
    #err = ErrorCode;

    /** @readonly */
    get database() { return this.#database; }
    /** @readonly */
    get question() { return this.#question; }
    /** @readonly */
    get user() { return this.#user; }
    /** @readonly */
    get game() { return this.#game; }
    /** @readonly */
    get rank() { return this.#rank; }
    /** @readonly */
    get err() { return this.#err; }

    #setProxy(module, proxy) {
        if(!proxy) return;
        const map = new Map();
        for(const name in proxy)
            map.set(name, proxy[name]);
        this.#proxy.set(module, map);
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
        this.#rank = new Rank(this, this.#configure.rank);

        this.#setProxy('game', this.#game.proxy());

        await this.#database.initialize();
        await this.#question.initialize();
        await this.#user.initialize();
        await this.#game.initialize();
        await this.#rank.initialize();
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
                return;
            case 'connect':
                this.#database.$i(message.database);
                this.#question.$i(message.question);
                this.#user.$i(message.user);
                this.#game.$i(message.game);
                this.#rank.$i(message.rank);
                this.#session.$i(message.session);
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

    errMsg(errorcode) {
        return ErrorMessage[errorcode] || '未知错误';
    }

    async sync(sync) {
        if(!sync) return false;
        const uuid = this.#user.uuid;
        if(!uuid || sync?.$done) return false;
        await this.#database.sync(uuid, clone(sync));
        sync.$done = true;
        return true;
    }
}