<template>
    <div class="header">
        <button @click="ok">{{$lang.g.ok}}</button>
    </div>
    <ul class="settlement">
        <li class="card">
            <Mine :getData="mine" />
        </li>
        <li class="card">
            <Rank :getData="rank" @ch="ch" />
        </li>
        <li v-for="([idx, get]) in questions" :key="idx" class="card">
            <Question :getData="get" />
        </li>
    </ul>
</template>

<script>
import { watch, defineComponent } from 'vue';
import Mine from './Settlement.Mine.vue';
import Question from './Settlement.Question.vue';
import Rank from './Settlement.Rank.vue';

export default defineComponent({
    components: {Mine, Question, Rank},
    data() {
        return {
            _ok: null,
            questions: [],
            mine: ()=>null,
            rank: ()=>null,
        }
    },
    mounted() {
        watch(()=>this.getData, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            let {id, data, ok} = this.getData();
            if(ok) this._ok = ok;
            if(!data) {
                if(!id) return;
                data = await $core.game.get(id);
                if(!data) return;
            }
            const settlement = $core.game.packSettlement(data);
            const {uuid, indexs, mine, rank} = settlement;
            this.questions = indexs.map(i=>([i, ()=>settlement.at(i)]));
            this.mine = ()=>mine;
            this.rank = ()=>({uuid, rank});
        },
        ch(uuid) {
            if(!$debug) return;
            const settlement = this.getData();
            settlement.uuid = uuid;
            this.update();
        },
        ok() {
            const ok = this._ok;
            this._ok = null;
            if(ok) ok();
            else $app.switch('Index');
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
ul.settlement {
    margin: 120px 10px;
    > .card {
        max-width: 960px;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        background: #170c33;
        background: #170c334d;
        background: linear-gradient(35deg, #170c334d, #22412f4f);
        margin: 0;
        margin-top: 1em;
        &:first-child {
            margin-top: 0;
        }
    }
}
</style>