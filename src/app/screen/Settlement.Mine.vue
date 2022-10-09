<template>
    <div class="settlement-mine">
        <h3>{{$lang.g.mimestate}}</h3>
        <div class="content">
            <div class="chart">
                <AnswerLineBarChart :answers="answers" :width="330" :height="330"/>
            </div>
            <ul class="info">
                <li class="ranking">
                    <ScoreRanking :score="score" :ranking="ranking" />
                </li>
                <li class="card">
                    <UserCard :uuid="uuid" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { watch, defineComponent } from 'vue';
import AnswerLineBarChart from '../components/AnswerLineBarChart.vue';
import UserCard from '../components/UserCard.vue';
import ScoreRanking from '../components/ScoreRanking.vue';

export default defineComponent({
    components: { AnswerLineBarChart, UserCard, ScoreRanking },
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
div.settlement-mine > .content {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: row;

    > div.chart {
        position: relative;
        width: 300px;
        padding: 0;
        left: 0;
        top: 0;
    }

    > ul.info {
        height: 100%;
        width: calc(100% - 300px);
        > li {
            position: relative;
            margin: auto;
            &.ranking {
                height: 60px;
                width: 60px;
            }
            &.card {
                height: 100px;
                width: 300px;
            }
        }
    }

}

@media screen and (max-width: 640px){
    div.settlement-mine > .content {

        flex-direction: column;
        > div.chart {
            margin: auto;
        }
        > ul.info {
            height: auto;
            width: 360px;
            display: flex;
        }
    }
}

</style>