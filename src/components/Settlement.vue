<script setup>
import { getCurrentInstance } from 'vue'
import AnswerLineBarChart from './AnswerLineBarChart.vue'
import SettlementQuestion from './SettlementQuestion.vue'
defineExpose(getCurrentInstance().proxy);
</script>

<template>
    <div class="container">
        <AnswerLineBarChart :answers="answers"></AnswerLineBarChart>
        <ul>
            <li v-for="({idx, get}) in questions" :key="idx">
                <settlement-question :getData="get" />
            </li>
        </ul>
        <button @click="ok">确定</button>
    </div>
</template>

<script>
import { watch } from 'vue';
export default {
    data() {
        return {
            questions: [],
            answers: [],
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
            this.answers = settlement.getMine()
                .map(({value, answer}, index)=>({
                    name: `第${index+1}题`,
                    value, answer
                }));
        },
        ok() {
            $.ui.switch('Index');
        }
    }
}
</script>

<style lang="scss" scoped>
</style>