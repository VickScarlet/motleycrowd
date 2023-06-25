<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    total: {type: Number, default: 0},
    live: {type: Number, default: 5},
    page: {type: Number, default: 1}
});
const emit = defineEmits(['update:page']);
const _input = ref(1);
const _p = ref(1);
const center = ref([]);
const input = computed({
    get: _=>_input.value||_p.value,
    set(input) {
        if(input < 1)
            input = 1;
        else if(input > props.total)
            input = props.total;
        _input.value = input;
    }
});
const p = computed({
    get: _=>_p.value,
    set(page) {
        if(page < 1 || page > props.total)
            return;
        const live = props.live;
        const total = props.total;
        const prev = Math.floor(live/2);
        const start = total < live ? 1
            : Math.max(1, page - prev);
        const end = Math.min(total, start + live);
        center.value = new Array(end - start + 1)
            .fill(0).map((_, i) => start + i);
        input.value = page;
        if(page === this._p) return;
        _p.value = page;
        emit('update:page', page);
    }
})
watch(()=>props.total, _=>p.value=_p.value);
watch(()=>props.page, p1=>p.value=p1);
p.value=props.page;
</script>

<template lang="pug">
ul.pages
    li.first(@click='p=1') ⇤
    li.prev(@click='p--') ↞
    li(v-for='_ in center' :key='_' @click='p=_' :class='{active: p==_, center: 1}') {{_}}
    li.next(@click='p++') ↠
    li.last(@click='p=total') ⇥
    li.input: input(type='number' v-model.number='input')
    li.go(@click='p=input') ↲
</template>

<style lang="scss" scoped>
ul.pages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 35px;
    list-style: none;
    li {
        padding: 0;
        margin: 0 5px;
        line-height: 35px;
        text-align: center;
        width: 35px;
        height: 35px;
        border: 1px solid #000;
        border-radius: 5px;
        cursor: pointer;

        &:first-child { margin-left: 0; }
        &:last-child { margin-right: 0; }

        &:hover {
            background: #000;
            color: #fff;
        }
        &.active {
            background: #000;
            color: #fff;
        }
        &.input {
            border: none;
            width: 37px;
            height: 37px;
            > input {
                width: 35px;
                height: 35px;
                line-height: 35px;
                padding: 0;
                margin: 0;
                border: 1px solid #266fdb !important;
                border-radius: 5px;
                text-align: center;
                background: none;
            }
        }
    }
}
</style>