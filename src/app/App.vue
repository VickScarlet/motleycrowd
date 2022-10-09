<template>
    <svg class="editorial"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none">
        <defs>
            <path id="gentle-wave"
                d="M-160 44c30 0
                    58-18 88-18s
                    58 18 88 18
                    58-18 88-18
                    58 18 88 18
                    v44h-352z" />
        </defs>
        <g class="parallax">
            <use xlink:href="#gentle-wave" x="50" y="0" />
            <use xlink:href="#gentle-wave" x="50" y="3" />
            <use xlink:href="#gentle-wave" x="50" y="6" />
        </g>
    </svg>
    <keep-alive>
        <component :is="page" v-bind="_data"/>
    </keep-alive>
    <p class="serverstat">
        {{$lang.g.delay_as.f(delay)}}<br/>
        {{$lang.g.online_as.f(online)}}
    </p>
    <Loading v-show="loading" />
    <Alert v-show="showAlert" @hide="hideAlert">{{alertMessage}}</Alert>
    <Tips v-show="showTips" @click="hideTips">{{tipsMessage}}</Tips>
    <div class="fullscreen">
        <input id="fullscreencb" type="checkbox" @click="fullscreen()" v-model.trim="isfullscreen"/>
        <label for="fullscreencb">{{
            isfullscreen?
                $lang.g.window:
                $lang.g.fullscreen
        }}</label>
    </div>
</template>

<script>
import './style/app.scss';
import { defineComponent } from 'vue';
import Welcome from './screen/Welcome.vue';
import Authentication from './screen/Authentication.vue';
import Index from './screen/Index.vue';
import Room from './screen/Room.vue';
import Question from './screen/Question.vue';
import Settlement from './screen/Settlement.vue';
import History from './screen/History.vue';
import Achievement from './screen/Achievement.vue';
import Rank from './screen/Rank.vue';
import Accessory from './screen/Accessory.vue';

import Loading from './components/Loading.vue';
import Alert from './components/Alert.vue';
import Tips from './components/Tips.vue';

export default defineComponent({
    name: 'App',
    components: {
        Welcome, Authentication, Index,
        Room, Question, Settlement, History,
        Achievement, Rank, Accessory,

        Loading, Alert, Tips,
    },
    data() {
        return {
            loading: true,
            showAlert: false,
            page: 'Welcome',
            alertMessage: '',
            delay: -1,
            online: -1,
            tipsMessage: '',
            showTips: false,
            isfullscreen: false,
            _data: {},
        }
    },
    mounted() {
        $on('network.error', ()=>{
            this.loading = false;
            this.tips($lang.t.net_error);
        });
        $on('network.kick', ()=>{
            this.loading = false;
            this.tips($lang.t.net_kick);
        });
        $on('network.resume', async isAuth=>{
            this.loading = false;
            if(isAuth) {
                this.tips($lang.t.net_resume);
                return;
            }
            this.tips($lang.t.net_resume_filed);
            this.switch('Welcome');
            const [success] = await $core.user.autologin();
            if (success) {
                this.tips($lang.t.net_resume_uto);
                if ($core.game.isInRoom) return;
                this.switch('Index');
            }
        });
        $on('game.start', ()=>this.switch('Question'));
        $on('game.question', ()=>this.switch('Question'));
        $on('game.resume.room', ()=>this.switch('Room'));
        $on('game.resume.question', ()=>this.switch('Question'));
        $on('game.settlement', data=>this.switch('Settlement', {data}));

        $on('command.error', code=>{
            this.loading = false;
            const message = $lang.e[code];
            this.tips(message);
        });
    },
    methods: {
        switch(page, data) {
            this._data = data || {};
            if(this.page == page) return;
            this.page = page;
        },
        alert(message) {
            this.alertMessage = message;
            this.showAlert = true;
        },
        hideAlert() {
            this.showAlert = false;
        },
        async start() {
            this.tips($lang.t.welcome);
            const [success, notAuto] = await $core.user.autologin();
            if (success) {
                this.tips($lang.t.autologin_success);
                if ($core.game.isInRoom) return;
                this.switch('Index');
            } else if (!notAuto) {
                this.tips($lang.t.autologin_failed);
            }
            const showUrlPage = () => {
                const match = /\/#\/(([^\/\?]+)\/?)(\?+(.*))?/
                    .exec(globalThis.location.href);
                if(!match) return;
                let [,,page,,data,,query] = match;
                if(!data) data = {};
                else data = JSON.parse(decodeURIComponent(data));
                if(query)
                    query.split('&').forEach(v=>{
                        const [key, value] = v.split('=');
                        data[key] = JSON.parse(decodeURIComponent(value))
                    });
                this.switch(page, data);
            }
            globalThis.onpopstate = showUrlPage;
            showUrlPage();
            const updateStat = async () => {
                const {delay, online} =await $core.ping();
                this.delay = delay;
                this.online = online;
            }
            setInterval(updateStat, 10000);
            await updateStat();
        },
        hideTips() {
            this.showTips = false;
        },
        tips(message) {
            this.tipsMessage = message;
            this.showTips = true;
            setTimeout(() => this.hideTips(), 3000);
        },
        fullscreen() {
            if (!document.webkitIsFullScreen) {
                const de = document.documentElement;
                if(de.requestFullscreen) return de.requestFullscreen();
                if(de.mozRequestFullScreen) return de.mozRequestFullScreen();
                if(de.webkitRequestFullScreen) return de.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                if(de.msRequestFullScreen) return de.msRequestFullScreen();
                return this.tips($lang.t.unsupport_fullscreen);
            }
            const d = document;
            if(d.exitFullscreen) return d.exitFullscreen();
            if(d.mozCancelFullScreen) return d.mozCancelFullScreen();
            if(d.webkitCancelFullScreen) return d.webkitCancelFullScreen();
            if(d.msExitFullscreen) return d.msExitFullscreen();
        },
    },
});
</script>

<style scoped lang="scss">
.serverstat {
    font-size: 0.8em;
    color: #888;
    display: block;
    text-align: left;
    z-index: 10;
    position: fixed;
    top: 0.2em;
    left: 0.2em;
}

.fullscreen {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: block;
    text-align: left;
    z-index: 99999999;
    position: fixed;
    bottom: 0.4em;
    right: 0.4em;
    width: 3em;
    height: 3em;
    line-height: 3em;
    text-align: center;
}
.fullscreen label {
    font-size: 0.8em;
    color: #888;
    background: var(--button-background);
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;;
}
.fullscreen input {
    display: none;
}

@keyframes move-forever{
    0%{transform: translate(-90px , 0%)}
    100%{transform: translate(85px , 0%)}
}

.editorial {
    z-index: -999999;
    display: block;
    width: 100%;
    height: 10%;
    max-height: 100%;
    margin: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    .parallax > use{
        animation:move-forever 12s linear infinite;
        &:nth-child(1){fill: #1b0e2d; animation-delay:-2s;}
        &:nth-child(2){fill: #141d38; animation-delay:-2s; animation-duration:5s}
        &:nth-child(3){fill: #1a1438; animation-delay:-4s; animation-duration:3s}
    }
}

</style>
