const listeners = new Map();
export function on(event, listener) {
    if(!listeners.has(event))
        listeners.set(event, new Set());
    listeners.get(event).add(listener);
}

export function off(event, listener) {
    if(!listeners.has(event)) return;
    listeners.get(event).delete(listener);
}

export function emit(event, ...args) {
    if(!listeners.has(event)) return;
    listeners.get(event).forEach(
        listener=>listener(...args)
    );
}