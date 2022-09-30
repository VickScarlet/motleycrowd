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
        version: 11,
    },
    action: {

    }
} }

export function i18n() { return {
    save(lang) { localStorage.setItem('i18n', lang) },
    load() {
        const s = localStorage.getItem('i18n');
        switch(s) {
            case 'en-us':
            case 'zh-cn':
            default: return 'zh-cn';
        }
    },
} }

export function app() { return {

} }

export function logger() { return {

} }