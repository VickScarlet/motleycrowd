import { IModule } from "./imodule.js";
export default class Game extends IModule {


    #room;
    #private = false;
    #gaming = false;

    async pair(type) {
        return this.$core.command('game.pair', {type});
    }

    async create(type) {
        return this.$core.command('game.create', {type});
    }

    async join(room) {
        return this.$core.command('game.join', {room});
    }

    async leave() {
        if(!this.#gaming) return true;
        return this.$core.command('game.leave');
    }

    async answer(answer, question) {
        return this.$core.command('game.answer', {answer, question});
    }


}