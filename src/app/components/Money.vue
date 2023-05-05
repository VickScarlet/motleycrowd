<script setup>
import { toRef, computed } from 'vue';
const props = defineProps({
    type: {type: String, required: true},
    value: {type: Number, required: true},
});
const type = toRef(props, 'type');
const money = computed(()=>{
    const value = props.value || 0;
    if(value < 10000) return value;
    if(value < 10000000) return `${(value / 1000).toFixed(1)}K`;
    if(value < 10000000000) return `${(value / 1000000).toFixed(1)}M`;
    return `${(value / 1000000000).toFixed(1)}B`;
});
</script>

<template>
    <span class="money">
        <span class="icon" :type="type"></span>
        <span class="value">{{money}}</span>
    </span>
</template>

<style lang="scss" scoped>
span.money {
    height: 16px;
    display: flex;
    vertical-align: top;
    font-family: consolas, 'Courier New', Courier, monospace;

    > span {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        vertical-align: top;
    }
    > span.value { margin-left: 4px; }
    > span.icon {
        width: 16px;
        &[type="m0"] {
            background: url('/money/m0.svg') no-repeat;
        }
        &[type="m1"] {
            background: url('/money/m1.svg') no-repeat;
        }
    }
}

</style>