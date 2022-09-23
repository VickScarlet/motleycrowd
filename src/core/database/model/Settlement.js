import Base from '../base.js';
export default class Settlement extends Base {
    static Collection = 'settlement';
    static Scheme = {keyPath: 'id'};

    async set(data) {
        if(!data.id) return false;
        return this.$put(data);
    }
}