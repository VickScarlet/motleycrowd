export default class Score {
    constructor(scores) {
        for(const uuid of scores) {
            this.#map.set(uuid, 0);
        }
    }
    #map = new Map();
    #buff = new Map();
    #cache = new Map();

    get rankings() {
        if(this.#cache.has('rankings'))
            return this.#cache.get('rankings');
        const rankings = Array.from(this.#map.entries())
            .sort((a, b)=>b[1]-a[1])
            .map(([uuid, score])=>({uuid, score}));
        this.#cache.set('rankings', rankings);
        return rankings;
    }

    get map() {return this.#map;}
    get obj() {return Object.fromEntries(this.#map.entries());}

    crank() {
        if(this.#cache.has('crank'))
            return this.#cache.get('crank');

        const crank = [];
        let currentScore, currentList;
        Array
            .from(this.#map.entries())
            .sort((a, b)=>b[1]-a[1])
            .forEach(([uuid, score])=>{
                if(currentScore !=score) {
                    if(currentList) crank.push(currentList);
                    currentList = [];
                    currentScore = score;
                }
                currentList.push(uuid);
            });

        if(currentList) crank.push(currentList);
        this.#cache.set('crank', crank);
        return crank;
    }

    get(uuid) {
        return this.#map.get(uuid)||0;
    }

    #alert(uuid, value) {
        const last = this.#map.get(uuid) || 0;
        const score = Number((last + value || 0).toFixed(2));
        this.#map.set(uuid, score);
        this.#cache.clear();
        return score - last;
    }

    #set(uuid, value) {
        const last = this.#map.get(uuid) || 0;
        const score = Number((value || 0).toFixed(2));
        this.#map.set(uuid, score);
        this.#cache.clear();
        return score - last;
    }

    #addbuff(uuid, value, times) {
        const buffs = this.#buff.get(uuid) || [];
        buffs.push([times, value]);
        this.#buff.set(buffs);
        return 0;
    }

    #buffit(uuid, value) {
        if(!this.#buff.has(uuid))
            return value;
        const buffs = this.#buff
            .get(uuid)
            .map(([times, buff]) => {
                value *= buff;
                return [times -1, buff];
            })
            .filter(([times]) => times > 0);
        if(buffs.length > 0)
            this.#buff.set(uuid, buffs);
        else
            this.#buff.delete(uuid);
        return value;
    }

    #convert(uuid, addition) {
        if(addition == null)
            return {type: 'value', value: 0};
        switch(typeof addition) {
            case 'number':
                return { type: 'value', value: addition || 0 };
            case 'function':
                return this.#convert(uuid, addition({uuid}));
            case 'object':
                if(addition.type && addition.type!='value')
                    return addition;
                return this.#convert(uuid, addition.value);
        }

        return {type: 'value', value: 0};
    }

    addition(uuid, addition) {
        const {type, times, value} = this.#convert(uuid, addition);
        const alter = this.#buffit(uuid, value);
        let score = 0;
        switch(type) {
            case 'value':
                score = this.#alert(uuid, alter);
                break;
            case 'buff':
                this.#addbuff(uuid, value, times);
                break;
            case 'set':
                score = this.#set(uuid, alter);
                break;
        }
        return score || 0;
    }
}