import Base from '../base.js';
export default class Record extends Base {
    static Collection = 'record';
    static Scheme = {keyPath: 'uuid'};

    postSync(update) {
        if(!update.records) return;
        const flat = $utils.flat({
            record: update.records
        });
        for(const key in flat)
            $emit(key, flat[key]);
    }
}