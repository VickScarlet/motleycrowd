<script setup>
import { toRef, computed } from 'vue';
const props = defineProps({card: {type: String, default: ''}});
const card = toRef(props, 'card');
const grade = computed(()=>$core.sheet.get('card', props.card, 'grade') || 0);
</script>

<template>
    <div class="v-card" :card="card" :grade="grade">
        <div><slot></slot></div>
    </div>
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
        z-index: 5;
    }
}

</style>