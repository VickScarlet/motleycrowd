<script setup>
import AnswerPieChart from '../components/AnswerPieChart.vue';
</script>
<template>
    <div class="container">
        <h3>{{question}}</h3>
        <div class="answer">
            <div class="chart">
                <AnswerPieChart :answers="answers.filter(({value}) => value > 0)"></AnswerPieChart>
            </div>
            <ul>
                <li v-for="({option, value, description}) in answers"
                    :key="option" :ismine="option==mine.answer">

                    <span>{{option?option:$lang.g.no_answer}}:</span>
                    <span>{{$lang.g.prople_count.f(String(value).padStart(4, ' '))}}</span>
                    <span>&nbsp;&nbsp;&nbsp;{{description}}</span>
                </li>
            </ul>
        </div>
        <span :class="'alter '+(mine.value>=0?'up':'down')">{{mine.value>0?'+':''}}{{mine.value}}</span>
    </div>
</template>
<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            question: null,
            answers: [],
            mine: {
                value: 0,
                answer: '',
            },
        }
    },
    mounted() {
        watch(()=>this.getData, ()=>this.update());
        this.update();
    },
    methods: {
        update() {
            const {question, answer, total, mine} = this.getData();
            this.mine = mine;
            this.question = question.question;
            const answers = [];
            let sum = 0;
            answer.counter.forEach((value, option) => {
                sum += value;
                answers.push({option, value,
                    description: question.option(option).val,
                });
            });
            if (sum < total) {
                answers.push({option: '', value: total - sum});
            }
            this.answers = answers;
        },
    }
});
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}
h3 {
    white-space: pre-wrap;
    margin: 0 0 1em 0;
    padding: 1.2em 2em 0.2em 2em;
    border-bottom: dotted 2px rgba($color: #30b7ff, $alpha: .3);
}
.alter {
    position: absolute;
    top: 0;
    right: 0;
    &.up { color: #68dc68; }
    &.down { color: #d46d66; }
}
.answer {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: row;
}
.chart {
    position: relative;
    width: 200px;
    padding: 0 1em;
    left: 0;
    top: 0;
}
ul {
    position: relative;
    height: 100%;
    padding-left: 5%;
    width: calc(95% - 200px - 1em);
    right: 0;
    top: 0;
    text-align: left;
    vertical-align: middle;
    li {
        white-space: pre-wrap;
        margin: 0;
        margin-top: 0.5em;
        &:first-child { margin-top: 0; }
        padding: 0.2em 0.5em;
        border-radius: 4px;
        background: rgba($color: #000000, $alpha: 0.2);
        &[ismine="true"] {
            background: rgba($color: #ffa600, $alpha: 0.2);
        }
        span:nth-child(2) {
            color: #ffa600;
        }
    }
}
@media screen and (max-width: 600px) {
    .answer {
        flex-direction: column;
    }
    .chart {
        width: 80%;
        max-width: 200px;
        margin-bottom: 1.2em;
        left: 0;
        top: 0;
    }
    ul {
        width: 100%;
        padding-left: 0;
        right: 0;
        top: 0;
        text-align: center;
    }

}
</style>