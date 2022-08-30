export default class KVData {
    static Collection = 'kvdata';
    static Scheme = {
        keyPath: 'key',
        indexs: {},
    };
    constructor(db) {
        this.#db = db;
    }
    /** @private @type {IDBDatabase} */
    #db;
    #cache={};

    async initialize() {
        await this.#fullcache();
    }

    #store(handle, faild) {
        const collection = KVData.Collection;
        return new Promise(async (resolve, reject) => {
            const transaction = this.#db.transaction(collection, "readwrite");
            transaction.onerror = () => reject(new Error("Transaction error"));
            const store = transaction.objectStore(collection);
            new Promise((rs, rj) => handle(store, rs, rj))
                .then(resolve)
                .catch(reject);
        }).catch(faild);
    }

    async #fullcache() {
        return this.#store(
            /** @param {IDBObjectStore} store*/
            (store, resolve, reject)=>{
                const request = store.openCursor();
                request.onerror = ()=>reject();
                request.onsuccess = ()=>{
                    const cursor = request.result
                    if(cursor) {
                        this.#cache[cursor.key] = cursor.value.value;
                        cursor.continue();
                    } else {
                        resolve(true);
                    }
                }
            },
            false
        );
    }

    get(key) { return this.#cache[key]; }

    async set(key, value) {
        if(!key) return false;
        key = ''+key;
        this.#cache[key] = value;
        return this.#store(
            /** @param {IDBObjectStore} store*/
                (store, resolve, reject)=>{
                const request = store.put({key, value});
                request.onerror = ()=>reject();
                request.onsuccess = ()=>resolve(true);
            },
            false
        );
    }

}