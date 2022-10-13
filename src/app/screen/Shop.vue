<template>
    <div class="shop">
        <div class="header">
            <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
            <div>
                <span>{{next}}</span>
                <span><AssetMoney :asset="money" /></span>
            </div>
        </div>
        <ul class="goods">
            <li v-for="good in goods" :key="good.id">
                <Good v-bind="good" @buy="buy(good)" />
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import AssetMoney from '../components/AssetMoney.vue';
import Good from './Shop.Good.vue';

export default defineComponent({
    components: {Good, AssetMoney},
    data() {
        return {
            goods: [],
            expired: '1970-01-01 00:00:00',
            money: {},
        }
    },
    computed: {
        next() {
            return $lang.g.next_restocking.f(
                $moment(this.expired).calendar()
            );
        }
    },
    activated() {
        this.update();
    },
    methods: {
        async update() {
            const {goods, expired} = await $core.shop.shelves();
            const {m0, m1} = await $core.asset.money();
            this.goods = goods;
            this.expired = expired;
            this.money = {money: {m0, m1}};
        },
        async buy(good) {
            $app.loading = true;
            const result = await $core.shop.buy(good);
            $app.loading = false;
            if (result) this.update();
        }
    }
});
</script>

<style lang="scss" scoped>
div.shop {
    > .header {
        z-index: 10;
        width: 100%;
        height: 100px;
        top: 0;
        left: 0;
        position: fixed;
        margin: auto;
        background: #3d3d3d;
        background: linear-gradient(to bottom, #3d3d3d, #3d3d3d00);
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