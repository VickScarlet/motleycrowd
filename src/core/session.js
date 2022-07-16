import { IModule } from "./imodule.js";
import pako from "pako";
export default class Session extends IModule {

    #protocol;
    #host;
    #port;
    #ws = null;
    #callbacks = new Map();
    #handler;

    async initialize() {
        const {protocol='ws', host, port, handler} = this.configure;
        this.#protocol = protocol;
        this.#host = host;
        this.#port = port;
        this.#handler = handler;
        this.#connect();
    }

    get #url() {
        if(this.#host) {
            if(this.#port) return `${this.#protocol}://${this.#host}:${this.#port}`;
            return `${this.#protocol}://${this.#host}`;
        }
        return `${this.#protocol}://${window.location.host}`;
    }

    #connect() {
        this.#ws = new WebSocket(this.#url);
        this.#ws.onmessage = event => this.#onmessage(event.data);
        this.#ws.onclose = ({code, reason}) => this.#onclose(code, reason);
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
        console.debug('Received:', ...data);
        switch(data[0]) {
            case -1:
                //hello
                console.info('connect', data[1]);
                break;
            case 2:
                if(this.#callbacks.has(data[1]))
                    this.#callbacks.get(data[1])(data[2]);
                break;
            case 0:
            case 1:
            default:
                if(this.#handler)
                    this.#handler(data[1]);
                break;
        }
    }

    #onclose(code, reason) {
        console.debug(code, reason);
        this.#ws = null;
    }

    #send(data) {
        this.#ws.send(JSON.stringify(data));
    }

    close() {
        this.#ws.close();
    }

    async command(command, data) {
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
}