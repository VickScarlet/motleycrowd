<script setup>
import { toRef } from 'vue';

const props = defineProps({grade: {type: Number, required: true}});
const grade = toRef(props, 'grade');
</script>

<template lang="pug">
span.grade(:grade='grade') {{$lang.g[`grade_${grade}`]}}
</template>

<style lang="scss" scoped>
span.grade {
    padding: 2px 4px;
    border-radius: 4px;
    display: inline-block;
    vertical-align: top;
    text-shadow: #000000b2 1px 1px 2px;
    box-shadow: #00000060 1px 1px 2px;
    &[grade="0"] { display: none; }
    &[grade="1"] { background: #39c2f9; }
    &[grade="2"] { background: #e24fff; }
    &[grade="3"] { background: #fbb946; }
}

</style>