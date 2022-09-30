import ErrorCode from "./errorcode.js";
import Sheet from "./sheet/index.js";
import Database from "./database/index.js";
import Question from "./question/index.js";
import Session from "./session/index.js";
import User from './user/index.js';
import Game from './game/index.js';
import Rank from './rank/index.js';
import Achievement from './achievement/index.js';

export default class Core {
    constructor(configure) {
        this.#configure = configure || {};
    }

    #proxy = new Map();
    #configure;
    /** @type {Database} */
    #sheet;
    /** @type {Sheet} */
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
    /** @type {Achievement} */
    #achievement;
    #err = ErrorCode;

    /** @readonly */
    get sheet() { return this.#sheet; }
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
    get session() { return this.#session; }
    /** @readonly */
    get achievement() { return this.#achievement; }
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
        const cfgs = this.#configure;
        this.#sheet = new Sheet(this, cfgs.sheet);
        this.#database = new Database(this, cfgs.database);
        this.#question = new Question(this, cfgs.question);
        this.#session = new Session(this, cfgs.session, {
            boardcast: data => this.#serverpush('boardcast', data),
            connect: data => this.#serverpush('connect', data),
            message: data => this.#serverpush('message', data),
        });
        this.#user = new User(this, cfgs.user);
        this.#game = new Game(this, cfgs.game);
        this.#rank = new Rank(this, cfgs.rank);
        this.#achievement = new Achievement(this, cfgs.achievement);

        this.#setProxy('game', this.#game.proxy());

        await this.#sheet.initialize();
        await this.#database.initialize();
        await this.#question.initialize();
        await this.#user.initialize();
        await this.#game.initialize();
        await this.#rank.initialize();
        await this.#achievement.initialize();
        await this.#session.initialize();
        $on('debug.push', (action, data)=>
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
                this.#achievement.$i(message.achievement);
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

    async attach(attach) {
        if(!attach) return;
        const [uuid, datas] = attach;
        if(datas.sync)
            await this.#database.sync(uuid, datas.sync);

        for(const type in datas) {
            if(type === 'sync') continue;
            await this.#attach(uuid, type, datas[type]);
        }
    }

    async #attach(uuid, type, data) {
        switch(type) {
            case 0:
            case 'game.resume':
                break;
            default: return;
        }
        await this.#serverpush(
            'message', [type, data]
        );
    }

}