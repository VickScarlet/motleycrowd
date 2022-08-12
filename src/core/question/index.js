import { IModule } from '../imodule.js';
import { clone } from '../../functions/index.js';
import { meta } from './subjects/meta.js';


export class Question {
    constructor({id, question, options}, picked) {
        this.#id = id;
        this.#question = question;
        this.#options = options;
        if(picked) this.picked = picked;
    }

    #id;
    #question;
    #options;
    #picked;

    get id() {return this.#id;}
    get question() {return this.#question;}
    get picked() {return [...this.#picked].sort().join('');}
    set picked(picked) {
        this.#picked = new Set(picked.split(''));
    }
    get options() {
        const options = {};
        for(const option of this.#picked) {
            options[option] = clone(this.#options[option]);
        }
        return options;
    }

    option(option) {
        return this.#options[option];
    }
}

export default class QuestionHelper extends IModule {
    get(question, picked) {
        const data = meta(question);
        if(!data) return null;
        return new Question(data, picked);
    }
}