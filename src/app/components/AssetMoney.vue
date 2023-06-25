<script setup>
import { computed } from 'vue';
import Money from './Money.vue';

const props = defineProps({asset: {type: Object, default: {}}});
const list = computed(()=>Object.entries(props.asset?.money||{}).map(([type, value])=>({type, value})));
</script>

<template lang="pug">
ul.asset-money
    li(v-for='money in list' :key='money.type')
        Money(v-bind='money')
</template>

<style lang="scss" scoped>
ul.asset-money {
    display: flex;
    width: auto;
    >li {
        display: inline-block;
        line-height: 100%;
        margin: 0;
        margin-left: 4px;
        &:first-child { margin-left: 0; }
    }
}
</style>