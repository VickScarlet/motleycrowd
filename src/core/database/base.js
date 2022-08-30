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
     async $store(handle, faild, mode="readonly") {
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
        }).catch(faild);
    }

    async $getAll(index) {
        return this.$store((store, resolve, reject)=>{
            if(index) store = store.index(index);
            const request = store.getAll();
            request.onerror = reject;
            request.onsuccess = ()=>resolve(request.result);
        }, null);
    }

    async $get(key, index) {
        return this.$store((store, resolve, reject)=>{
            if(index) store = store.index(index);
            const request = store.get(key);
            request.onerror = reject;
            request.onsuccess = ()=>resolve(request.result);
        }, null);
    }

    async $put(data) {
        return this.$store((store, resolve, reject)=>{
            const request = store.put(data);
            request.onerror = reject;
            request.onsuccess = ()=>resolve(true);
        }, false, "readwrite");
    }
}