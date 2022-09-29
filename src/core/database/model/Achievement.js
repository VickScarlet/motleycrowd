import Base from '../base.js';
export default class Achievement extends Base {
    static Collection = 'achievement';
    static Scheme = {keyPath: 'uuid'};

    async gets(uuid) {
        const data = await this.get(uuid);
        return data?.achvs || {};
    }

    async istriggered(uuid, id) {
        const achvs = await this.get(uuid)?.achvs;
        return !!achvs?.[id];
    }
}