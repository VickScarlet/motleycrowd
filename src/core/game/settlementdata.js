import Answer from "./answer.js";

export default class SettlementData {
    constructor(uuid, getQuestion, {questions, scores}, users) {
        this.#uuid = uuid;
        this.#questions = questions.map(
            ([qid, picked]) => getQuestion(qid, picked)
        );

        this.#indexs = new Array(this.size).fill(1).map((_, i)=>Number(i));

        let last = null;
        let lastR = 0;
        const ranking = (idx, score)=>{
            const l = last;
            last = score;
            if(score==l) return lastR;
            if(!idx) lastR = 1
            else lastR = idx + 1;
            return lastR;
        }

        Object.entries(scores)
            .sort(([,[a]],[,[b]])=>b-a)
            .forEach(([uid, [score, subs]], idx)=>this.#scores.set(
                uid, new UScores(
                    uid,
                    score,
                    ranking(idx, score),
                    subs,
                    users.get(uid)
                )
            ));
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
    constructor(uuid, score, ranking, subs, info) {
        this.#uuid = uuid;
        this.#score = score;
        this.#ranking = ranking;
        this.#info = info;

        this.#subs = subs.map(sub=>{
            if(!Array.isArray(sub))
                return { value: sub };
            const [value, answer] = sub;
            return { value, answer };
        });
    }

    #uuid;
    #score;
    #ranking;
    #subs;
    #info;

    get uuid() {return this.#uuid;}
    get score() {return this.#score;}
    get ranking() {return this.#ranking;}
    get subs() {return this.#subs;}
    get info() {return this.#info;}
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