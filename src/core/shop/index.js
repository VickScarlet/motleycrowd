import IModule from "../imodule.js";
export default class Shop extends IModule {

    #expr(expired) {
        expired = new Date(expired).getTime();
        if(!expired) return true;
        return expired < Date.now();
    }

    async #command(type, data) {
        return this.$core.command(`shop.${type}`, data);
    }

    async #shelves() {
        const cache = this.$db.kv.get('shelves');
        if(cache && !this.#expr(cache.expired))
            return cache;

        const {success, data} = await this.#command('shelves');
        if(!success) return null;
        if(!data) return null;
        await this.$db.kv.set('shelves', data);
        return data;
    }

    async shelves() {
        const shelves = await this.#shelves();
        if(!shelves) return [];
        const {goods: gs, expired} = shelves;
        const goods = [];
        for(const type in gs) {
            const list = gs[type];
            for(const [idx, item] of list.entries()) {
                const {price, rewards} = item;
                const owned = await this.$asset.check(rewards);
                const enough = await this.$asset.check(price);
                goods.push({type, idx, owned, enough, ...item});
            }
        }
        return {goods, expired};
    }

    async buy({type, idx, good}) {
        return this.#command('buy', [type, idx, good])
            .then(({success})=>success);
    }
}