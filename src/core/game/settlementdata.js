import Answer from "./answer.js";

export default class SettlementData {
    constructor(uuid, questions, scores) {
        this.#uuid = uuid;
        this.#questions = questions;
        this.#indexs = new Array(this.size).fill(1).map((_, i)=>Number(i));

        for(const uid in scores) {
            const [score, subs, ranking] = scores[uid];
            this.#scores.set(uid, new UScores(uid,score,ranking,subs));
        }
    }
    #uuid;
    #questions;
    #scores = new Map();
    #indexs;

    get uuid() { return this.#uuid; }
    set uuid(v) { this.#uuid = v; }

    get size() {
        if(!this.#questions) return -1;
        return this.#questions.length;
    }

    get indexs() {return this.#indexs;}

    at(index) {
        if(!this.#questions) return null;
        const question = this.#questions.at(index);
        if(!question) return null;
        const total = this.#scores.size;
        const map = {};
        this.#scores.forEach((uscore, uuid) => {
            const {answer} = uscore.at(index) || {};
            if(!answer) return;
            map[uuid] = answer;
        });
        return {
            question, total,
            answer: new Answer(question.picked, map),
            mine: this.mine.at(index),
        };
    }

    get(uuid) {
        return this.#scores.get(uuid);
    }
    get mine() {
        return this.get(this.#uuid);
    }

    ranking(uuid) {
        if(!this.#scores.has(uuid)) return -1;
        return this.#scores.get(uuid).ranking;
    }

    get myRanking() {
        return this.ranking(this.#uuid);
    }

    get rank() {
        return [...this.#scores.values()]
            .sort((a,b)=>a.ranking-b.ranking);
    }
}

class UScores {
    constructor(uuid, score, ranking, subs) {
        this.#uuid = uuid;
        this.#score = score;
        this.#ranking = ranking;

        this.#subs = subs.map(sub=>{
            if(!Array.isArray(sub))
                return { value: sub, answer: '' };
            const [value, answer] = sub;
            return { value, answer };
        });
    }

    #uuid;
    #score;
    #ranking;
    #subs;

    get uuid() {return this.#uuid;}
    get score() {return this.#score;}
    get ranking() {return this.#ranking;}
    get subs() {return this.#subs;}
    get length() {return this.#subs.length;}

    at(index) {
        return this.#subs.at(index);
    }

    map(callback) {
        return this.#subs.map(callback);
    }

    forEach(callback) {
        return this.#subs.forEach(callback);
    }
}