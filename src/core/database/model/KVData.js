import Base from '../base.js';
export default class KVData extends Base {
    static Collection = 'kvdata';
    static Scheme = {keyPath: 'key'};
    #cache={};

    async initialize() {
        const list = await this.$getAll();
        for(const {key, value} of list) {
            this.#cache[key] = value;
        }
    }

    get(key) { return this.#cache[key]; }

    async set(key, value) {
        if(!key) return false;
        key = ''+key;
        this.#cache[key] = value;
        return this.$put({key, value});
    }
}