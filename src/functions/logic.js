export function exec(exprs, values) {
    if(!Array.isArray(exprs)) return false;
    const [expr, ...args] = exprs;
    let fn;
    switch(expr) {
        case '$and': fn = $and; break;
        case '$or': fn = $or; break;
        case '$not': fn = $not; break;
        case '$eq': fn = $eq; break;
        case '$ne': fn = $ne; break;
        case '$gt': fn = $gt; break;
        case '$lt': fn = $lt; break;
        case '$gte':
        case '$ge': fn = $ge; break;
        case '$lte':
        case '$le': fn = $le; break;
        case '$in': fn = $in; break;
        case '$nin': fn = $nin; break;

        // calculate
        case '$sum':
        case '$add': fn = $add; break;
        case '$sub': fn = $sub; break;
        case '$mul': fn = $mul; break;
        case '$div': fn = $div; break;
        case '$mod': fn = $mod; break;
        case '$pow': fn = $pow; break;
        case '$abs': fn = $abs; break;
        case '$ceil': fn = $ceil; break;
        case '$floor': fn = $floor; break;
        case '$round': fn = $round; break;
        case '$sqrt': fn = $sqrt; break;
        case '$log': fn = $log; break;
        case '$log10': fn = $log10; break;
        case '$exp': fn = $exp; break;
        case '$max': fn = $max; break;
        case '$min': fn = $min; break;
        case '$avg': fn = $avg; break;
        case '$inc': fn = $inc; break;
        case '$dec': fn = $dec; break;
    }
    if(!fn) return false;
    return fn(args, values);
}

function value(values, v) {
    if(typeof v === 'string' && v.startsWith('?')) {
        const key = v.substring(1);
        return values[key];
    }
    if(Array.isArray(v)) {
        if(typeof v[0] === 'string' && v[0].startsWith('$')) {
            return exec(v, values);
        }
    }
    return v;
}

export function $and(exprs, values) {
    for(const exp of exprs)
        if(!exec(exp, values))
            return false;
    return true;
}

export function $or(exprs, values) {
    for(const exp of exprs)
        if(exec(exp, values))
            return true;
    return false;
}

export function $not(args, values) {
    return !exec(args, values);
}

export function $eq(args, values) {
    const [a, b] = args;
    return value(values, a) === value(values, b);
}

export function $ne(args, values) {
    return !$eq(args, values);
}

export function $gt(args, values) {
    const [a, b] = args;
    return value(values, a) > value(values, b);
}

export function $lt(args, values) {
    const [a, b] = args;
    return value(values, a) < value(values, b);
}

export function $ge(args, values) {
    const [a, b] = args;
    return value(values, a) >= value(values, b);
}

export function $gte(args, values) {
    return $ge(args, values);
}

export function $le(args, values) {
    const [a, b] = args;
    return value(values, a) <= value(values, b);
}

export function $lte(args, values) {
    return $le(args, values);
}

export function $in(args, values) {
    const [a, b] = args;
    const v = value(values, b);
    if(Array.isArray(v))
        return v.includes(value(values, a));
    return false;
}

export function $nin(args, values) {
    return !$in(args, values);
}


// calculate

export function $add(args, values) {
    let sum = 0;
    for(const arg of args)
        sum += value(values, arg);
    return sum;
}

export function $sub(args, values) {
    const [a, ...subs] = args;
    let sum = value(values, a);
    for(const arg of subs)
        sum -= value(values, arg);
    return sum;
}

export function $mul(args, values) {
    let sum = 1;
    for(const arg of args)
        sum *= value(values, arg);
    return sum;
}

export function $div(args, values) {
    const [a, ...subs] = args;
    let sum = value(values, a);
    for(const arg of subs)
        sum /= value(values, arg);
    return sum;
}

export function $mod(args, values) {
    const [a, b] = args;
    return value(values, a) % value(values, b);
}

export function $pow(args, values) {
    const [a, b] = args;
    return Math.pow(value(values, a), value(values, b));
}

export function $abs(args, values) {
    const [a] = args;
    return Math.abs(value(values, a));
}

export function $ceil(args, values) {
    const [a] = args;
    return Math.ceil(value(values, a));
}

export function $floor(args, values) {
    const [a] = args;
    return Math.floor(value(values, a));
}

export function $round(args, values) {
    const [a] = args;
    return Math.round(value(values, a));
}

export function $sqrt(args, values) {
    const [a] = args;
    return Math.sqrt(value(values, a));
}

export function $log(args, values) {
    const [a] = args;
    return Math.log(value(values, a));
}

export function $log10(args, values) {
    const [a] = args;
    return Math.log10(value(values, a));
}

export function $exp(args, values) {
    const [a] = args;
    return Math.exp(value(values, a));
}

export function $max(args, values) {
    let max = -Infinity;
    for(const arg of args) {
        const v = value(values, arg);
        if(v > max)
            max = v;
    }
    return max;
}

export function $min(args, values) {
    let min = Infinity;
    for(const arg of args) {
        const v = value(values, arg);
        if(v < min)
            min = v;
    }
    return min;
}

export function $sum(args, values) {
    return $add(args, values);
}

export function $avg(args, values) {
    return $add(args, values) / args.length;
}

export function $inc(args, values) {
    const [a] = args;
    return value(values, a) + 1;
}

export function $dec(args, values) {
    const [a] = args;
    return value(values, a) - 1;
}