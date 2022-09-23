import { on, off, emit } from './events/index.js';
import Core from './core/index.js'
import { createApp } from 'vue'
import './style/app.scss'
import App from './components/App.vue'

(async (namespace, search)=>{

/**
 * @memberof namespace
 */
const $sys = { on, off, emit, q: {} };
namespace.$ = namespace.$sys = $sys;
namespace.onerror = (msg,source,line,col,error) =>{
    alert(`${msg}\nat: ${source||"<anonymous>"}:${line}:${col}\n${error}`);
}


search.substring(1).split('&').forEach(item=>{
    const [key, value] = item.split('=');
    if(!key) return;
    if(key==='debug' && value) {
        $sys.debug = !!JSON.parse(value);
        return;
    }
    $sys.q[key] = value;
});

const session = {
    protocol: 'wss',
    host: "motleycrowdservice.syaro.io",
    port: 443,
};

if($sys.debug) {
    const q = $sys.q;
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
        version: 9,
    }
});
$sys.core = core;
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
$sys.app = app;
$sys.ui = $sys.proxy = proxy;

proxy.loading = true;
try {
    await core.start();
    await proxy.start();
} catch(e) {
    proxy.tips('连接服务器失败, 请检查网络连接, 或者过会再试一次');
}
proxy.loading = false;

})(
    globalThis,
    globalThis.location.search
);