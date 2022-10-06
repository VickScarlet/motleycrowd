import Base from '../base.js';
export default class Asset extends Base {
    static Collection = 'asset';
    static Scheme = {keyPath: 'uuid'};

    async gets(uuid) {
        const data = await super.get(uuid);
        return data?.assets || {};
    }

    async check(uuid, assets) {
        const data = await this.get(uuid);
        if(!data?.assets) return false;
        const owned = $utils.flat(data.assets, 2);
        const flated = $utils.flat({assets}, 2);
        for(const key in flated) {
            if(owned[key] < flated[key]) return false;
        }
        return true;
    }

    async sync(uuid, update) {
        return super.sync(uuid, update)
            .then(updated=>updated.assets);
    }
}