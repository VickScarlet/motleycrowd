import Base from '../base.js';
export default class User extends Base {
    static Collection = 'rank';
    static Scheme = {keyPath: 'uuid'};
}