<template>
    <ul class="asset-money">
        <li v-for="money in list" :key="money.type">
            <Money v-bind="money" />
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
import Money from './Money.vue';

export default defineComponent({
    components: { Money },
    props: {
        asset: {
            type: Object,
            default: {},
        },
    },
    computed: {
        list() {
            return Object.entries(
                this.asset?.money || {}
            ).map(([type, value])=>({type, value}));
        },
    },
});
</script>

<style lang="scss" scoped>
ul.asset-money {
    display: flex;
    width: auto;
    >li {
        display: inline-block;
        line-height: 100%;
        margin: 0;
        margin-left: 4px;
        &:first-child { margin-left: 0; }
    }
}
</style>