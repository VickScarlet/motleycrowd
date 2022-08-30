import { on, off, emit } from './events/index.js';
import Core from './core/index.js'
import { createApp } from 'vue'
import './style/app.scss'
import App from './components/App.vue'

(async ()=>{

window.onerror = function(msg,source,line,col,error) {
    alert(`${msg}\nat: ${source||"<anonymous>"}:${line}:${col}\n${error}`);
}
window.$ = window.$sys = {
    q: {},
};
window.$sys.on = on;
window.$sys.off = off;
window.$sys.emit = emit;

window.location.search.substring(1).split('&').forEach(item=>{
    const [key, value] = item.split('=');
    if(!key) return;
    if(key==='debug' && value) {
        window.$sys.debug = !!JSON.parse(value);
        return;
    }
    window.$sys.q[key] = value;
});

const session = {
    protocol: 'wss',
    host: "motleycrowdservice.syaro.io",
    port: 443,
};

if(window.$sys.debug) {
    const q = window.$sys.q;
    if(q.protocol)
        session.protocol = q.protocol;
    if(q.host)
        session.host = q.host;
    if(q.port)
        session.port = Number(q.port) || 443;
}

const core = new Core({
    session,
    database: {
        dbName: 'motleycrowd',
        version: 5,
    }
});
window.$sys.core = core;
await core.initialize();

const app = createApp(App);
app.mixin({
    props: {
        getData: {
            type: Function,
            default: ()=>({}),
        },
    },
});
const proxy = app.mount('#app');
window.$sys.app = app;
window.$sys.ui = window.$sys.proxy = proxy;

proxy.loading = true;
try {
    await core.start();
    await proxy.start();
} catch(e) {
    proxy.tips('连接服务器失败, 请检查网络连接, 或者过会再试一次');
}
proxy.loading = false;

})();