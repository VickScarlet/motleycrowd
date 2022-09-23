import Base from '../base.js';
export default class Asset extends Base {
    static Collection = 'asset';
    static Scheme = {keyPath: 'uuid'};
}