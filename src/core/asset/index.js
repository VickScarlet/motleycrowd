import IModule from "../imodule.js";

export default class Asset extends IModule {

    async #gets() {
        const uuid = this.$user.uuid;
        if(!uuid) return {};
        return this.$db.asset.gets(uuid);
    }

    async cards() {
        const assets = await this.#gets();
        return Object.keys(assets.card || {});
    }

    async badges() {
        const assets = await this.#gets();
        return Object.keys(assets.badge || {});
    }

    async check(assets) {
        const uuid = this.$user.uuid;
        if(!uuid) return false;
        return this.$db.asset.check(uuid, assets);
    }
}