<template>
    <div class="header">
        <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
        <div class="pages">
            <Pages :total="total" @update:page="p=>page=p" ref="pages" />
        </div>
    </div>
    <ul class="history">
        <li v-for="data in history" :key="data.id">
            <Item v-bind="data" @review="review"/>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
import Item from './History.Item.vue';
import Pages from '../components/Pages.vue';
export default defineComponent({
    components: { Item, Pages },
    data() {
        return {
            _page: 1,
            total: 0,
            history: [],
        }
    },
    computed: {
        page: {
            get() {
                return this._page;
            },
            async set(page) {
                this._page = page;
                $app.loading = true;
                const history = await $core.game.history(page);
                $app.loading = false;
                if (!history) return;
                this.history = history;
            }
        },
    },
    async activated() {
        const {page} = this.getData();
        this.total = await $core.game.pages();
        this.$refs.pages.page =
        this.page = page || 1;
    },
    deactivate() {},
    methods: {
        async review(id) {
            $app.loading = true;
            const data = await $core.game.get(id);
            $app.loading = false;
            if(!data) return;
            const page = this.page;
            const ok = ()=>$app.switch('History', {page});
            $app.switch('Settlement', {data, ok});
        }
    }
});
</script>

<style lang="scss" scoped>

.header {
    z-index: 10;
    width: 100%;
    height: 100px;
    top: 0;
    left: 0;
    position: fixed;
    margin: auto;
    background: #3d3d3d;
    background: linear-gradient(to bottom, #3d3d3d, #3d3d3d00);

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

ul.history {
    margin: 120px 0;
}

</style>