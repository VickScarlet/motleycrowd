import IModule from "../imodule.js";
export default class Rank extends IModule {
    #expr(expired) {
        expired = new Date(expired).getTime();
        if(!expired) return true;
        return expired < Date.now();
    }

    async #command(type, data) {
        return this.$core.command(`rank.${type}`, data);
    }

    #syncUUID;
    initialize() {
        const next = new Date();
        next.setSeconds(0);
        next.setMilliseconds(0);
        next.setMinutes(0);
        next.setHours(next.getHours() + 1);
        const timeout = Date.now() - next.getTime();
        setTimeout(()=>{
            this.#sync();
            const interval = 60 * 60 * 1000;
            setInterval(()=>this.#sync(), interval);
        }, Math.max(0, timeout));

        $on('user.logout', _=>this.#syncUUID=null);
        $on('user.authenticated', ([uuid, isguest])=>{
            if(isguest) return;
            this.#syncUUID = uuid;
            this.#sync();
        });
    }

    async #sync() {
        const uuid = this.#syncUUID;
        if(!uuid) return;
        const ranking = await this.ranking(uuid);
        if(!ranking) return;
        for( const type in ranking )
            $emit(`rank.${type}`, ranking[type]);
    }

    async #ranking(uuid) {
        const cache = await this.$db.rank.get(uuid);
        if(cache && !this.#expr(cache.expired))
            return cache.ranking

        const {success, data} = await this.#command('ranking', {user: uuid});
        if(!success) return null;
        if(!data) return null;
        const [ranking, expired] = data;
        const result = {uuid, expired, ranking};
        await this.$db.rank.set(result);
        return ranking;
    }

    async ranking(uuid) {
        if(!uuid) return null;
        return this.#ranking('' + uuid);
    }

    async #rank(ranks) {
        const remote = [];
        const datas = {};
        for(const rank of ranks) {
            const local = await this.$db.kv.get(`rank-${rank}`);
            if(local && !this.#expr(local.expired))
                datas[rank] = local.$data;
            else
                remote.push(rank);
        }
        if(remote.length) {
            const {success, data} = await this.#command('get', remote);
            if(!success) return datas;
            const {ranks: rs, expired} = data;
            for(const rank in rs) {
                const $data = rs[rank];
                await this.$db.kv.set(`rank-${rank}`, {
                    $data, expired
                });
                datas[rank] = $data;
            }
        }
        return datas;
    }

    async ranks(ranks) {
        const set = new Set();
        ranks.forEach(rank => {
            set.add(rank);
        });
        return this.#rank(set);
    }

    async rank(rank) {
        switch(rank) {
            case 'main':
            case 'ten':
            case 'hundred': break;
            default: return null;
        }
        const result = await this.#rank([rank]);
        return result[rank];
    }
}