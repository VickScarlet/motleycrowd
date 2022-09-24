import { objUpdate } from "../../functions/index.js";
export default class Base {
    constructor(db) {
        this.#db = db;
    }
    /** @private @type {IDBDatabase} */
    #db;
    get $() { return this.constructor; }

    async initialize() {
        // empty
    }

    /**
     * @callback handle
     * @param {IDBObjectStore} store
     * @param {(value)=>void} resolve
     * @param {(reason=)=>void} reject
     */


    /**
     * @async
     * @param {handle} handle
     * @param {any} faild
     * @returns {Promise<any>}
     */
     async $store(handle, mode="readonly") {
        const collection = this.$.Collection;
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction(collection, mode);
            const store = transaction.objectStore(collection);
            let result;
            new Promise((rs, rj) => handle(store, rs, rj))
                .then(ret=>result=ret)
                .catch(reject);
            transaction.onerror = () => reject(new Error("Transaction error"));
            transaction.oncomplete = () => resolve(result);
        });
    }

    async $getAll(index) {
        return this.$store((store, resolve, reject)=>{
            if(index) store = store.index(index);
            const request = store.getAll();
            request.onerror = reject;
            request.onsuccess = ()=>resolve(request.result);
        })
        .catch(null);
    }

    async $get(key, index) {
        return this.$store((store, resolve, reject)=>{
            if(index) store = store.index(index);
            const request = store.get(key);
            request.onerror = reject;
            request.onsuccess = ()=>resolve(request.result);
        })
        .catch(null);
    }

    async $put(data) {
        return this.$store((store, resolve, reject)=>{
            const request = store.put(data);
            request.onerror = reject;
            request.onsuccess = ()=>resolve(true);
        }, "readwrite")
        .catch(false);
    }

    async get(uuid) {
        return this.$get(uuid);
    }

    async set(data) {
        if(!data.uuid) return false;
        return this.$put(data);
    }

    async sync(uuid, update) {
        update.uuid = update.uid || uuid;
        uuid = update.uuid;
        delete update.uid;
        const original = await this.get(uuid);
        return this.set(objUpdate(original, update));
    }
}