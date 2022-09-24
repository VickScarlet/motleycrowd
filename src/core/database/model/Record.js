import Base from '../base.js';
export default class Record extends Base {
    static Collection = 'record';
    static Scheme = {keyPath: 'uuid'};
}