<script setup>
import './style/app.scss';
import { ref, reactive, computed, markRaw } from 'vue';
import Welcome from './screen/Welcome.vue';
import Authentication from './screen/Authentication.vue';
import Index from './screen/Index.vue';
import Room from './screen/Room.vue';
import Question from './screen/Question.vue';
import Settlement from './screen/Settlement.vue';
import History from './screen/History.vue';
import Achievement from './screen/Achievement.vue';
import Accessory from './screen/Accessory.vue';
import Shop from './screen/Shop.vue';

import Loading from './components/Loading.vue';
import Tips from './components/Tips.vue';

const components = {
    Welcome, Authentication, Index,
    Room, Question, Settlement, Shop,
    History, Achievement, Accessory,
};
const loading = ref(true);
const page = ref(markRaw(Welcome));
const delay = ref($lang.g.delay_as.f(-1));
const online = ref($lang.g.online_as.f(-1));
const _tips = reactive({d: {}, n: 0});
const _data = ref({});
const _t = computed(()=>Object.entries(_tips.d).map(([i, {c, t}])=>({i, c, t})));

const tips = (c, t="info") => _tips.d[_tips.n++] = {c, t};
const sw = (p, d) => {
    _data.value = d ?? {};
    page.value = markRaw(components[p]);
};

defineExpose({
    tips, switch: sw,
    loading(l) {loading.value = l;},
    async start() {
        tips($lang.t.welcome);
        const [success, notAuto] = await $core.user.autologin();
        if (success) {
            tips($lang.t.autologin_success);
            if ($core.game.isInRoom) return;
            sw('Index');
        } else if (!notAuto) {
            tips($lang.t.autologin_failed);
        }
        const updateStat = async () => {
            const d = await $core.ping();
            delay.value = $lang.g.delay_as.f(d.delay);
            online.value = $lang.g.online_as.f(d.online);
        }
        setInterval(updateStat, 10000);
        await updateStat();
    },
});

</script>

<template lang="pug">
svg.editorial(viewBox="0 24 150 28" preserveAspectRatio="none")
    defs: path#gentle-wave(d=`M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z`)
    g.parallax: each y in [0,3,6]
        use(xlink:href="#gentle-wave" x="50" y=y)

keep-alive: component(:is="page" v-bind="_data")
p.serverstat {{delay}}<br/>{{online}}
Loading(v-show="loading")
ul.tips: li(v-for="{i, c, t} in _t" :key="i")
    Tips(:content="c" :type="t" @done="delete _tips.d[i]")
</template>

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
    pointer-events: none;
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

ul.tips {
    z-index: 9999999;
    position: fixed;
    top: 4em;
    left: 50%;
    max-width: 90%;
    transform: translateX(-50%);
    li {
        margin-bottom: 0.2em;
    }
}

</style>
