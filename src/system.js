async function initGlobal() {
    window.$ = {};
    window.$.utils =
    window.$u =
    window.$utils = await import('./functions/index.js');
    window.$.logic =
    window.$logic = await import('./functions/logic.js');
    window.$.normalize =
    window.$norml =
    window.$normalize = await import('./functions/normalize.js');
    window.$.hash =
    window.$hash = await import('./functions/hash.js');

    window.$.event =
    window.$event = await import('./event/index.js');
    window.$on = $event.on;
    window.$off = $event.off;
    window.$emit = $event.emit;

    window.$.moment =
    window.$moment = (await import('moment')).default;
}

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
    window.$.debug =
    window.$debug = configure.on;
    if($debug && configure.patch) {
        await configure.patch();
    }
}

async function initLogger(configure) {
}

async function initLang(configure) {
    const {default: Lang} = await import('./i18n/index.js');
    const lang = new Lang(configure);
    window.$.lang =
    window.$lang = lang;
    await lang.initialize();
}

async function initCore(configure) {
    const {default: Core} = await import('./core/index.js');
    const core = new Core(configure);
    window.$.core =
    window.$$ =
    window.$core = core;
    await core.initialize();
}

async function initApp(configure) {
    const {default: App} = await import('./app/index.js');
    const app = new App(configure);
    window.$.app =
    window.$app = app;
    await app.initialize();
}

function dURL() {
    const match = /\/#\/(([^\/\?]+)\/?)(\?+(.*))?/
        .exec(window.location.href);
    if(!match) return;
    let [,,page,,data,,query] = match;
    if(!data) data = {};
    else data = JSON.parse(decodeURIComponent(data));
    if(query)
        query.split('&').forEach(v=>{
            const [key, value] = v.split('=');
            data[key] = JSON.parse(decodeURIComponent(value))
        });
    $app.switch(page, data);
}

export async function start(cfgList) {
    window.onerror = (msg,source,line,col,error) =>
        alert(`${msg}at: ${source||"<anonymous>"}:${line}:${col}\n${error}`);

    await initGlobal();

    $on('network.banned', ()=>window.location.reload());

    const { debug, logger, i18n, core, app } = await configure(
        ['debug', 'logger', 'i18n', 'core', 'app'], cfgList
    );

    await initDebug(debug);
    await initLogger(logger);
    await initLang(i18n);
    await initCore(core);
    await initApp(app);

    $app.loading(true);
    try {
        const banned = $core.database.kv.get('banned');
        if(banned && banned > Date.now()) {
            $app.tips($lang.t.banned);
            return;
        }
        await $core.start();
        await $app.start();
        $app.loading(false);
        $emit('system.start');
    } catch(e) {
        console.error(e);
        $app.tips($lang.t.init_err);
    }
    window.onpopstate = dURL;
    dURL();
}

export default start;