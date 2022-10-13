<template>
    <div :class="{price: true, 'price-discount': !!original}">
        <ul class="subprice">
            <li v-for="money in current" :key="money.type">
                <Money v-bind="money" />
            </li>
        </ul>
        <span class="discount" v-if="!!off">{{off}}</span>
        <ul class="subprice" v-if="original">
            <li v-for="money in ori" :key="money.type">
                <Money v-bind="money" />
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Money from '../components/Money.vue';

export default defineComponent({
    components: { Money },
    props: {
        discount: {
            type: Number,
            default: null,
        },
        price: {
            type: Object,
            default: {},
        },
        original: {
            type: Object,
            default: null,
        },
        enough: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ori() {
            const original = this.original;
            if(!original) return null;
            return Object.entries(
                original.money || {}
            ).map(([type, value])=>({type, value}));
        },
        current() {
            return Object.entries(
                this.price?.money || {}
            ).map(([type, value])=>({type, value}));
        },
        off() {
            const discount = this.discount;
            if(typeof discount !== 'number') return null;
            return `-${((1-discount)*100).toFixed(0)}%`;
        }
    },
});
</script>

<style lang="scss" scoped>

div.price {
    width: 100%;
    height: 40px;
    position: relative;

    > ul.subprice {
        display: flex;
        >li {
            display: inline-block;
            line-height: 100%;
            margin: 0;
            margin-left: 4px;
            &:first-child {
                margin-left: 0;
            }
        }
        position: absolute;
        left: 50%;
        height: 20px;
        transform: translateX(-50%);
        &:last-child {
            bottom: 50%;
            transform: translate(-50%, 50%);
        }
    }

    &.price-discount > ul.subprice {
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