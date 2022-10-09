export default class Lang {
    constructor({save, load}) {
        this.#save = save;
        this.#load = load;
    }

    /**
     * @typedef {{[key: string]: LangString}} LSProxy
     */
    #save;
    #load;
    /** @type {LSProxy} */
    #g;
    /** @type {LSProxy} */
    #t;
    /** @type {LSProxy} */
    #e;
    #lang;
    #cache = new Map();

    async initialize() {
        const lang = this.#load();
        await this.#switch(lang);
    }

    async #import(lang) {
        if(this.#cache.has(lang))
            return this.#cache.get(lang);

        const {general, tips, error, moment} = await import(`./langs/${lang}.js`);

        const ls = (data, notfind)=>{
            const map = new Map();
            for(const key in data)
                map.set(key, new LangString(data[key]));
            return new Proxy(map, {
                get: (target, key) => {
                    if(target.has(key))
                        return target.get(key);
                    if(notfind) return notfind(target, key);
                    return new LangString(key);
                }
            });
        }

        const data = {
            general: ls(general),
            tips: ls(tips),
            error: ls(error, target=>target.get('unknow')),
            moment,
        }

        this.#cache.set(lang, data);
        return data;
    }

    async #switch(lang) {
        const {general, tips, error, moment} = await this.#import(lang);
        this.#g = general;
        this.#t = tips;
        this.#e = error;
        this.#lang = lang;
        $moment.locale(lang, moment);
    }

    async switch(lang) {
        await this.#switch(lang);
        this.#save(lang);
    }

    get lang() {return this.#lang;}

    /** @readonly */
    get general() {return this.#g;}
    /** @readonly */
    get g() {return this.#g;}
    /** @readonly */
    get tips() {return this.#t;}
    /** @readonly */
    get t() {return this.#t;}
    /** @readonly */
    get error() {return this.#e;}
    /** @readonly */
    get e() {return this.#e;}

    f(str, values, ...args) {
        return this.format(str, values, ...args);
    }

    format(str, values, ...args) {
        return $utils.format(
            this.#g[str] || str,
            values, ...args
        ) || '';
    }
}

class LangString extends String {
    format(values, ...args) {
        return $utils.format(this, values, ...args);
    }

    f(values, ...args) {
        return this.format(values, ...args);
    }
}