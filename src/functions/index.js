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
        const obj = {};
        for(const key in value) obj[key] = clone(value[key]);
        return obj;
    }
    return value;
}