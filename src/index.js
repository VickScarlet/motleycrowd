import { on, off, emit } from './events/index.js';
import Core from './core/index.js'
import { createApp } from 'vue'
import './style/app.scss'
import App from './components/App.vue'

window.onerror = function(msg,source,line,col,error) {
    alert(`${msg}\nat: ${source||"<anonymous>"}:${line}:${col}\n${error}`);
}
window.$ = window.$sys = {};
window.$sys.on = on;
window.$sys.off = off;
window.$sys.emit = emit;

const core = new Core({
    session: {
        protocol: 'wss',
        host: "motleycrowdservice.syaro.io",
        port: 443,
        // protocol: 'ws',
        // host: '127.0.0.1',
        // port: 1919,
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