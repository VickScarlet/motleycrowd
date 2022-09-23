import IModule from "../imodule.js";
import KV from './model/KVData.js';
import User from './model/User.js';
import Rank from './model/Rank.js';
import Settlement from './model/Settlement.js';
import Asset from './model/Asset.js';

export default class Database extends IModule {

    #user;
    #kv;
    #rank;
    #settlement;
    #asset;

    get user() {return this.#user;}
    get kv() {return this.#kv;}
    get rank() {return this.#rank;}
    get settlement() {return this.#settlement;}
    get asset() {return this.#asset;}

    async initialize() {
        const {dbName, version} = this.$configure;
        if(!globalThis.indexedDB) throw new Error("IndexedDB not supported yet.");

        const db = await new Promise((resolve, reject) => {
            const request = globalThis.indexedDB.open(dbName, version);
            request.onerror = event=>reject(event.target.error);
            request.onsuccess = event=>resolve(event.target.result);
            request.onupgradeneeded = event=>this.#onupgradeneeded(event.target.result);
        });
        this.#kv = new KV(db);
        this.#user = new User(db);
        this.#rank = new Rank(db);
        this.#settlement = new Settlement(db);
        this.#asset = new Asset(db);

        await this.#kv.initialize();
        await this.#user.initialize();
        await this.#rank.initialize();
        await this.#settlement.initialize();
        await this.#asset.initialize();

        const ls = globalThis.localStorage.getItem('storage');
        if(!ls) return;
        globalThis.localStorage.removeItem('storage');
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
        this.#scheme(db, Rank.Collection, Rank.Scheme);
        this.#scheme(db, Settlement.Collection, Settlement.Scheme);
        this.#scheme(db, Asset.Collection, Asset.Scheme);
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

    async sync(uuid, datas) {
        return Promise.all(Object.entries(datas)
            .map(([key, update]) => {
                let model;
                switch(key) {
                    case 'user':
                        model = this.user; break;
                    case 'asset':
                        model = this.asset; break;
                    default: return false;
                }
                return model.sync(uuid, update);
            }));
    }

    async gsync(username) {
        const data = await this.user.getByUsername(username);
        if(!data) return null;
        const {uuid, $update} = data;
        const sync = { user: new Date($update) };
        const asset = await this.asset.get(uuid);
        if(asset) sync.asset = new Date(asset.updated);
        return { uid:uuid, sync };
    }
}

