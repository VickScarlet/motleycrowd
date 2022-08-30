import IModule from "../imodule.js";
import KV from './model/KVData.js';
import User from './model/User.js';

export default class Database extends IModule {

    #user;
    #kv;

    get user() {return this.#user;}
    get kv() {return this.#kv;}

    async initialize() {
        const {dbName, version} = this.$configure;
        if(!window.indexedDB) throw new Error("IndexedDB not supported yet.");

        const db = await new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbName, version);
            request.onerror = event=>reject(event.target.error);
            request.onsuccess = event=>resolve(event.target.result);
            request.onupgradeneeded = event=>this.#onupgradeneeded(event.target.result);
        });
        this.#kv = new KV(db);
        this.#user = new User(db);

        await this.#kv.initialize();
        await this.#user.initialize();

        const ls = window.localStorage.getItem('storage');
        if(!ls) return;
        window.localStorage.removeItem('storage');
        const kv = JSON.parse(ls);
        for(const key in kv)
            await this.#kv.set(key, kv[key]);
    }

    /**
     *
     * @private
     * @param {IDBDatabase} db
     */
    #onupgradeneeded(db) {
        this.#scheme(db, KV.Collection, KV.Scheme);
        this.#scheme(db, User.Collection, User.Scheme);
    }

    /**
     *
     * @private
     * @param {IDBDatabase} db
     * @param {string} collection
     * @param {object} scheme
     * @param {string} scheme.keyPath
     * @param {Object<string, {unique: boolean}>} scheme.indexs
     */
    #scheme(db, collection, {keyPath, indexs}) {
        if(db.objectStoreNames.contains(collection)) return;
        const store = db.createObjectStore(collection, {keyPath});
        for(const index in indexs) {
            store.createIndex(index, index, indexs[index]);
        }
    }

}

