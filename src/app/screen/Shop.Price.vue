<script setup>
import AssetMoney from '../components/AssetMoney.vue';
const { discount, price, original } = defineProps({
    discount: { type: Number, default: null },
    price: { type: Object, default: {} },
    original: { type: Object, default: null },
});
</script>

<template>
    <div :class="{price: true, 'price-discount': !!original}">
        <AssetMoney class="asset-money" :asset="price"/>
        <span class="discount" v-if="!!discount">-{{((1-discount)*100).toFixed(0)}}%</span>
        <AssetMoney class="asset-money" :asset="original" v-if="original"/>
    </div>
</template>

<style lang="scss" scoped>

div.price {
    width: 100%;
    height: 40px;
    position: relative;

    > ul.asset-money {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        &:last-child {
            bottom: 50%;
            transform: translate(-50%, 50%);
        }
    }

    &.price-discount > ul.asset-money {
        transform: translateX(calc(-50% - 10px));
        &:last-child {
            bottom: 0;
            &::after {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                width: 100%;
                height: 2px;
                transform: translateY(-50%) rotate(-5deg);
                background: #ff0000;
            }
        }
    }

    >.discount {
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 100%;
        padding: 2px 4px;
        background: #1dbb08;
        color: #fff;
        font-size: 12px;
        font-family: consolas, 'Courier New', Courier, monospace;
        font-weight: bold;
    }
}
</style>