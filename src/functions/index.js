export function clone(value) {
    if(value === null) return null;
    if(typeof value === 'object') {
        if(Array.isArray(value)) return value.map(v=>clone(v));
        const newObj = {};
        for(const key in value) newObj[key] = clone(value[key]);
        return newObj;
    }
    return value;
}