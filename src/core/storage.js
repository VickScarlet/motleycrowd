import { IModule } from "./imodule.js";

export default class Storage extends IModule {
    #data = JSON.parse(window.localStorage.getItem('storage') || '{}');
    #save() {
        window.localStorage.setItem('storage', JSON.stringify(this.#data));
    }

    get(key) { return this.#data[key]; }
    set(key, value) { 
        this.#data[key] = value; 
        this.#save();
    }
}