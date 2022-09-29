import IModule from "../imodule.js";
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
    #PING = 0;
    #PONG = 1;
    #MESSAGE = 2;
    #BORDERCAST = 3;
    #CONNECT = 4;
    #RESUME = 5;
    #AUTH = 8;
    #LOGOUT = 9;

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
        return `${this.#protocol}://${globalThis.location.host}`;
    }

    async #ws(first) {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(this.#url);
            const open = _ => ws.send(JSON.stringify(first));
            const message = async ({data}) => {
                if(data instanceof Blob) {
                    const arrayBuffer = await data.arrayBuffer();
                    data = pako.inflate(arrayBuffer, { to: 'string' })
                }
                data = JSON.parse(data);
                this.#online = data.pop();
                if(resolve) {
                    this.#client = ws;
                    resolve({ws, data});
                    resolve = null;
                    return;
                }
                this.#onmessage(data);
            };
            const close = ({code, reason}) => this.#onclose(code, reason)
            const error = e => {
                ws.removeEventListener('error', error);
                ws.removeEventListener('open', open);
                ws.removeEventListener('message', message);
                ws.removeEventListener('close', close);
                ws.close();
                reject(e);
            };

            ws.addEventListener('error', error);
            ws.addEventListener('open', open);
            ws.addEventListener('message', message);
            ws.addEventListener('close', close);
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
        return this.#ws([this.#RESUME, this.#sid, this.$user.uuid])
            .then(({data: [, success, sid]})=>{
                console.debug("[Session|resume] resumed [sid:%s] [success:%s]", sid, success);
                this.#sid = sid;
                return [true, success];
            })
            .catch(_=>{
                console.debug('[Session|resume] faild.');
                return [false];
            });
    }

    async #onmessage([guid, content, attach]) {
        await this.$core.attach(attach);
        console.debug('[Session|<<<<] [guid:%s]', guid, content, attach);
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
                $emit('network.kick');
                console.debug('[Session|clse] [code:%d] [reason:%s]', code, reason);
                return;
            case 3002:
                this.$db.kv.set('banned', Date.now()+30 * 60 * 1000);
                $emit('network.banned');
                return;
            case 3003:
                this.$db.kv.set('banned', Infinity);
                $emit('network.banned');
                return;
        }
        const exclude = new Set([
            this.#MESSAGE,
            this.#BORDERCAST,
        ]);
        $emit('network.error');
        const error = new Error(`Network Error`);
        this.#callbacks.forEach((callback, guid) => {
            if(exclude.has(guid)) return;
            this.#callbacks.delete(guid);
            callback(error);
        });
        const circleResume = ()=>this.#resume()
            .then(([success, isAuth])=>{
                if(success)
                    return $emit('network.resume', isAuth);
                circleResume();
            });
        circleResume();
    }

    async #send(id, ...others) {
        if(!this.#client) throw new Error('Network Error');
        switch(id) {
            case this.#PONG:
                this.#client.send(JSON.stringify([id, ...others]));
                return true;
            case this.#PING:
                break;
            default:
                if(this.#callbacks.has(id)) {
                    throw new Error('Duplicate id');
                }
        }
        return new Promise((resolve, reject) => {
            this.#callbacks.set(id, (err, result)=>{
                if(err) return reject(err);
                resolve(result);
            });
            this.#client.send(JSON.stringify([id, ...others]));
        });
    }

    async #ping() {
        console.debug('[Session|ping] ping...');
        const start = Date.now();
        await this.#send(this.#PING);
        const delay = Date.now() - start;
        this.#delay = delay;
        const online = this.#online;
        console.debug('[Session|ping] [delay:%dms] [online:%d]', delay, online);
        return {delay, online};
    }

    #genMessageId() {
        const guidF = uuidGenerator();
        const L = guidF.length;
        for(let i = 1; i<=L; i++) {
            const guid = guidF.substring(0, i)
            if(this.#callbacks.has(guid)) continue;
            return guid;
        }
    }

    /**
     *
     * @param {string} command
     * @param {any} data
     * @return {Promise<{
     *      success: boolean,
     *      code: number,
     *      data?: any,
     * }>}
     */
    async command(command, data) {
        console.debug('[Session|>>>>] [command:%s] data:', command, data);
        return this.#command(this.#genMessageId(), command, data);
    }

    async #command(...args) {
        try {
            const [code, ret] = await this.#send(...args);
            if(code) {
                console.debug('Command error:', code);
                $emit('command.error', code);
            }
            return {
                success: code !== undefined && !code,
                code, data: ret,
            };
        } catch (err) {
            console.error(err);
            $emit('command.error', -1);
            return { success: false, code: -1 };
        }
    }

    async ping() {
        if(this.#client && this.#needping) {
            this.#lastping = Date.now();
            return this.#ping();
        }
        const {delay, online} = this;
        return {delay, online};
    }

    #AUTH_REGISTER = 0;
    #AUTH_LOGIN = 1;
    #AUTH_GUEST = 2;
    async authenticate(username, password) {
        const gsync = await this.$db.gsync(username);
        return this.#command(
            this.#AUTH,
            this.#AUTH_LOGIN,
            username,
            password,
            gsync,
        ).then(({data})=>data||null);
    }

    async register(username, password) {
        return this.#command(
            this.#AUTH,
            this.#AUTH_REGISTER,
            username,
            password,
        ).then(({data})=>data||null);
    }

    async guest() {
        return this.#command(
            this.#AUTH,
            this.#AUTH_GUEST,
        ).then(({data})=>data||null);
    }

    async logout() {
        return this.#command(
            this.#LOGOUT
        ).then(({success})=>success);
    }
}