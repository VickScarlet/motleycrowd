<template lang="pug">
.count-down-progress
    .bg
    .bar(:style='`right:${100-width}%;`')
    p {{left}}s
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({total: Number, left: Number});
const left = ref(0);
const width = ref(0);
let interval = null;
const render = ()=>{
    if(interval) {
        clearInterval(interval);
        interval = null;
    }

    const total = props.total;
    const end = Date.now() + (props.left || total);
    const tick = ()=>{
        const l = end - Date.now();
        if(l > 0) {
            left.value = Math.floor(l / 1000);
            width.value = l / total * 100;
            return;
        }

        clearInterval(interval);
        interval = null;
        width.value = 0;
        left.value = 0;
    };
    interval = setInterval(tick, 100);
    tick();
};

watch(()=>props.total, render);
watch(()=>props.left, render);
render();
</script>

<style lang="scss" scoped>
div.count-down-progress {
    position: relative;
    width: 100%;
    height: 100%;
    > .bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(35deg, #2b1330, #0e1237);
        border: 2px solid black;
        opacity: 0.8;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba($color: #000000, $alpha: .8);
    }

    > .bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: 2px;
        background: linear-gradient(15deg, #a34bb9, #3b4ec8);
        border-radius: 4px;
    }

    > p {
        position: absolute;
        padding: 0;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-shadow: 0 0 4px #4bff87;
    }
}
</style>