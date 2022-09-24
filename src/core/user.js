import cryptoJS from "crypto-js";
import IModule from "./imodule.js";
export default class User extends IModule {

    #authenticated = false;
    #isguest = false;
    #uuid = null;

    get uuid() { return this.#uuid; }

    async #command(type, data) {
        return this.$core.command(`user.${type}`, data);
    }

    get #autologin() { return !!this.$db.kv.get('autologin'); }
    set #autologin(v) { this.$db.kv.set('autologin', !!v); }

    get username() { return this.$db.kv.get('username'); }
    set username(v) { this.$db.kv.set('username', v); }

    get #password() { return this.$db.kv.get('password'); }
    set #password(v) { this.$db.kv.set('password', v); }

    get authenticated() { return !!this.#authenticated; }
    get isguest() { return !!this.#isguest; }

    async initialize() {
        $.on('network.resume', isAuth=>{
            if(isAuth) return;
            this.#uuid = null;
            this.#authenticated = false;
            this.#isguest = false;
        })
    }

    async #authenticate(username, password) {
        const sync = await this.$db.gsync(username);
        const {success, data, sync: s} = await this.#command(
            'authenticate',
            {username, password, sync}
        );
        this.#uuid = success ?data.uid :null;
        this.#authenticated = success;
        this.#isguest = !success;
        await this.$core.sync(s);
        return success;
    }


    async authenticate(username, password, autologin) {
        password = this.#passwordEncrypt(password);
        const result = await this.#authenticate(username, password);
        this.#autologin = result && autologin;
        if(this.#autologin) {
            this.username = username;
            this.#password = password;
        }
        return result;
    }

    async register(username, password, autologin) {
        password = this.#passwordEncrypt(password);
        const {success, data} = await this.#command('register', {username, password});
        this.#uuid = success ?data.uid :null;
        this.#authenticated = success;
        this.#isguest = !success;
        this.#autologin = success && autologin;
        if(this.#autologin) {
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
        return [await this.#authenticate(
            this.username, this.#password
        )];
    }

    #isexpired(update) {
        return Date.now() - 60*60*1000 > update;
    }

    async #gets(uuids) {
        const remote = [];
        const users = {};
        for(const uuid of uuids) {
            if(this.isGuest(uuid)) {
                users[uuid] = { uuid, guest: true };
                continue;
            }
            const local = await this.$db.user.get(uuid);
            if(local) {
                if( local.uuid === this.#uuid ||
                    !this.#isexpired(local.$update)
                ) {
                    users[uuid] = local;
                    continue;
                }
            }
            remote.push(uuid);
        }
        if(remote.length) {
            const {success, data} = await this.#command('get', remote);
            if(!success) return list;
            const $update = Date.now();
            for(const uuid in data) {
                const [username, meta] = data[uuid];
                const d = {uuid, username, meta, $update};
                await this.$db.user.set(d);
                users[uuid] = d;
            }
        }
        return users;
    }

    async get(uuid) {
        if(!uuid) return null;
        const users = await this.#gets([''+uuid]);
        return users[uuid] || null;
    }

    async gets(uuids) {
        uuids = [...uuids].filter(v=>!!v).map(v=>''+v);
        return this.#gets([...new Set(uuids)]);
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