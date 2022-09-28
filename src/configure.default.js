export function debug() { return {
    on: false,
}; }

export function core() { return {
    session: {
        protocol: 'wss',
        host: "motleycrowdservice.syaro.io",
        port: 443,
    },
    database: {
        dbName: 'motleycrowd',
        version: 10,
    }
} }

export function ui() { return {

} }

export function logger() { return {

} }