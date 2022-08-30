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
    #RESUME = 5;
    #BORDERCAST = 9;

    #protocol;
    #host;
    #port;
    #client = null;
    #callbacks = new Map();
    #online = NaN;
    #delay = NaN;
    #lastping = 0;
    #onconnect;
    #sid;

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

    async #ws(first) {
        return new Promise((resolve, reject) => {
            let message, close;
            const ws = new WebSocket(this.#url);
            ws.addEventListener('open', _ => {
                message = async data => {
                    message = this.#onmessage.bind(this);
                    close = ({code, reason}) => this.#onclose(code, reason);
                    this.#client = ws;
                    resolve({ws, data});
                };
                ws.send(JSON.stringify(first));
            });
            ws.addEventListener('error', e => reject(e));
            ws.addEventListener('message', async ({data}) => {
                if(!message) return;
                if(data instanceof Blob) {
                    const arrayBuffer = await data.arrayBuffer();
                    data = pako.inflate(arrayBuffer, { to: 'string' })
                }
                data = JSON.parse(data);
                this.#online = data.pop();
                message(data);
            });
            ws.addEventListener('close', e => close?.(e));
        });
    }

    async #connect() {
        return this.#ws([this.#CONNECT])
            .then(({data: [, info, sid]}) => {
                console.debug("[Session|conn] [sid:%s] info:", sid, info);
                this.#sid = sid;
                this.#onconnect(info);
                return true;
            });
    }

    async #resume() {
        if(!this.#sid) return this.#connect();
        console.debug('[Session|resume] trying [sid:%s]', this.#sid);
        return this.#ws([this.#RESUME, this.#sid])
            .then(_=>{
                console.debug("[Session|resume] resumed.");
                return true;
            })
            .catch(_=>{
                console.debug('[Session|resume] faild.');
                return false;
            });
    }

    async #onmessage([guid, content]) {
        console.debug('[Session|<<<<] [guid:%s] content:', guid, content);
        const callback = index=>{
            if(!this.#callbacks.has(index)) return;
            this.#callbacks.get(index)(null, content);
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
                this.#callbacks.get(guid)(content);
                break;
            case this.#REPLY:
            default:
                callback(guid);
                break;
        }
    }

    #onclose(code, reason) {
        this.#client = null;
        switch(code) {
            case 3000:
            case 3001:
                $.emit('network.kick');
                console.debug('[Session|clse] [code:%d] [reason:%s]', code, reason);
                return;
        }
        const exclude = new Set([
            this.#MESSAGE,
            this.#BORDERCAST,
        ]);
        $.emit('network.error');
        const error = new Error(`Network Error`);
        this.#callbacks.forEach((callback, guid) => {
            if(exclude.has(guid)) return;
            this.#callbacks.delete(guid);
            callback(error);
        });
        const circleResume = ()=>this.#resume()
            .then(success=>{
                if(success)
                    return $.emit('network.resume');
                circleResume();
            });
        circleResume();
    }

    #send(data) {
        this.#client.send(JSON.stringify(data));
    }

    close() {
        this.#client.close();
    }

    #ping() {
        console.debug('[Session|ping] ping...');
        return new Promise(resolve => {
            let called = false;
            const start = Date.now();
            const done = err=>{
                const online = this.#online;
                if(err) {
                    resolve({online, delay: this.#delay});
                    return;
                }
                if(called) return;
                called = true;
                const delay = Date.now() - start;
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
                this.#callbacks.set(guid, (err, result)=>{
                    if(err) {
                        console.error(err);
                        resolve({ success: false, code: -1});
                        return;
                    }
                    const [code, ret] = result;
                    // hook error
                    const success = code !== undefined && !code;
                    if(code) {
                        console.debug('Command error:', code);
                        $.emit('command.error', code);
                    }
                    resolve({ success, code, data: ret });
                });
                const message = [guid,command];
                if(data!==undefined) message.push(data);
                this.#send(message);
                return;
            }
        });
    }

    async ping() {
        if(this.#client && this.#needping) {
            this.#lastping = Date.now();
            return this.#ping();
        }
        const {delay, online} = this;
        return {delay, online};
    }
}