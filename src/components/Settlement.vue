<script setup>
import SettlementMine from './SettlementMine.vue'
import SettlementQuestion from './SettlementQuestion.vue'
</script>

<template>
    <div class="container">
        <ul>
            <li class="card">
                <SettlementMine :getData="mine" />
            </li>
            <li v-for="({idx, get}) in questions" :key="idx" class="card">
                <SettlementQuestion :getData="get" />
            </li>
        </ul>
        <button @click="ok">确定</button>
    </div>
</template>

<script>
import { watch } from 'vue'
export default {
    data() {
        return {
            questions: [],
            mine: ()=>null,
        }
    },
    mounted() {
        watch(()=>this.getData, ()=>this.update());
        this.update();
    },
    methods: {
        update() {
            const settlement = this.getData();
            this.questions = settlement.indexs
                .map(idx=>({ idx, get: ()=>settlement.at(idx) }));
            this.mine = ()=>settlement.getMine();
        },
        ok() {
            $.ui.switch('Index');
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
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