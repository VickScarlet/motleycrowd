export function number(value, def) {
    if (typeof value !== 'number') {
        value = Number(value);
    }
    return isNaN(value) ? def : value;
}

export function integer(value, def) {
    value = number(value, def);
    return Math.floor(value);
}

export function float(value, def, precision = 2) {
    value = number(value, def);
    return Number(value.toFixed(precision));
}

export function string(value, def) {
    switch (typeof value) {
        case 'string': return value;
        case 'number': return value.toString();
        case 'boolean': return value ? 'true' : 'false';
        default: return def;
    }
}

export function boolean(value) {
    return !!value;
}

export function date(value, def) {
    if(!(value instanceof Date))
        value = new Date(value);
    if(isNaN(value.getTime()))
        return new Date(def);
    return value;
}

export function array(value, def) {
    if(!Array.isArray(value))
        return def;
    return value;
}

export function strArray(value, def) {
    if (Array.isArray(value))
        return value.map(v=>string(v, ''));
    return def;
}

export function numArray(value, def) {
    if (Array.isArray(value))
        return value.map(v=>number(v, 0));
    return def;
}

export function intArray(value, def) {
    if (Array.isArray(value))
        return value.map(v=>integer(v, 0));
    return def;
}

export function floatArray(value, def, precision = 2) {
    if (Array.isArray(value))
        return value.map(v=>float(v, 0, precision));
    return def;
}

export function boolArray(value, def) {
    if (Array.isArray(value))
        return value.map(boolean);
    return def;
}