import Base from '../base.js';
export default class User extends Base {
    static Collection = 'user';
    static Scheme = {keyPath: 'uuid'};

    async sync(uuid, update) {
        update.$update = Date.now();
        return super.sync(uuid, update)
            .then(updated=>updated.meta);
    }
}