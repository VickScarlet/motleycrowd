import { IModule } from '../imodule.js';
import { clone } from '../../functions/index.js';
import meta from './subjects/meta.js';


export class Question {
    constructor({id, question, options}) {
        this.#id = id;
        this.#question = question;
        this.#options = options;
    }

    #id;
    #question;
    #options;

    get id() {return this.#id;}
    get question() {return this.#question;}
    get options() {return clone(this.#options);}

    option(option) {
        return this.#options[option];
    }
}

export default class QuestionHelper extends IModule {
    get(question) {
        const data = meta[question];
        if(!data) return null;
        return new Question(data);
    }
}