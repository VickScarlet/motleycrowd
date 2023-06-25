<script setup>
import { toRefs, computed } from 'vue';
import ScoreRanking from '../components/ScoreRanking.vue';

const props = defineProps({
    id: {type: String, required: true},
    created: {type: String, required: true},
    ranking: {type: Number, required: true},
    score: {type: Number, required: true},
    type: {type: Number, required: true},
    private: {type: Boolean},
});
const {id, created, ranking, score} = toRefs(props);
const typeText = computed(() => {
    const sub = props.private? 'private': 'pair';
    return $lang.g[`${sub}_${props.type}`];
});
</script>

<template lang="pug">
.history-item
    .ranking: ScoreRanking(:score='score' :ranking='ranking')
    .info
        span.type {{typeText}}
        span.time {{$moment(created).fromNow()}}
    .review: button(@click='$emit("review", id)') {{$lang.g.review}}
</template>

<style lang="scss" scoped>
div.history-item {
    height: 60px;
    display: flex;
    padding: 10px;
    background: #4e4e4e;
    background: #24242493;
    background: linear-gradient(to right, #243c5eb9, #24242400);
    border-radius: 4px;

    > div {
        display: inline-block;
        height: 60px;
        position: relative;
        margin-left: 10px;
        &:first-child { margin-left: 0; }
        &.info {
            width: 100px;
            > span {
                display: block;
                text-align: center;
                left: 0;
                &.type {
                    height: 35px;
                    top: 0;
                    font-size: 1.2em;
                    font-weight: bold;
                    color: #ffffff;
                }
                &.time {
                    height: 25px;
                    bottom: 0;
                    color: #888888;
                }
            }
        }
        &.review {
            width: 60px;
            > button {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 60px;
                height: 30px;
                margin: auto;
                border: none;
                border-radius: 4px;
                background: #2563b3;
                color: #ffffff;
                font-size: 1em;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
}

</style>