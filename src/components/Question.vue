<script setup>
import CountDownProgress from './CountDownProgress.vue'
</script>

<template>
    <div class="container">
        <div class="progress-bar">
            <CountDownProgress :init="progress"/>
        </div>
        <div class="card">
            <h3 class="question">{{question}}</h3>
            <span class="count">{{answerCount}}/{{limit}}人</span>
            <ul class="options">
                <li v-for="{option, val, type} in options" :key="option">
                    <input type="radio" name="option"
                        :id="option"
                        :value="option"
                        v-model="selected"
                    /><label :for=option :class="'option-'+type"><span>{{option}}&nbsp;&nbsp;</span>{{val}}</label>
                </li>
            </ul>
            <button v-if="!answered" @click="answer">提&nbsp;&nbsp;&nbsp;交</button>
            <button v-if="answered">您已提交选项【{{answeredOption}}】</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            id: '',
            selected: '',
            question: '',
            limit: 0,
            answerCount: 0,
            answered: false,
            answeredOption: '',
            options: [],
            progress: {
                total: 60,
                left: 60,
            },
        }
    },
    activated() {
        this.limit = $.core.game.limit;
        this.update();
        $.on('game.question', this.update.bind(this));
        $.on('game.answer', this.updateAnswer.bind(this));
        $.on('game.settlement', this.settlement);
    },
    deactivated() {
        $.off('game.question', this.update.bind(this));
        $.off('game.answer', this.updateAnswer.bind(this));
        $.off('game.settlement', this.settlement);
    },
    methods: {
        update() {
            const question = $.core.game.currentQuestion;
            if(!question) return;
            if(this.id == question.id) return;
            this.id = question.id;
            this.answerCount = 0;
            this.question = question.question;
            this.selected = '';
            this.answeredOption = '';
            this.answered = false;
            this.progress = {total: question.timeout};
            const options = [];
            for(const option in question.options) {
                const {type, val} = question.options[option];
                options.push({option, val, type});
            }
            this.options = options;
        },
        updateAnswer(count) {
            this.answerCount = count;
        },
        async answer() {
            const selected = this.selected;
            $.ui.loading = true;
            const result = await $.core.game.answer(selected);
            $.ui.loading = false;
            if(!result) return;
            this.answerCount++;
            this.answered = true;
            this.answeredOption = selected;
        },
        settlement() {
            $.ui.switch('Settlement', $.core.game.lastSettlement);
        },
    }
});
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    max-width: 768px;
    min-width: 350px;
}
.progress-bar {
    width: 100%;
    height: 1.8em;
}

.card {
    position: relative;
    width: 100%;
    padding: 0;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: linear-gradient(155deg, #5b11bd, #108342);
    margin: 0;
    margin-top: 1em;
    &:first-child {
        margin-top: 0;
    }
}

.question {
    white-space: pre-wrap;
    margin: 1em 1em 0 1em;
    padding: 0;
}

.count {
    position: absolute;
    top: 0;
    right: 0.1em;
    padding: 0;
    margin: 0;
    color: #caff61;
}

.options {
    display: block;
    padding: 1em;
    &:first-child {
        padding-top: 0;
        margin-top: 0;
    }
    li {
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        margin-top: 0.5em;
        input { display: none; }

        label {
            display: block;
            padding: 0.2em 1em;
            text-align: center;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 5px;
            span {
                float: left;
                color: #4bff87
            }
        }

        input:checked + label {
            background: linear-gradient(67deg, #ffae0090, #48ff007b);
        }
    }
}

button {
    position: relative;
    font-weight: bold;
    font-size: 1.8em;
    text-shadow: 0 0 8px #4bff87;
    width: 100%;
    height: 2em;
    background: linear-gradient(180deg, #00000000, #00ff5e7d);
    border-radius: 0 0 4px 4px;
    border: none;
    &:hover {
        box-shadow: none;
        background: linear-gradient(180deg, #00ff5e01, #00ff5ecf);
    }
}
</style>