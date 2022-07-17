import { IModule } from "./imodule.js";
export default class User extends IModule {

    #authenticated = false;
    #isguest = false;

    get autologin() { return this.core.storage.get('autologin'); }
    set autologin(v) { this.core.storage.set('autologin', !!v); }

    get username() { return this.core.storage.get('username'); }
    set username(v) { this.core.storage.get('username', v); }

    get #password() { return this.core.storage.get('password'); }
    set #password(v) { this.core.storage.set('password', v); }

    get authenticated() { return !!this.#authenticated; }
    get isguest() { return !!this.#isguest; }

    async authenticate(username, password, autologin) {
        const result = await this.core.cmd(
            'user.authenticate',
            username,
            $.passwordEncrypt(password)
        );
        this.#authenticated = result.r;
        this.#isguest = !result.r;
        return result;
    }

    async register(username, password, autologin) {
        const result = await this.core.cmd(
            'user.register',
            username,
            $.passwordEncrypt(password)
        );
        this.#authenticated = result.r;
        this.#isguest = !result.r;
        return result;
    }

    async guest() {
        const result = await this.core.cmd('user.guest');
        this.#authenticated = result.r;
        this.#isguest = result.r;
        return result;
    }

    async logout() {
        if(!this.#authenticated) return {r: true};
        const result = await this.core.cmd('user.logout');
        this.#authenticated = !result.r;
        this.#isguest = !result.r;
        return result;
    }

    async autologin() {

    }

}