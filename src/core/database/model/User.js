export default class User {
    static Collection = 'user';
    static Scheme = {
        keyPath: 'uuid',
        indexs: {
            username: { unique: true },
        },
    };
    constructor(db) {
        this.#db = db;
    }
    /** @private @type {IDBDatabase} */
    #db;

    async initialize() {
        // empty
    }

    #store(handle, faild) {
        const collection = User.Collection;
        return new Promise(async (resolve, reject) => {
            const transaction = this.#db.transaction(collection, "readwrite");
            transaction.onerror = () => reject(new Error("Transaction error"));
            const store = transaction.objectStore(collection);
            new Promise((rs, rj) => handle(store, rs, rj))
                .then(resolve)
                .catch(reject);
        }).catch(faild);
    }

    async get(uuid) {
        return this.#store(
            /** @param {IDBObjectStore} store*/
            (store, resolve, reject)=>{
                const request = store.get(uuid);
                request.onerror = ()=>reject();
                request.onsuccess = ()=>resolve(request.result);
            },
            null
        );
    }

    async set(data) {
        if(!data.uuid) return false;
        return this.#store(
            /** @param {IDBObjectStore} store*/
                (store, resolve, reject)=>{
                const request = store.put(data);
                request.onerror = ()=>reject();
                request.onsuccess = ()=>resolve(true);
            },
            false
        );
    }

}