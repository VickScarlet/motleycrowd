import { IModule } from "./imodule.js";
import pako from "pako";
import { v4 as uuidGenerator } from 'uuid';

export default class Session extends IModule {
    constructor(parent, configure, {
        connect, boardcast, message,
    }) {
        super(parent, configure);
        this.#onconnect = connect;
        this.#callbacks.set(this.#BORDERCAST, boardcast);
        this.#callbacks.set(this.#MESSAGE, message);
    }

    #CONNECT = 0;
    #PING = 1;
    #PONG = 2;
    #MESSAGE = 3
    #REPLY = 4;
    #BORDERCAST = 9;

    #protocol;
    #host;
    #port;
    #ws = null;
    #callbacks = new Map();
    #online = NaN;
    #delay = NaN;
    #lastping = 0;
    #onconnect;
    #suid;

    get #needping() {
        return Date.now() - this.#lastping > 60000;
    }
    get online() { return this.#online; }
    get delay() { return this.#delay; }
    async initialize() {
        const {protocol='ws', host, port} = this.$configure;
        this.#protocol = protocol;
        this.#host = host;
        this.#port = port;
    }

    async start() {
        return this.#connect();
    }

    get #url() {
        if(this.#host) {
            if(this.#port) return `${this.#protocol}://${this.#host}:${this.#port}`;
            return `${this.#protocol}://${this.#host}`;
        }
        return `${this.#protocol}://${window.location.host}`;
    }

    async #connect() {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const done = async (data, [online, suid])=>{
                this.#delay = Date.now() - start;
                this.#online = online;
                console.debug("[Session|conn] [delay:%dms] [online:%d] [uuid:%s] info:", this.#delay, online, suid, data);
                this.#suid = suid;
                await this.#onconnect(data, online);
                resolve();
            }
            this.#callbacks.set(this.#CONNECT, done);
            this.#ws = new WebSocket(this.#url);
            this.#ws.onmessage = event => this.#onmessage(event.data);
            this.#ws.onclose = ({code, reason}) => this.#onclose(code, reason);
            this.#ws.onerror = e => reject(e);
        });
    }

    async #onmessage(message) {
        const [guid, content, attach] = JSON.parse(
            message instanceof Blob
            ? pako.inflate(await message.arrayBuffer(), { to: 'string' })
            : message
        );
        console.debug('[Session|<<<<] [guid:%s] content:', guid, content, 'attach:', attach);
        const callback = index=>{
            if(!this.#callbacks.has(index)) return;
            this.#callbacks.get(index)(content, attach);
            this.#callbacks.delete(index);
        }
        switch(guid) {
            case this.#PING:
                this.#send([this.#PONG]);
                break;
            case this.#PONG:
                callback(this.#PING);
                break;
            case this.#MESSAGE:
            case this.#BORDERCAST:
                this.#online = attach;
                this.#callbacks.get(guid)(content, attach);
                break;
            case this.#CONNECT:
            case this.#REPLY:
            default:
                this.#online = attach;
                callback(guid);
                break;
        }
    }

    #onclose(code, reason) {
        console.debug('[Session|clse] [code:%d] [reason:%s]', code, reason);
        this.#ws = null;
    }

    #send(data) {
        this.#ws.send(JSON.stringify(data));
    }

    close() {
        this.#ws.close();
    }

    #ping() {
        console.debug('[Session|ping] ping...');
        return new Promise((resolve, reject) => {
            let called = false;
            const start = Date.now();
            const done = online=>{
                if(called) return;
                called = true;
                const delay = Date.now() - start;
                this.#online = online;
                this.#delay = delay;
                console.debug('[Session|ping] [delay:%dms] [online:%d]', delay, online);
                resolve({delay, online});
            }
            this.#callbacks.set(this.#PING, done);
            this.#send([this.#PING]);
        });
    }

    async command(command, data) {
        console.debug('[Session|>>>>] [command:%s] data:', command, data);
        return new Promise(resolve => {
            const guidF = uuidGenerator();
            const L = guidF.length;
            for(let i = 1; i<=L; i++) {
                const guid = guidF.substring(0, i)
                if(this.#callbacks.has(guid)) continue;
                this.#callbacks.set(guid, ([code, ret])=>{
                    // hook error
                    const success = code !== undefined && !code;
                    if(code) {
                        console.debug('Command error:', code);
                    }
                    resolve({ success, code, data: ret });
                });
                this.#send([guid, {c: command, d: data}]);
                return;
            }
        });
    }

    async ping() {
        if(this.#ws && this.#needping) {
            this.#lastping = Date.now();
            return this.#ping();
        }
        const {delay, online} = this;
        return {delay, online};
    }
}