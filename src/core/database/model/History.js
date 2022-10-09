import Base from '../base.js';
export default class History extends Base {
    static Collection = 'history';
    static Scheme = {keyPath: 'uuid'};

    async gets(uuid) {
        const data = await this.get(uuid);
        return data?.history || new Map();
    }

    async puts(uuid, list) {
        const data = await this.get(uuid) || {
            uuid, history: new Map()
        };
        const history = data.history;
        for(const [key, value] of list)
            history.set(key, value);

        return this.$put(data);
    }

}