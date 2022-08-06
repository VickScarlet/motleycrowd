const eventMap = new Map();
export function on(event, callback) {
    if(!eventMap.has(event))
        eventMap.set(event, new Set());
    eventMap.get(event).add(callback);
}

export function off(event, callback) {
    if(!eventMap.has(event)) return;
    eventMap.get(event).delete(callback);
}

export function emit(event, ...args) {
    if(!eventMap.has(event)) return;
    eventMap.get(event).forEach(callback=>callback(...args));
}