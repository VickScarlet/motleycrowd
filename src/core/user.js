import cryptoJS from "crypto-js";
import IModule from "./imodule.js";
import { clone } from "../functions/index.js";
export default class User extends IModule {

    #authenticated = false;
    #isguest = false;
    #uuid = null;

    get uuid() { return this.#uuid; }

    async #command(type, data) {
        return this.$core.command(`user.${type}`, data);
    }

    get #autologin() { return !!this.$core.database.kv.get('autologin'); }
    set #autologin(v) { this.$core.database.kv.set('autologin', !!v); }

    get username() { return this.$core.database.kv.get('username'); }
    set username(v) { this.$core.database.kv.set('username', v); }

    get #password() { return this.$core.database.kv.get('password'); }
    set #password(v) { this.$core.database.kv.set('password', v); }

    get authenticated() { return !!this.#authenticated; }
    get isguest() { return !!this.#isguest; }

    async authenticate(username, password, autologin) {
        password = this.#passwordEncrypt(password);
        const {success, data} = await this.#command('authenticate', {username, password});
        this.#uuid = success ?data.uid :null;
        this.#authenticated = success;
        this.#isguest = !success;
        this.#autologin = success && autologin;
        if(this.autologin) {
            this.username = username;
            this.#password = password;
        }
        return success;
    }

    async register(username, password, autologin) {
        password = this.#passwordEncrypt(password);
        const {success, data} = await this.#command('register', {username, password});
        this.#uuid = success ?data.uid :null;
        this.#authenticated = success;
        this.#isguest = !success;
        this.autologin = success && autologin;
        if(this.autologin) {
            this.username = username;
            this.#password = password;
        }
        return success;
    }

    async guest() {
        const {success, data} = await this.#command('guest');
        this.#uuid = success ?data.uid :null;
        this.#authenticated =
        this.#isguest = success;
        return success;
    }

    async logout() {
        if(!this.#authenticated) return {r: true};
        const {success} = await this.#command('logout');
        if(success) this.#uuid = null;
        this.#authenticated =
        this.#isguest =
        this.#autologin = !success;
        return success;
    }

    async autologin() {
        if(!this.#autologin) return [false, true];
        const {success, data} = await this.#command('authenticate', {
            username: this.username, password: this.#password,
        });
        this.#uuid = success ?data.uid :null;
        this.#autologin =
        this.#authenticated = success;
        this.#isguest = !success;
        return [success];
    }

    async #get(uuids) {
        const {success, data} = await this.#command('get', {uids: uuids});
        if(!success) return null;
        const $update = Date.now();
        for(const uuid in data) {
            const [username, meta] = data[uuid];
            const d = {uuid, username, meta, $update};
            await this.$core.database.user.set(d);
            data[uuid] = d;
        }
        return data;
    }

    async get(uuid, onlylocal=false) {
        if(this.isGuest(uuid)) return { uuid, guest: true };
        const now = Date.now();
        const local = await this.$core.database.user.get(uuid);
        if(local && now - local.$update < 30 * 60 * 1000 ) {
            return local;
        }
        if(onlylocal) return null;
        const remote = await this.#get([uuid]);
        if(!remote) return null;
        return remote[uuid];
    }

    async gets(uuids) {
        const data = {};
        const notLocal = [];
        for(const uuid of uuids) {
            const local = await this.get(uuid, true);
            if(local) data[uuid] = local;
            else notLocal.push(uuid);
        }
        if(notLocal.length) {
            const remote = await this.#get(notLocal);
            if(remote) Object.assign(data, remote);
        }
        return data;
    }

    #passwordEncrypt (password) {
        const CMap = 'tz4l/abUX3HDVhwG.pqcrLmsN@Yk+SAEdRBvxy2$7WPog8uFO19jJCZIinQf0MKT';
        const binaryStr = cryptoJS
            .HmacSHA256(password, cryptoJS.MD5(password).toString())
            .toString()
            .split('')
            .map(v=>parseInt(v,16).toString(2).padStart(4,'0'))
            .join('');
        const result = [];
        for(let i=0;i<binaryStr.length;) {
            const code = binaryStr.substring(i, i+6);
            i+=6;
            result.push(CMap[parseInt(code, 2)]);
        }
        return result.join('');
    }

    isGuest(uuid) {
        if(!uuid) return false;
        return uuid[0] == "#";
    }
}