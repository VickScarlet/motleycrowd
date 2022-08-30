import Base from '../base.js';
export default class User extends Base {
    static Collection = 'user';
    static Scheme = {
        keyPath: 'uuid',
        indexs: {
            username: { unique: true },
        },
    };

    async get(uuid) {
        return this.$get(uuid);
    }

    async set(data) {
        if(!data.uuid) return false;
        return this.$put(data);
    }
}