<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['done']);

const props = defineProps({
    content: {type: String, required: true},
    type: {type: String, default: 'info'},
});

const n = ref(0);
const list = ref([]);
const tips = computed(()=>list.value?.slice(0, n.value).join('') || '');

let interval = null;
let timeout = null;
const update = ()=>{
    clearTimeout(timeout);
    timeout = null;
    n.value = 0;
    list.value = props.content.match(/(\w+|[^\w])/g) || [];
    if(list.value.length == 0) return;
    if(interval) return;
    interval = setInterval(()=>{
        if (n.value < list.value.length)
            return n.value++;
        clearInterval(interval);
        interval = null;
        timeout = setTimeout(()=>emit('done'), 2000);
    }, 50);
};

watch(()=>props.content, update);
update();
</script>

<template lang="pug">
.tips(:type='type')
    span.icon
    span.content {{tips}}
</template>

<style lang="scss" scoped>
div.tips {
    pointer-events: none;
    position: relative;
    display: inline-block;
    background: #777c97ad;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    min-width: 1.5em;
    min-height: 1.5em;
    padding: 0.5em;
    border-radius: 2em;
    box-shadow: 0 4px 16px -2px #000;
    >.icon {
        background-image: url(/icons/info.svg);
        background-size: 1.5em;
        width: 1.5em;
        height: 1.5em;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0.5em;
    }
    &[type="achievement"] {
        background: #00ff04ad;
        top: 2em;
        >.icon {
            background-image: url(/icons/achi.svg);
        }
    }
    >.content {
        display: block;
        margin-left: 2em;
        margin-right: 0.5em;
    }
}
</style>