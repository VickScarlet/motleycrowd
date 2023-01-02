<template>
    <div class="history">
        <div class="header">
            <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
            <div class="pages">
                <Pages :total="total" :page="page" @update:page="_=>p=_" />
            </div>
        </div>
        <ul class="list">
            <li v-for="data in history" :key="data.id">
                <Item v-bind="data" @review="review"/>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onActivated } from 'vue';
import Item from './History.Item.vue';
import Pages from '../components/Pages.vue';
const props = defineProps({page: {type: Number, default: 1}});
const _p = ref(1);
const total = ref(0);
const history = ref([]);
const p = computed({
    get: _ => _p.value,
    set: async page => {
        _p.value = page;
        $app.loading(true);
        const h = await $core.game.history(page);
        $app.loading(false);
        if (!h) return;
        history.value = h;
    }
});

const review = async id => {
    $app.loading(true);
    const data = await $core.game.get(id);
    $app.loading(false);
    if(!data) return;
    const page = p.value;
    const ok = ()=>$app.switch('History', {page});
    $app.switch('Settlement', {data, ok});
};
onActivated(async ()=>{
    total.value = await $core.game.pages();
    p.value = props.page;
});
</script>

<style lang="scss" scoped>
div.history {

    >.header {
        > button {
            position: absolute;
            left: 50%;
            top: 5px;
            transform: translateX(-50%);
        }

        > div.pages {
            position: absolute;
            left: 50%;
            bottom: 5px;
            transform: translateX(-50%);
        }
    }
    > ul.list {
        margin: 120px 0;
    }
}


</style>