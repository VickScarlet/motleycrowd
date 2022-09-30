import IModule from "../imodule.js";
import Settlement from "./settlement.js";

export default class Achievement extends IModule {

    async initialize() {
        const achievements = this.$sheet.get('achievement');
        for(const id in achievements) {
            const {watch} = achievements[id];
            if(!watch) continue;
            if(this.#watchs.has(watch))
                this.#watchs.get(watch).push(id);
            else this.#watchs.set(watch, [id]);
        }
        for(const [watch] of this.#watchs)
            $on(watch, data=>this.#on(watch, data));
    }
    #watchs = new Map();

    async #on(watch, data) {
        if(this.$user.isguest) return;
        const uuid = this.$user.uuid;
        if(!uuid) return;
        const achievements = this.#watchs.get(watch);
        if(!achievements) return;

        console.debug('achievement.on', watch);

        const local = await this.$db.achievement.gets(uuid);
        for(const id of achievements) {
            if(local[id]) continue;
            await this.#tryTrigger(uuid, id, data);
        }
    }

    async #tryTrigger(uuid, id, data) {
        if(uuid != this.$user.uuid) return;
        const {category, condition} = this.$sheet.get('achievement', id);
        console.debug('achievement.check', id);
        if(!await this.#check(uuid, condition, data)) return;
        let params;
        switch(category) {
            case 'settlement':
                params = {settlement: data.id};
                break;
            case 'record':
            case 'rank':
            default: break;
        }
        console.debug('achievement.trigger', id);
        const {success} = await this.$core.command(
            'achv.trigger', { achv: id, params }
        );
        if(!success) return;
        console.debug('achievement.unlock', id);
        $emit('achievement.unlock', id);
    }

    async #check(uid, condition, params) {
        const [success, values] =
            await this.#gets(uid, condition.values, params);
        if(!success) return false;
        return $logic.exec(condition.checks, values);
    }

    async #gets(uid, values, params) {
        const types = new Map();
        for(const key in values) {
            const [type, ...args] = values[key].split('.');
            if(!types.has(type)) types.set(type, []);
            types.get(type).push([key, args]);
        }
        const result = {};
        for(const [type, gets] of types) {
            const [success, get] = await this.#prepare(type, uid, params);
            if(!success) return [false];
            for(const [key, args] of gets) {
                result[key] = get(...args);
            }
        }
        return [true, result];
    }

    async #prepare(type, uid, params) {
        let t, get;
        switch(type) {
            case 'settlement':
                t = new Settlement($utils.clone(params), uid);
                get = (...args)=>t.get(...args);
                break;
            case 'record':
                t = await this.$db.record.gets(uid);
                get = (...args)=>this.#deep(t, ...args);
                break;
            case 'rank':
                t = await this.$rank.ranking(uid);
                if (t) {
                    for(const rank in t) {
                        const [ranking, size] = t[rank];
                        t[rank] = {ranking, size};
                    }
                }
                get = (...args)=>this.#deep(t, ...args);
                break;
            default: return [false];
        }
        return [true, get];
    }

    #deep(prepare, ...args) {
        let data = prepare;
        for(const arg of args) {
            if(!data) return null;
            data = data[arg];
        }
        return data;
    }

    async achievements() {
        if(this.$user.isguest) return [];
        const uuid = this.$user.uuid;
        if(!uuid) return [];
        const unlocked = await this.$db.achievement.gets(uuid);
        const sheet = this.$sheet.get('achievement');
        const achievements = [];
        for(const id in sheet) {
            const {name, grade, hide, description} = sheet[id];
            achievements.push({
                id, name, description, hide: !!hide,
                grade, unlocked: !!unlocked[id],
            });
        }
        return achievements;
    }
}
