<script setup>
import AnswerPieChart from './AnswerPieChart.vue';
</script>
<template>
    <div class="container">
        <p>{{question}}</p>
        <div class="answer">
            <div class="pie">
                <AnswerPieChart :answers="answers.filter(({value}) => value > 0)"></AnswerPieChart>
            </div>
            <ul>
                <li v-for="({option, value, description}) in answers" :key="option">
                    <span>{{option}}</span>
                    <span>:{{value}}</span>
                    <span>&nbsp;&nbsp;{{description}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { watch } from 'vue';

export default {
    data() {
        return {
            question: null,
            answers: [],
        }
    },
    mounted() {
        watch(()=>this.getData, ()=>this.update());
        this.update();
    },
    methods: {
        update() {
            const {question, answer, total} = this.getData();
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
                answers.push({option: '未选', value: total - sum});
            }
            this.answers = answers;
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: linear-gradient(35deg, #4616844d, #12944a4f);
    margin: auto;
}

.answer {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: row;
}
.pie {
    position: relative;
    width: 200px;
    padding: 1em;
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
}
@media screen and (max-width: 600px) {
    .answer {
        flex-direction: column;
    }
    .pie {
        width: 80%;
        max-width: 200px;
        padding: 1em 0 2em 0;
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