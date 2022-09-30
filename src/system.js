import * as utils from './functions/index.js';
import * as logic from './functions/logic.js';
import * as normalize from './functions/normalize.js';
import {on, off, emit} from './event/index.js';
import Core from './core/index.js';
import App from './app/index.js';

async function configure(mods, lists) {
    const configure = {};
    for (const mod of mods) {
        configure[mod] = {};
    }
    await Promise
        .all(lists.map(p=>import(`./config/${p}.js`).catch(_=>null)))
        .then(modules=>modules.forEach(m => {
            if(!m) return;
            for (const mod of mods) {
                if(!m[mod]) continue;
                Object.assign(configure[mod], m[mod]());
            }
        }));
    return configure;
}

async function initDebug(configure) {
    if(!configure) return;
    window.$.debug = configure.on;
    window.$debug = configure.on;
    if($debug && configure.patch) {
        await configure.patch();
    }
}

async function initLogger(configure) {
}

async function initCore(configure) {
    const core = new Core(configure);
    window.$.core =
    window.$$ =
    window.$core = core;
    await core.initialize();
}

async function initApp(configure) {
    const app = new App(configure);
    window.$.app =
    window.$app = app;
    await app.initialize();
}

export async function start(cfgList) {
    window.$ = {};
    window.$.utils =
    window.$u =
    window.$utils = utils;
    window.$.logic =
    window.$logic = logic;
    window.$.normalize =
    window.$norml = normalize;
    window.$normalize = normalize;
    window.$on = on;
    window.$off = off;
    window.$emit = emit;
    window.$.event =
    window.$event = {on, off, emit};
    window.onerror = (msg,source,line,col,error) =>
        alert(`${msg}at: ${source||"<anonymous>"}:${line}:${col}\n${error}`);

    on('network.banned', ()=>window.location.reload());

    const { debug, logger, core, app } = await configure(
        ['debug', 'logger', 'core', 'ui'],
        cfgList
    );

    await initDebug(debug);
    await initLogger(logger);
    await initCore(core);
    await initApp(app);

    $app.loading = true;
    try {
        const banned = $core.database.kv.get('banned');
        if(banned && banned > Date.now()) {
            $app.tips('服务器拒绝为你工作');
            return;
        }
        await $core.start()
        await $app.start();
        $app.loading = false;
        $emit('system.start');
    } catch(e) {
        console.error(e);
        $app.tips('连接服务器失败, 请检查网络连接, 或者过会再试一次');
    }
}

export default start;