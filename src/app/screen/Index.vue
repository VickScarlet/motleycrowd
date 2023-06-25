<script setup>
import Game from './Index.Game.vue';
import Rank from './Index.Rank.vue';
import User from './Index.User.vue';
import { ref, reactive, markRaw } from 'vue';

const menu = reactive([
    {type: 'game', text: '游戏', page: markRaw(Game)},
    {type: 'rank', text: '排行', page: markRaw(Rank)},
    {type: 'user', text: '个人', page: markRaw(User)}
]);
const page = ref(markRaw(Game));
</script>

<template lang="pug">
.index
    keep-alive: component(:is='page')
    ul.menu: li(v-for='{type, text, page: p} in menu'
        :class='{actived: page===p}'
        :key='type' :type='type' @click='page=p'
    )
        span.icon
        span.text {{text}}
</template>

<style lang="scss" scoped>

ul.menu {
    position: fixed;
    bottom: 1em;
    left: 1em;
    > li {
        cursor: pointer;
        user-select: none;
        display: flex;
        background: linear-gradient(90deg, #f9d523 0%, #f9d52394 20%, #f9d52344 100%);
        backdrop-filter: blur(5px);
        padding: 0.2em;
        margin-top: 0.6em;
        border-radius: 10em;
        align-items: center;
        width: 8.3em;
        &.actived { background: linear-gradient(90deg, #f9d523 0%, #f9d52394 100%); }

        &:hover {
            padding: 0.5em;
            margin-top: 0.3em;
            margin-left: -0.3em;
            margin-bottom: -0.3em;
        }

        &[type="game"] > .icon { background-image: url(/icons/home.svg); }
        &[type="rank"] > .icon { background-image: url(/icons/rank.svg); }
        &[type="user"] > .icon { background-image: url(/icons/star.svg); }
        > .icon {
            width: 2em;
            height: 2em;
            display: inline-block;
            background-size: 2em 2em;
            background-color: #ffffffe1;
            background-repeat: no-repeat;
            background-position: center;
            padding: 0.5em;
            border-radius: 10em;
            box-shadow: #181b1986 0 2px 8px -1px;
        }
        > .text {
            color: #ffffff;
            display: block;
            width: 5em;
            text-shadow: #3a0649 0 0 0.5em;
        }
    }
}

@media screen and (max-width: 680px) {

    ul.menu {
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        background-color: #ffffff88;
        > li {
            display: block;
            background: none;
            padding: 0.3em 0;
            border-radius: 0;
            width: 100%;
            margin-top: 0;
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 0;

            &:hover {
                padding: 0.3em 0;
                margin-top: 0;
                margin-left: 0;
                margin-right: 0;
                margin-bottom: 0;
                background-color: #00000016;
            }
            > .icon {
                background: none;
                border-radius: 0;
                box-shadow: none;
            }
            > .text {
                width: 100%;
            }
            &.actived { background: #00000020; }
        }
    }
}

</style>