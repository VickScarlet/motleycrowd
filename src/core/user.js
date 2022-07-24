import cryptoJS from "crypto-js";
import { IModule } from "./imodule.js";
export default class User extends IModule {

    #authenticated = false;
    #isguest = false;

    get #autologin() { return !!this.core.storage.get('autologin'); }
    set #autologin(v) { this.core.storage.set('autologin', !!v); }

    get username() { return this.core.storage.get('username'); }
    set username(v) { this.core.storage.set('username', v); }

    get #password() { return this.core.storage.get('password'); }
    set #password(v) { this.core.storage.set('password', v); }

    get authenticated() { return !!this.#authenticated; }
    get isguest() { return !!this.#isguest; }

    async authenticate(username, password, autologin) {
        password = this.#passwordEncrypt(password);
        const result = await this.core.cmd(
            'user.authenticate', username, password
        );
        this.#authenticated = result.r;
        this.#isguest = !result.r;
        this.#autologin = result.r && autologin;
        if(this.autologin) {
            this.username = username;
            this.#password = password;
        }
        return result;
    }

    async register(username, password, autologin) {
        password = this.#passwordEncrypt(password);
        const result = await this.core.cmd(
            'user.register', username, password
        );
        this.#authenticated = result.r;
        this.#isguest = !result.r;
        this.autologin = result.r && autologin;
        if(this.autologin) {
            this.username = username;
            this.#password = password;
        }
        return result;
    }

    async guest() {
        const result = await this.core.cmd('user.guest');
        this.#authenticated =
        this.#isguest = result.r;
        return result;
    }

    async logout() {
        if(!this.#authenticated) return {r: true};
        const result = await this.core.cmd('user.logout');
        this.#authenticated =
        this.#isguest =
        this.#autologin = !result.r;
        return result;
    }

    async autologin() {
        if(!this.#autologin) return {r: false, _: true};
        const result = await await this.core.cmd(
            'user.authenticate',
            this.username,
            this.#password,
        )
        this.#autologin =
        this.#authenticated = result.r;
        this.#isguest = !result.r;
        return result;
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