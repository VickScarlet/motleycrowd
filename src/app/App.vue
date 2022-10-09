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
    <Tips v-show="showTips" @click="showTips=false">{{tipsMessage}}</Tips>
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
import Tips from './components/Tips.vue';

export default defineComponent({
    name: 'App',
    components: {
        Welcome, Authentication, Index,
        Room, Question, Settlement, History,
        Achievement, Rank, Accessory,

        Loading, Tips,
    },
    data() {
        return {
            loading: true,
            page: 'Welcome',
            delay: -1,
            online: -1,
            tipsMessage: '',
            showTips: false,
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
            const updateStat = async () => {
                const {delay, online} =await $core.ping();
                this.delay = delay;
                this.online = online;
            }
            setInterval(updateStat, 10000);
            await updateStat();
        },
        tips(message) {
            this.tipsMessage = message;
            this.showTips = true;
            setTimeout(() => this.showTips=false, 3000);
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
