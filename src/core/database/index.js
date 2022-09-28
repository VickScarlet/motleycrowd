import IModule from "../imodule.js";
import KV from './model/KVData.js';
import Auth from './model/Auth.js';
import User from './model/User.js';
import Rank from './model/Rank.js';
import Settlement from './model/Settlement.js';
import Asset from './model/Asset.js';
import Record from './model/Record.js';

export default class Database extends IModule {

    #auth;
    #user;
    #kv;
    #rank;
    #settlement;
    #asset;
    #record;
    #gsync;

    get auth() {return this.#auth;}
    get user() {return this.#user;}
    get kv() {return this.#kv;}
    get rank() {return this.#rank;}
    get settlement() {return this.#settlement;}
    get asset() {return this.#asset;}
    get record() {return this.#record;}

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
        this.#auth = new Auth(db);
        this.#user = new User(db);
        this.#rank = new Rank(db);
        this.#settlement = new Settlement(db);
        this.#asset = new Asset(db);
        this.#record = new Record(db);

        await this.#kv.initialize();
        await this.#auth.initialize();
        await this.#user.initialize();
        await this.#rank.initialize();
        await this.#settlement.initialize();
        await this.#asset.initialize();
        await this.#record.initialize();

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
        this.#scheme(db, Auth.Collection, Auth.Scheme);
        this.#scheme(db, User.Collection, User.Scheme);
        this.#scheme(db, Rank.Collection, Rank.Scheme);
        this.#scheme(db, Settlement.Collection, Settlement.Scheme);
        this.#scheme(db, Asset.Collection, Asset.Scheme);
        this.#scheme(db, Record.Collection, Record.Scheme);
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

    get(model) {
        switch(model) {
            case 'auth': return this.auth;
            case 'user': return this.user;
            case 'rank': return this.rank;
            case 'settlement': return this.settlement;
            case 'asset': return this.asset;
            case 'record': return this.record;
            case 'kv': return this.kv;
            default: return null;
        }
    }

    async sync(uuid, sync) {
        const tasks = [];
        for(let i = 0; i<sync.length; i+=2) {
            const model = sync[i];
            const data = sync[i+1];
            tasks.push(this.get(model)?.sync(uuid, data));
        }
        return Promise.all(tasks);
    }

    async gsync(username) {
        const data = await this.auth.get(username);
        if(!data) return null;
        const {uuid} = data;

        const sync = {};
        for(const model of this.#gsync) {
            const updated = (await this.get(model)?.get(uuid))?.updated;
            if(updated) sync[model] = new Date(updated);
        }
        return { uid: uuid, sync };
    }

    $i(configure) {
        this.#gsync = configure.gsync;
    }
}

