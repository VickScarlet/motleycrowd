import { IModule } from '../imodule.js';
import { clone } from '../../functions/index.js';
import { Question } from './subjects/index.js';

export class ClientQuestion {
    constructor(id, picked, left, answer, size) {
        this.#question = Question.get(id, picked);
        this.#left = typeof left === 'number'
            ? left: this.timeout;
        this.#answer = answer;
        this.#size = size;
    }

    #start = Date.now();
    #question;
    #left;
    #answer;
    #size;

    get id() {return this.#question.id;}
    get question() {return this.#question.question;}
    get timeout() {return this.#question.timeout;}
    get options() {
        const options = {};
        for(const option of [...this.picked]) {
            options[option] = this.option(option);
        }
        return options;
    }

    get picked() {return this.#question.picked;}
    set picked(picked) {
        this.#question = Question.get(this.id, picked);
    }
    get size() {return this.#size || 0;}
    set size(size) {this.#size = size;}

    get answer() { return this.#answer || ''; }
    set answer(value) { this.#answer = value; }

    get left() {
        const start = this.#start;
        const left = this.#left;
        const now = Date.now();
        const end = start + left;
        return Math.max(end - now, 0)
    }

    option(option) {
        return clone(this.#question.option(option));
    }
}

export default class QuestionHelper extends IModule {
    get(qid, picked, left, answer) {
        return new ClientQuestion(qid, picked, left, answer);
    }
}