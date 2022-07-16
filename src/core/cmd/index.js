import { IModule } from "../imodule.js";
import UserCommand from './user.js';
import GameCommand from "./game.js";

const namespaceList = new Map();
namespaceList.set("user", UserCommand);
namespaceList.set("game", GameCommand);
export default class Commander extends IModule {

    #command;

    initialize() {
        this.#command = this.instance;
    }

    do(c, ...args) {
        if(!c) return null;
        const [ns, cmd] = c.split(".");
        if(!namespaceList.has(ns)) {
            return null;
        }
        const namespace = namespaceList.get(ns);
        if(!namespace.has(cmd)) {
            return null;
        }
        const command = namespace.get(cmd);
        return command(this.#command, ...args);
    }

}