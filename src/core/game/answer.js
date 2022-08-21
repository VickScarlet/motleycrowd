export default class Answer {
    constructor(options, answerMap) {
        this.#options = new Set(options);
        this.#options.forEach(ans => {
            this.#counter.set(ans, 0)
            this.#users.set(ans, new Set());
        });
        for(const uuid in answerMap)
            this.#answer(uuid, answerMap[uuid]);
    }

    #users = new Map();
    #map = new Map();
    #counter = new Map();
    #options;
    #cache = new Map();

    get size() { return this.#map.size; }
    get counter() { return this.#counter; }
    get map() {return this.#map;}
    get obj() {return Object.fromEntries(this.#map.entries());}


    #answer(uuid, answer) {
        this.#map.set(uuid, answer);
        this.#counter.set(answer, (this.#counter.get(answer)) + 1);
        this.#users.get(answer).add(uuid);
        this.#cache.clear();
        return true;
    }

    entries() {
        return this.#map.entries();
    }

    forEach(callback) {
        this.#map.forEach((value, key)=>callback(key, value, this));
    }

    has(uuid) {
        return this.#map.has(uuid);
    }

    get(uuid) {
        return this.#map.has(uuid)
            ? this.#map.get(uuid)
            : null;
    }

    users(answer) {
        return this.#users.get(answer);
    }

    count(answer) {return this.#counter.get(answer) || 0;}

    most(answer, only=false) {
        const count = this.count(answer);
        for(const option of Array.from(this.#options)) {
            if(option == answer) continue;
            if( this.count(option) > count
                || only && this.count(option) == count
            ) return false;
        }
        return true;
    }

    least(answer, only=false) {
        const count = this.count(answer);
        for(const option of Array.from(this.#options)) {
            if(option == answer) continue;
            if( this.count(option) < count
                || only && this.count(option) == count
            ) return false;
        }
        return true;
    }

    same(answer) {
        if(this.#cache.has('same#'+answer))
            return this.#cache.get('same#'+answer);
        const count = this.count(answer);
        let same = 0;

        this.#options.forEach(option =>{
            if(this.count(option) == count)
                same ++;
        });
        this.#cache.set('same#'+answer, same);
        return same;
    }

    maxsame() {
        if(this.#cache.has('maxsame'))
            return this.#cache.get('maxsame');
        const map = {};
        this.#options.forEach(option =>{
            const count = this.count(option)
            map[count] = (map[count] || 0) + 1;
        });
        const maxsame = Math.max(Object.values(map));
        this.#cache.set('maxsame', maxsame);
        return maxsame;
    }

    crank() {
        if(this.#cache.has('crank'))
            return this.#cache.get('crank');

        const m = {};
        this.#counter.forEach((count, option) => {
            if(m[count]) m[count].push(option);
            else m[count] = [option];
        });
        const crank = Array
            .from(new Set(this.#counter.values()))
            .sort((a,b)=>b-a)
            .map(count => m[count]);

        this.#cache.set('crank', crank);
        return crank;
    }

}