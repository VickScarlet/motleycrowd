import Answer from "./answer.js";

export default class SettlementData {
    constructor(uuid, getQuestion, {questions, scores}) {
        this.#uuid = uuid;
        this.#questions = questions.map(
            ([qid, picked]) => getQuestion(qid, picked)
        );

        this.#indexs = new Array(this.size).fill(1).map((_, i)=>Number(i));

        for(const uid in scores)
            this.#scores.set(uid, new UScores(uid, scores[uid]));

    }
    #uuid;
    #questions;
    #scores = new Map();
    #cache = new Map();
    #indexs;

    get uuid() { return this.#uuid; }

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
            mine: this.getMine().at(index),
        };
    }

    get(uuid) {
        return this.#scores.get(uuid);
    }
    getMine() {
        return this.#scores.get(this.#uuid);
    }

    #crank() {
        if(this.#cache.has('crank'))
            return this.#cache.get('crank');

        const crank = [];
        let currentScore, currentList;
        Array
            .from(this.#scores.values())
            .sort((a, b)=>b.score-a.score)
            .forEach(({uuid, score})=>{
                if(currentScore !=score) {
                    if(currentList) crank.push(currentList);
                    currentList = [];
                    currentScore = score;
                }
                currentList.push(uuid);
            });

        if(currentList) crank.push(currentList);
        this.#cache.set('crank', crank);
        return crank;
    }

    ranking(uuid) {
        if(!this.#scores.has(uuid)) return -1;
        let ranking = 0;
        for(const rank of this.#crank()) {
            if(rank.includes(uuid)) {
                ranking++;
                break;
            }
            ranking += rank.length;
        }
        return ranking;
    }
}

class UScores {
    constructor(uuid, [score, subs]) {
        this.#uuid = uuid;
        this.#score = score;

        this.#subs = subs.map(sub=>{
            if(!Array.isArray(sub))
                return { value: sub };
            const [value, answer] = sub;
            return { value, answer };
        });
    }

    #uuid;
    #score;
    #subs;

    get uuid() {return this.#uuid;}
    get score() {return this.#score;}
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