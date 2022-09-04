import IModule from "./imodule.js";
export default class Rank extends IModule {
    #isexpired(update) {
        const target = new Date(update).getTime();
        return Date.now() - 60*60*1000 > target;
    }

    async #command(type, data) {
        return this.$core.command(`rank.${type}`, data);
    }

    async #ranking(uuid) {
        const cache = await this.$db.rank.get(uuid);
        if(cache && !this.#isexpired(cache.$update))
            return cache.ranking

        const {success, data} = await this.#command('ranking');
        if(!success) return null;
        const {update, ranking} = data;
        await this.$db.rank.set({
            uuid, ranking,
            $update: update,
        });
        return ranking;
    }

    async ranking(uuid) {
        return this.#ranking('' + uuid);
    }

    async #rank(ranks) {
        const remote = [];
        const datas = {};
        for(const rank of ranks) {
            const local = await this.$db.kv.get(`rank-${rank}`);
            if(local && !this.#isexpired(local.$update))
                datas[rank] = local.$data;
            else
                remote.push(rank);
        }
        if(remote.length) {
            const {success, data} = await this.#command('get', remote);
            if(!success) return datas;
            const {ranks: rs, update: $update} = data;
            for(const rank in rs) {
                const $data = rs[rank];
                await this.$db.kv.set(`rank-${rank}`, {
                    $data, $update
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