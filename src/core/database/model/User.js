import Base from '../base.js';
export default class User extends Base {
    static Collection = 'user';
    static Scheme = {keyPath: 'uuid'};

    async getByUsername(username) {
        return this.$get(username, 'username');
    }
}