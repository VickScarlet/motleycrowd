import { IModule } from '../imodule.js';
import { clone } from '../../functions/index.js';
import { meta } from './subjects/meta.js';


export class Question {
    constructor({id, question, options, timeout}, picked, left, answer) {
        this.#id = id;
        this.#question = question;
        this.#options = options;
        this.#timeout = timeout;
        this.#left = typeof left === 'number'? left: timeout;
        this.#answer = answer;
        if(picked) this.picked = picked;
    }

    #id;
    #start = Date.now();
    #question;
    #options;
    #timeout;
    #picked;
    #left;
    #answer;

    get answer() { return this.#answer || ''; }
    set answer(value) { this.#answer = value; }
    get id() {return this.#id;}
    get question() {return this.#question;}
    get timeout() {return this.#timeout;}
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
    get left() {
        const start = this.#start;
        const left = this.#left;
        const now = Date.now();
        const end = start + left;
        return Math.max(end - now, 0)
    }

    option(option) {
        return this.#options[option];
    }
}

export default class QuestionHelper extends IModule {
    get(question, picked, left, answer) {
        const data = meta(question);
        if(!data) return null;
        return new Question(data, picked, left, answer);
    }
}