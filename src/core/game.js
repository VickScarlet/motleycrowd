import { IModule } from "./imodule.js";
export default class Game extends IModule {


    #room;
    #private = false;
    #gaming = false;

    async pair(type) {
        return this.core.cmd('game.pair', type);
    }

    async create(limit) {
        return this.core.cmd('game.create', limit);
    }

    async join(room) {
        return this.core.cmd('game.join', room);
    }

    async leave() {
        if(!this.#gaming) return true;
        return this.core.cmd('game.leave');
    }

    async answer(answer, question) {
        return this.core.cmd('game.answer', answer, question);
    }


}