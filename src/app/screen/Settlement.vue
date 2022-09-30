<script setup>
import Mine from './Settlement.Mine.vue';
import Question from './Settlement.Question.vue';
import Rank from './Settlement.Rank.vue';
</script>

<template>
    <div class="container">
        <ul>
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
        <button @click="ok">确定</button>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
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
        update() {
            const settlement = this.getData();
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
            $app.switch('Index');
        }
    }
});
</script>

<style lang="scss" scoped>
.container {
    margin: 10px;
}
.card {
    max-width: 960px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: linear-gradient(35deg, #4616844d, #12944a4f);
    margin: 0;
    margin-top: 1em;
    &:first-child {
        margin-top: 0;
    }
}
</style>