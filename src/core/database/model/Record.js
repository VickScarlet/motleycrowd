import Base from '../base.js';
export default class Record extends Base {
    static Collection = 'record';
    static Scheme = {keyPath: 'uuid'};

    async gets(uuid) {
        const data = await super.get(uuid);
        return data?.records || null;
    }

    async get(uuid, key) {
        if(!key) return null;
        const data = await super.get(uuid);
        if(!data?.records) return null;
        const keys = key.split('.');
        let ret = data.records;
        for(const k of keys) {
            ret = ret[k];
            if(ret==null) return null;
        }
        return ret;
    }

    postSync(update) {
        if(!update.records) return;
        const flat = $utils.flat({
            record: update.records
        });
        for(const key in flat)
            $emit(key, flat[key]);
    }
}