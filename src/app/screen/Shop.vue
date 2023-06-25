<script setup>
import { ref } from 'vue';
import AssetMoney from '../components/AssetMoney.vue';
import Good from './Shop.Good.vue';

const goods = ref([]);
const money = ref({});
const next = ref('');

const update = async ()=>{
    const {goods: g, expired} = await $core.shop.shelves();
    const {m0, m1} = await $core.asset.money();
    goods.value = g;
    money.value = {money: {m0, m1}};
    next.value = $lang.g.next_restocking.f(
        $moment(expired).calendar()
    );
}

const buy = async good => {
    $app.loading(true);
    const result = await $core.shop.buy(good);
    $app.loading(false);
    if (result) update();
}
update();
</script>

<template lang="pug">
.shop
    .header
        button.back(@click='$app.switch("Index")') {{$lang.g.back}}
        div
            span {{next}}
            span: AssetMoney(:asset='money')
    ul.goods: li(v-for='good in goods' :key='good.id')
        Good(v-bind='good' @buy='buy(good)')
</template>

<style lang="scss" scoped>
div.shop {
    margin: 120px 0;
    > .header {
        > * { margin-top: 10px; }
        > div > span {
            vertical-align: middle;
            display: inline-block;
            &:first-child { margin-right: 10px; }
        }
    }
    > ul.goods {
        max-width: 720px;
        > li {
            display: inline-block;
        }
    }
}
</style>