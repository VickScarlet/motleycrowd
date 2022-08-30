<script setup>
import AnswerLineBarChart from './AnswerLineBarChart.vue'
import UserCard from './UserCard.vue'
</script>
<template>
    <div class="container">
        <div class="chart">
            <AnswerLineBarChart :answers="answers" :width="330" :height="330"/>
        </div>
        <ul class="info">
            <li><UserCard :uuid="uuid" /></li>
            <li>排名: {{ranking}}</li>
            <li>得分: {{score}}</li>
        </ul>
    </div>
</template>
<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            answers: [],
            ranking: -1,
            score: 0,
            uuid: '',
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
            this.uuid = mine.uuid;
            this.ranking = mine.ranking;
            this.score = mine.score;
            this.answers = mine.map(({value, answer}, index)=>({
                name: `Q${index+1}`,
                value, answer
            }));
        },
    }
});
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
    width: 300px;
    padding: 0;
    left: 0;
    top: 0;
}

.info {
    height: 100%;
    width: calc(100% - 300px);
    > li {
        position: relative;
        &:first-child {
            height: 100px;
            width: 300px;
            margin: auto;
        }
    }
}
@media screen and (max-width: 680px){
    .container {
        flex-direction: column;
    }
    .chart {
        margin: auto;
    }
    .info {
        height: auto;
        width: 100%;
    }
}

</style>