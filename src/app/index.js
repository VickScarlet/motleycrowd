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
        app.config.globalProperties.$lang = $lang;
        app.config.globalProperties.$core = $core;
        app.config.globalProperties.$utils = $utils;
        app.config.globalProperties.$logic = $logic;
        app.config.globalProperties.$norml = $norml;
        this.#app = app;
        app.mixin({
            props: {
                getData: {
                    type: Function,
                    default: ()=>({}),
                },
            },
        });
        this.#proxy = app.mount('#app');
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