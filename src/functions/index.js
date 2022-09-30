export function clone(value) {
    if(value === null) return null;
    if(typeof value === 'object') {
        if(Array.isArray(value)) return value.map(v=>clone(v));
        if(value instanceof Map) {
            const map = new Map();
            value.forEach((v,k)=>map.set(k,clone(v)));
            return map;
        }
        if(value instanceof Set) {
            const set = new Set();
            value.forEach(v=>set.add(clone(v)));
            return set;
        }
        if(value instanceof Date) {
            return new Date(value);
        }
        const obj = {};
        for(const key in value) obj[key] = clone(value[key]);
        return obj;
    }
    return value;
}

export function isFunction(value) {
    return typeof value=="function" && !!value.constructor;
}

export function listRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export async function delay(min, max) {
    const time = max? Math.random() * (max - min) + min : min;
    if(!time) return;
    await new Promise(resolve => setTimeout(resolve, time));
}

export function batch(bpart, time, apart) {
    let flag = false;
    const args = {};
    const fn = async ()=>{
        if(flag) return;
        flag = true;
        const ret = await apart?.(args);
        await delay(time);
        if(!flag) return;
        bpart(ret, args);
        flag = false;
    }
    Object.defineProperties(fn, {
        flag: { get: ()=>flag, set: f=>{flag=f}},
    });
    return fn;
}

export function getType(value) {
    const name = value?.constructor?.name;
    if(name) return name;
    const type = Object.prototype.toString.call(value);
    return type.substring(8, type.length - 1);
}

export function equals(a, b) {
    if(a===b) return true;
    const ta = getType(a);
    const tb = getType(b);
    if(ta!=tb) return false;
    switch(ta) {
        case 'Number':
            if(isNaN(a) && isNaN(b)) return true;
            return a===b;
        case 'Array':
            if(a.length!=b.length) return false;
            for (let i=a.length; i--;)
                if(!equals(a[i], b[i]))
                    return false;
            return true;
        case 'Object':
            for(const key in a)
                if(!equals(a[key], b[key]))
                    return false;
            return true;
        case 'Set':
            if(a.size!=b.size) return false;
            const bm = new Map(b.entries());
            for(const v of a) {
                if(b.has(v)) return true;
                let found = false;
                for(const [key, value] of bm)
                    if(equals(v, value)) {
                        bm.delete(key);
                        found = true;
                        break;
                    }
                if(!found) return false;
            }
            return true;
        case 'Map':
            if(a.size!=b.size) return false;
            for(const [key, value] of a)
                if(!equals(value, b.get(key)))
                    return false;
            return true;
        case 'Date':
            return a.getTime() === b.getTime();
        default:
            if(a.equals) return a.equals(b);
            return false;
    }
}

export function objDiff(a, b) {
    if(a===b) return null;
    const ta = getType(a);
    const tb = getType(b);
    if(ta!=tb) return clone(b);
    if(ta!='Object') {
        if(equals(a,b)) return null;
        return clone(b);
    }
    let r = false;
    const diff = {};
    const keys = new Set([
        ...Object.keys(a),
        ...Object.keys(b),
    ]);
    for (const key of keys) {
        const sa = a[key];
        const sb = b[key];
        if(sb==null) {
            r = true;
            diff[key] = null;
            continue;
        }
        const sd = objDiff(sa, sb);
        if(sd===null) continue;
        r = true;
        diff[key] = sd;
    }
    return r? diff: null;
}

export function objUpdate(original, update) {
    const to = getType(original);
    const tu = getType(update);
    if(to!=tu) return update;
    if(to !== 'Object') return update;
    for(const key in update) {
        const u = update[key];
        if(u===null) {
            delete original[key];
            continue;
        }
        original[key] = objUpdate(
            original[key], u
        );
    }
    return original;
}

/**
 * @param {any} obj
 * @param {number} [depth=Infinity]
 * @param {boolean} [flatArray=false]
 * @return {any}
 */
export function flat(obj, depth=Infinity, flatArray=false) {
    const flat = (o, d)=> {
        if( d <= 0
            || typeof o !== 'object'
            || Array.isArray(o) && !flatArray
        ) return [o, false];

        const r = {};
        for (const k in o) {
            const [v, n] = flat(o[k], d-1);
            if(!n) {
                r[k] = v;
                continue;
            }
            for(const s in v)
                r[`${k}.${s}`] = v[s];
        }
        return [r, true];
    }
    return flat(obj, depth+1)[0];
}

export function format(str, values, ...args) {
    if(!str || values==null && !args.length)
        return str;
    args.unshift(values);
    if( typeof values != 'object'
        || values instanceof String
    ) values=args;
    let idx = 0;
    return str.replace(/\{([0-9A-Za-z]*)\}/g, (match, p1)=> {
        if(p1 == '') p1 = idx;
        idx ++;
        const rep = values[p1];
        if(rep != null) return rep;
        const arg = args[p1];
        if(arg != null) return arg;
        return match;
    });
}