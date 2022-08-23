<script setup>
import AnswerLineBarChart from './AnswerLineBarChart.vue'
</script>
<template>
    <div class="container">
        <div class="chart">
            <AnswerLineBarChart :answers="answers" :width="330" :height="330"/>
        </div>
        <div class="info"> </div>
    </div>
</template>
<script>
import { watch } from 'vue';

export default {
    data() {
        return {
            answers: [],
        }
    },
    mounted() {
        watch(()=>this.getData, ()=>this.update());
        this.update();
    },
    methods: {
        update() {
            const mine = this.getData();
            if(!mine) return;
            this.answers = mine.map(({value, answer}, index)=>({
                name: `Q${index+1}`,
                value, answer
            }));
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: row;
}
.chart {
    position: relative;
    min-width: 300px;
    padding: 0;
    left: 0;
    top: 0;
}
</style>