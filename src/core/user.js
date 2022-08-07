import cryptoJS from "crypto-js";
import { IModule } from "./imodule.js";
export default class User extends IModule {

    #authenticated = false;
    #isguest = false;

    async #command(type, data) {
        return this.$core.command(`user.${type}`, data);
    }

    get #autologin() { return !!this.$core.storage.get('autologin'); }
    set #autologin(v) { this.$core.storage.set('autologin', !!v); }

    get username() { return this.$core.storage.get('username'); }
    set username(v) { this.$core.storage.set('username', v); }

    get #password() { return this.$core.storage.get('password'); }
    set #password(v) { this.$core.storage.set('password', v); }

    get authenticated() { return !!this.#authenticated; }
    get isguest() { return !!this.#isguest; }

    async authenticate(username, password, autologin) {
        password = this.#passwordEncrypt(password);
        const {success} = await this.#command('authenticate', {username, password});
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
        const {success} = await this.#command('register', {username, password});
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
        const {success} = await this.#command('guest');
        this.#authenticated =
        this.#isguest = success;
        return success;
    }

    async logout() {
        if(!this.#authenticated) return {r: true};
        const {success} = await this.#command('logout');
        this.#authenticated =
        this.#isguest =
        this.#autologin = !success;
        return success;
    }

    async autologin() {
        if(!this.#autologin) return [false, true];
        const {success} = await await this.#command('authenticate', {
            username: this.username, password: this.#password,
        });
        this.#autologin =
        this.#authenticated = success;
        this.#isguest = !success;
        return [success];
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
            const code = binaryStr.substring(i, i+=6);
            result.push(CMap[parseInt(code, 2)]);
        }
        return result.join('');
    }

}