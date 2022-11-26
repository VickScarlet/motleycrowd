import { createApp } from 'vue';
import UI from './App.vue';

export default class App {
    constructor(configure) {
        this.#configure = configure || {};
    }
    #configure;
    #app;
    #proxy;

    async initialize() {
        const app = createApp(UI);
        app.config.globalProperties.$app = this;
        app.config.globalProperties.$lang = $lang;
        app.config.globalProperties.$core = $core;
        app.config.globalProperties.$utils = $utils;
        app.config.globalProperties.$logic = $logic;
        app.config.globalProperties.$norml = $norml;
        app.config.globalProperties.$moment = $moment;
        app.config.globalProperties.$debug = $debug;
        this.#app = app;
        const proxy = app.mount('#app');
        this.#proxy = proxy;

        $on('network.error', ()=>{
            proxy.loading = false;
            proxy.tips($lang.t.net_error);
        });
        $on('network.kick', ()=>{
            proxy.loading = false;
            proxy.tips($lang.t.net_kick);
        });
        $on('network.resume', async isAuth=>{
            proxy.loading = false;
            if(isAuth) {
                proxy.tips($lang.t.net_resume);
                return;
            }
            proxy.tips($lang.t.net_resume_filed);
            proxy.switch('Welcome');
            const [success] = await $core.user.autologin();
            if (success) {
                proxy.tips($lang.t.net_resume_auto);
                if ($core.game.isInRoom) return;
                proxy.switch('Index');
            }
        });
        $on('game.start', ()=>proxy.switch('Question'));
        $on('game.question', ()=>proxy.switch('Question'));
        $on('game.resume.room', ()=>proxy.switch('Room'));
        $on('game.resume.question', ()=>proxy.switch('Question'));
        $on('game.settlement', data=>proxy.switch('Settlement', {data}));

        $on('command.error', code=>{
            proxy.loading = false;
            proxy.tips($lang.e[code]);
        });
        $on('achievement.unlock', achievement=>{
            const name = $.core.sheet.get('achievement', achievement, 'name');
            proxy.tips($lang.t.achievement_unlock.f(name), 'achievement');
        });
    }

    async start() {
        return this.#proxy.start();
    }

    get loading() {return this.#proxy.loading;}
    set loading(val) {this.#proxy.loading = !!val;}

    switch(page, data) {
        this.#proxy.switch(page, data);
    }

    tips(message) {
        this.#proxy.tips(message);
    }

}