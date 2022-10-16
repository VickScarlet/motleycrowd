export function debug() { return {
    on: false,
}; }

export function core() { return {
    sheet: {
        load: sheet=>import(`../data/${sheet}.js`)
            .then(module=> module.default)
            .catch(_=>null),
        freeze: true,
        sheets: [ 'achievement', 'card', 'badge' ],
    },
    session: {
        protocol: 'wss',
        host: "motleycrowdservice.syaro.io",
        port: 443,
        get finger() {
            let result = '';
            const canvas = document.createElement('canvas');
            canvas.width = 2000;
            canvas.height = 200;
            canvas.style.display = 'inline';
            const ctx = canvas.getContext('2d');
            ctx.rect(0, 0, 10, 10);
            ctx.rect(2, 2, 6, 6);
            result+='wd:'+((ctx.isPointInPath(5, 5, 'evenodd') === false) ? 'yes' : 'no');

            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.font = '11pt Arial';
            const w = 'Cwm fjordbank glyphs vext quiz, \ud83d\ude03';
            ctx.fillText(w, 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.2)';
            ctx.font = '18pt Arial';
            ctx.fillText(w, 4, 45);
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = 'rgb(255,0,255)';
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgb(0,255,255)';
            ctx.beginPath()
            ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgb(255,255,0)';
            ctx.beginPath();
            ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgb(255,0,255)';
            ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
            ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
            ctx.fill('evenodd');

            if (canvas.toDataURL)
                result+='/fp.' + canvas.toDataURL();
            return $hash.md5(result);
        }
    },
    database: {
        dbName: 'motleycrowd',
        version: 12,
    },
    game: {
        page: 8,
    },
    achievement: {},
    asset: {},
    shop: {},
    question: {},
    user: {},
    rank: {},
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