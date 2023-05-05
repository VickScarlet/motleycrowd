<script setup>
import ModalRoomCode from './Modal.RoomCode.vue';
import { ref } from 'vue';

const custom = ref(false);
const pair = async type => {
    console.debug('pair', type);
    $app.loading(true);
    const result = await $core.game.pair(type);
    $app.loading(false);
    if (result) $app.switch('Room');
};
const create = async type => {
    custom.value = false;
    $app.loading(true);
    const result = await $core.game.create(type);
    $app.loading(false);
    if (result) $app.switch('Room');
};
const join = async code => {
    custom.value = false;
    $app.loading(true);
    const result = await $core.game.join(code);
    $app.loading(false);
    if (result) $app.switch('Room');
};
const cancel = () => {
    custom.value = false;
};
</script>

<template>
    <div class="index-game">
        <h1>{{$lang.g.title}}</h1>
        <h3 class="subtitle">{{$lang.g.subtitle}}</h3>
        <ul class="menu">
            <li class="l-1" @click="pair(100)">
                <span class="icon"></span>
                <span>{{$lang.g.pair_mode.f(100)}}</span>
            </li>
            <li class="l-2" @click="pair(10)">
                <span class="icon"></span>
                <span>{{$lang.g.pair_mode.f(10)}}</span>
            </li>
            <li class="l-3" @click="custom=!custom">
                <span class="icon"></span>
                <span>{{$lang.g.priv_mode}}</span>
            </li>
            <li class="l-4" @click="$app.switch('History')">
                <span class="icon"></span>
                <span>{{$lang.g.history}}</span>
            </li>
        </ul>
    </div>
    <teleport to="body">
        <ModalRoomCode v-show="custom" @create="create" @join="join" @cancel="cancel"/>
    </teleport>
</template>

<style lang="scss" scoped>
div.index-game {
    > ul.menu {
        max-width: 600px;
        > li {
            cursor: pointer;
            user-select: none;
            display: inline-block;
            width: 220px;
            height: 100px;
            backdrop-filter: blur(10px);
            border-radius: 8px;
            font-size: 2.5em;
            line-height: 100px;
            color: #1b0c56;
            text-align: left;
            padding-left: 20px;
            font-weight: bold;
            margin: 8px;
            margin-top: auto;
            position: relative;
            span { position: absolute; }
            span.icon {
                border-radius: 0 8px 8px 0;
                display: block;
                width: 120px;
                height: 100px;
                background-repeat: no-repeat;
                background-position: 0px -20px;
                background-size: 130px;
                position: absolute;
                right: 0;
                top: 0;
            }
            &.l-1 {
                background: linear-gradient(45deg, #f5f5f5, #8282b4);
                span.icon { background-image: url(/icons/game100.svg); }
            }
            &.l-2 {
                background: linear-gradient(45deg, #f5f5f5, #8282b4);
                span.icon { background-image: url(/icons/game10.svg); }
            }
            &.l-3 {
                background: linear-gradient(45deg, #f5f5f5, #438e8a);
                span.icon { background-image: url(/icons/gamec.svg); }
            }
            &.l-4 {
                background: linear-gradient(45deg, #f5f5f5, #8b8941);
                span.icon { background-image: url(/icons/history.svg); }
            }
        }
    }
}
</style>