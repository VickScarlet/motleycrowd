<script setup>
import { toRef, computed } from 'vue';
const props = defineProps({card: {type: String, default: ''}});
const card = toRef(props, 'card');
const grade = computed(()=>$core.sheet.get('card', props.card, 'grade') || 0);
</script>

<template lang="pug">
.v-card(:card='card' :grade='grade')
    span.back
    div: slot
    span.front
</template>

<style lang="scss" scoped>
div.v-card {
    display: block;
    position: relative;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    > div {
        position: relative;
        display: block;
        padding: 10px;
        top: 50%;
        left: 0;
        width: calc(100% - 20px);
        transform: translateY(-50%);
    }
    > .back, > .front {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

}

</style>