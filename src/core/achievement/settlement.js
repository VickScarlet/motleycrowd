export default class Settlement {
    constructor(settlement, uid) {
        if(!settlement) return;
        const {type, questions, scores} = settlement;
        if(!scores[uid]) return;
        this.#t = type;
        this.#u = uid;
        this.#qs = questions.map(
            ([id, picked, answers])=>({
                id, picked, answers
            })
        );

        const c = {};
        this.#c = c;

        for(const uid in scores) {
            const [score, answers, ranking] = scores[uid];
            if(!c[ranking]) c[ranking] = 1;
            else c[ranking]++;
            this.#us.set(uid, {
                score, answers, ranking
            });
        }

        const r = u=>this.#ranking(u);
        this.#rs = Object.keys(scores).sort((a,b)=>r(a)-r(b));
        this.#r = r(uid);
        this.#ok = true;
    }

    #ok = false;
    #t;
    #u;
    #c;
    #r;
    #qs;
    #rs;
    #us = new Map();

    get ok() { return this.#ok; }

    #ranking(uid) {
        return this.#us.get(uid).ranking;
    }

    get(type, ...args) {
        let fn;
        switch (type) {
            case 'type': return this.#t;
            // only me
            case 'ranking': return this.#r;
            case 'question': fn = this.#question; break;
            case 'picked': fn = this.#picked; break;
            case 'answer': fn = this.#answer; break;
            case 'subscore': fn = this.#subscore; break;

            // ranking or 'me'
            case 'score': fn = this.#score; break;
            case 'count': fn = this.#count; break;
            case 'diff': fn = this.#diff; break;
            case 'timeout': fn = this.#timeout; break;
            default: return null;
        }
        return fn.call(this, ...args);
    }

    #question(idx) {
        return this.#qs[idx].id;
    }

    #picked(idx) {
        return this.#qs[idx].picked;
    }

    #answer(idx) {
        const uid = this.#u;
        const {answers} = this.#us.get(uid);
        const answer = answers[idx];
        if(!Array.isArray(answer)) return '';
        return answer[1];
    }

    #subscore(idx) {
        const uid = this.#u;
        const {answers} = this.#us.get(uid);
        const answer = answers[idx];
        if(!Array.isArray(answer)) return 0;
        return answer[0];
    }

    #gr(r) { return r=='me' ?this.#r :r; }
    #gu(r) { return r=='me'? this.#u :this.#rs[r];}

    #score(r) {return this.#us.get(this.#gu(r)).score;}
    #count(r) { return this.#c[this.#gr(r)] || 0; }

    #diff(r) {
        const m = this.#score('me');
        const t = this.#score(r);
        return Math.abs(m - t);
    }

    #timeout(r) {
        let timeout = 0;
        const u = this.#gu(r);
        const {answers} = this.#us.get(u);
        for(const answer of answers) {
            if(Array.isArray(answer)) continue;
            timeout ++;
        }
        return timeout;
    }

}
