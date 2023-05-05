<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    id: {},
    name: {type: String, require: true},
    description: {type: String, require: true},
    grade: {type: Number, require: true},
    unlocked: {type: Boolean, default: false},
    hide: {type: Boolean, default: false},
});
const { name, description, grade, unlocked, hide } = toRefs( props );
</script>

<template>
    <div class="achievement-item" v-if="unlocked" :grade=grade >
        <span class="name">{{name}}</span>
        <span class="desc">{{description}}</span>
    </div>
    <div class="achievement-item" v-if="!unlocked" :grade=grade locked >
        <span class="name" v-if="!hide">{{name}}</span>
        <span class="name" v-if="hide">???</span>
        <span class="desc" v-if="!hide">{{description}}</span>
        <span class="desc" v-if="hide">???</span>
    </div>
</template>

<style lang="scss" scoped>
div.achievement-item {
    position: relative;
    margin: 0;
    padding: 0;
    min-width: 100%;
    height: 6rem;
    border-radius: 4px;

    > span {
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
    &[grade='0'] { background: #f5f5f5; }
    &[grade='1'] { background: #6565e1; }
    &[grade='2'] { background: #c04fe2; }
    &[grade='3'] { background: #ee9b49; }
    >.name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #000000;
    }
    >.desc {
        font-size: 1rem;
        color: #000000;
    }

    &[locked]::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 1;
    }
}

</style>