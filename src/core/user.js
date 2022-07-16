import { IModule } from "./imodule.js";
export default class User extends IModule {

    #authenticated = false;

    get authenticated() { return !!this.#authenticated; }

    async authenticate(username, password) {
        const result = await this.core.cmd(
            'user.authenticate',
            username,
            global.$.passwordEncrypt(password)
        );
        this.#authenticated = result.r;
        return result;
    }

    async register(username, password) {
        const result = await this.core.cmd(
            'user.register',
            username,
            global.$.passwordEncrypt(password)
        );
        this.#authenticated = result.r;
        return result;
    }

    async guest() {
        const result = await this.core.cmd('user.guest');
        this.#authenticated = result.r;
        return result;
    }

}