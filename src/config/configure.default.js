export function debug() { return {
    on: false,
}; }

export function core() { return {
    sheet: {
        load: sheet=>import(`../sheets/${sheet}.js`)
            .then(module=> module.default)
            .catch(_=>null),
        freeze: true,
        sheets: [ 'achievement', 'card', 'badge' ],
    },
    session: {
        protocol: 'wss',
        host: "motleycrowdservice.syaro.io",
        port: 443,
    },
    database: {
        dbName: 'motleycrowd',
        version: 10,
    },
    action: {

    }
} }

export function ui() { return {

} }

export function logger() { return {

} }