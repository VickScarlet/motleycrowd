import cryptoJS from "crypto-js";
import Core from './core/index.js'
import { createApp } from 'vue'
import './style/app.scss'
import App from './components/App.vue'

window.onerror = function(msg,source,line,col,error) {
    alert(`${msg}\nat: ${source||"<anonymous>"}:${line}:${col}\n${error}`);
}

const core = new Core({
    session: {
        protocol: 'ws',
        host: "192.168.31.2",
        port: 1919,
        // handler
    }
});

await core.initialize();
const app = createApp(App);
const proxy = app.mount('#app');

const $ = {
    app,
    proxy,
    ui: proxy,
    core,
    passwordEncrypt (password) {
        const CMap = 'tz4l/abUX3HDVhwG.pqcrLmsN@Yk+SAEdRBvxy2$7WPog8uFO19jJCZIinQf0MKT';
        const binaryStr = cryptoJS
            .HmacSHA256(password, cryptoJS.MD5(password).toString())
            .toString()
            .split('')
            .map(v=>parseInt(v,16).toString(2).padStart(4,'0'))
            .join('');
        const result = [];
        for(let i=0;i<binaryStr.length;) {
            const code = binaryStr.substring(i, i+=6);
            result.push(CMap[parseInt(code, 2)]);
        }
        return result.join('');
    }
};
window.$ = window.$sys = $;
proxy.loading = true;
await proxy.start();
proxy.loading = false;