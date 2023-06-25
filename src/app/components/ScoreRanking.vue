<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    ranking: {type: Number, default: 0},
    score: {type: Number, default: 0},
});
const {ranking, score} = toRefs(props);
</script>

<template lang="pug">
.score-ranking(:ranking='ranking' :score='score')
    span {{ranking}}
    span {{score}}
</template>

<style lang="scss" scoped>
div.score-ranking {
    display: flex;
    flex-direction: column;
    font-style: italic;
    height: 60px;
    width: 60px;
    text-align: center;
    margin: 0;

    span { display: block; }

    span:first-child {
        height: 36px;
        line-height: 36px;
        font-size: 1.8em;
        text-shadow: 0 0 8px #2563b3;
        border: #2563b3 solid 2px;
        border-radius: 4px 4px 0 0;
    }

    span:last-child {
        height: 20px;
        line-height: 20px;
        font-size: 1em;
        background: #2563b3;
        border-radius: 0 0 4px 4px;
    }

    &[ranking="1"] {
        span:first-child {
            position: relative;
            text-shadow: 0 0 8px #ffe600;
            border: #ffe600 solid 2px;
        }
        span:last-child {
            background: #ffe600;
            color: #2563b3
        }
    }
}

</style>