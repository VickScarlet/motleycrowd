<script setup>
import { ref, toRefs } from 'vue';
import UserCard from '../components/UserCard.vue';
import ScoreRanking from '../components/ScoreRanking.vue';

const props = defineProps({
    rank: {type: Array, default: []},
    mine: {type: String, default: ''}
});
const {rank, mine} = toRefs(props);
const toggle = ref(true);
</script>

<template lang="pug">
.settlement-rank(:iscollapsed='toggle')
    button(@click='toggle=!toggle' collapse v-if='!toggle') {{$lang.g.collapse}}
    h3 {{$lang.g.rank}}
    ul.rank
        li(v-for='({uuid, ranking, answers, score}) in rank' :key='uuid' :ismine='uuid==mine' :ranking='ranking' @click='$emit("ch",uuid)')
            ul.info
                li.ranking: ScoreRanking(:score='score' :ranking='ranking')
                li.card: UserCard(:uuid='uuid')
            ul.scores
                li(v-for='({value, answer}, idx) in answers' :key='idx' :gt0='value>0' :title='`Q${idx+1}: ${answer}`')
                    span(:style='`opacity: ${Math.min(1, Math.abs(value/3)) || 0};`')
                    | {{value>0?'+':''}}{{value}}
    button(@click='toggle=!toggle' expand v-if='toggle') {{$lang.g.expand}}
    button(@click='toggle=!toggle' collapse v-else) {{$lang.g.collapse}}
</template>

<style lang="scss" scoped>
div.settlement-rank {
    position: relative;
    &[iscollapsed="true"] {
        overflow: hidden;
        max-height: 400px;
    }
    > button {
        display: block;
        font-size: 0.8em;
        cursor: pointer;
        border: none;
        &:hover {
            box-shadow: none;
        }
        &[collapse] {
            position: relative;
            width: 100%;
            height: 2.5em;
            color: #ffffff98;
            background: transparent;
        }
        &[collapse]:first-child {
            margin-bottom:10px;
        }
        &[collapse]:last-child {
            margin-top:10px;
        }

        &[expand] {
            position: absolute;
            bottom: 0;
            left: 50%;
            padding: 0.4em 2em;
            border-radius: 4em;
            box-shadow: 0 2px 8px #000000cc;
            color: #ffffff;
            transform: translate(-50%, -100%);
            background: linear-gradient(67deg, #291ba6, #6f349f );
        }
    }

    > ul.rank > li {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 5px 0;
        margin-top: 5px;
        &:first-child {
            margin-top: 0;
        }
        &[ismine="true"] {
            background: rgba($color: #ffa600, $alpha: 0.2);
            border-radius: 2px;
        }

        > ul.info {
            height: auto;
            width: 360px;
            display: flex;
            > li {
                position: relative;
                margin: auto;
                &.ranking {
                    height: 60px;
                    width: 60px;
                }
                &.card {
                    height: 100px;
                    width: 300px;
                }
            }
        }

        > ul.scores {
            padding: 0 10px;
            display: block;
            > li {
                position: relative;
                font-size: 0.8em;
                display: inline-block;
                padding: 2px 6px;
                min-width: 14px;
                text-align: center;
                height: 22px;
                background: #0000006a;
                margin: 3px;
                border-radius: 2em;
                span {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 2em;
                    z-index: -1;
                }

                &[gt0="true"] span {
                    background: #6eff46;
                }

                &[gt0="false"] span {
                    background: #ff5b5b;
                }
            }
        }
    }

}


@media screen and (max-width: 600px) {
div.settlement-rank {
    > ul.rank > li {
        flex-direction: column;
        margin-top: 10px;
        padding-bottom: 10px;
        padding-right: 5px;
        border-bottom: 1px solid #ffffff3f;
        &:first-child { margin-top: 0; }
        &:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }

        > ul.info { margin: auto; }
        > ul.scores { margin-top: 10px; }
    }
}
}
</style>