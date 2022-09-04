import Base from '../base.js';
export default class KVData extends Base {
    static Collection = 'settlement';
    static Scheme = {keyPath: 'id'};

    async get(id) {
        return this.$get(id);
    }

    async set(data) {
        if(!data.id) return false;
        return this.$put(data);
    }
}