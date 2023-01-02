<script setup>
import { ref, watch } from 'vue';
const props = defineProps({badge: {type: String, default: ''}});
const name = ref('');
const grade = ref(0);
const display = ref(false);
const update = ()=>{
    const data = $core.sheet.get('badge', props.badge);
    display.value = !!data;
    if(!display.value) return;
    name.value = data.name;
    grade.value = data.grade;
}
watch(()=>props.badge, update);
update();
</script>

<template>
    <span class="badge" :grade="grade" v-if="display">{{name}}</span>
</template>

<style lang="scss" scoped>
span.badge {
    padding: 0 4px;
    border-radius: 4px;
    text-shadow: #000000b2 1px 1px 2px;
    box-shadow: #00000060 1px 1px 2px;
    &[grade="0"] { background: #383838; }
    &[grade="1"] { background: #39c2f9; }
    &[grade="2"] { background: #e24fff; }
    &[grade="3"] { background: #fbb946; }
}

</style>