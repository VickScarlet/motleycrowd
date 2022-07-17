import { IModule } from "./imodule.js";
import pako from "pako";
export default class Session extends IModule {
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
    #handler;
    #online = NaN;
    #delay = NaN;
    #lastping = 0;

    get #needping() {
        return Date.now() - this.#lastping > 60000;
    }
    get online() { return this.#online; }
    get delay() { return this.#delay; }
    async initialize() {
        const {protocol='ws', host, port, handler} = this.configure;
        this.#protocol = protocol;
        this.#host = host;
        this.#port = port;
        this.#handler = handler;
        await this.#connect();
    }

    get #url() {
        if(this.#host) {
            if(this.#port) return `${this.#protocol}://${this.#host}:${this.#port}`;
            return `${this.#protocol}://${this.#host}`;
        }
        return `${this.#protocol}://${window.location.host}`;
    }

    async #connect() {
        return new Promise(resolve => {
            const start = Date.now();
            const done = (data, online)=>{
                this.#delay = Date.now() - start;
                this.#online = online;
                console.debug("[Session|conn] [delay:%dms] [online:%d] info:", this.#delay, online, data);
                resolve();
            }
            this.#callbacks.set(this.#CONNECT, done);
            this.#ws = new WebSocket(this.#url);
            this.#ws.onmessage = event => this.#onmessage(event.data);
            this.#ws.onclose = ({code, reason}) => this.#onclose(code, reason);
        });
    }

    async #onmessage(message) {
        let data;
        try {
            data = JSON.parse(message);
        } catch(e) {
            const arrayBuffer = await message.arrayBuffer();
            message = pako.inflate(arrayBuffer, { to: 'string' });
            data = JSON.parse(message);
        }
        const [guid, content, attach] = data;
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
            case this.#CONNECT:
            case this.#MESSAGE:
            case this.#REPLY:
            case this.#BORDERCAST:
            default:
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
            const guidF = crypto.randomUUID();
            const L = guidF.length;
            for(let i = 1; i<=L; i++) {
                const guid = guidF.substring(0, i)
                if(this.#callbacks.has(guid)) continue;
                this.#callbacks.set(guid, ret=>resolve(ret));
                this.#send([guid, {c: command, d: data}]);
                return;
            }
        });
    }

    async ping() { 
        if(this.#needping) {
            this.#lastping = Date.now();
            return this.#ping();
        }
        const {delay, online} = this;
        return {delay, online};
    }
}