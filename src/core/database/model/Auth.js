import Base from '../base.js';
export default class Auth extends Base {
    static Collection = 'auth';
    static Scheme = {keyPath: 'username'};
    async get(username) {
        return this.$get(username);
    }

    async set(username, uuid) {
        return this.$put({username, uuid});
    }
}