import Session from "./session.js";
import Commander from './cmd/index.js';
import User from './user.js';

export default class Core {
    constructor(configure) {
        this.#configure = configure || {};
    }

    #configure;
    #session;
    #commander;
    #user;
    get user() { return this.#user; }

    async initialize() {
        this.#configure.session.handler = data=>this.serverCommand(data)
        this.#session = new Session(this, this.#configure.session);
        this.#commander = new Commander(this, this.#configure.commander,
            (...args)=>this.#session.command(...args)
        );
        this.#user = new User(this, this.#configure.user);

        await this.#session.initialize();
        await this.#commander.initialize();
        await this.#user.initialize();
    }

    cmd(command, ...args) {
        return this.#commander.do(command, ...args);
    }

    serverCommand({c,d}) {
        switch(c) {
            case 'question':
            // case '':
            default:
                console.debug('serverCommand', c,d);
                break;
        }
    }

}