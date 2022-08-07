<template>
    <div class="container">
        <p>{{answerCount}}/{{limit}}</p>
        <h1 class="question">{{question}}</h1>
        <ul class="options">
            <li v-for="{option, text} in options" :key="option">
                <input type="radio" name="option"
                    :id="option"
                    :value="option"
                    v-model="selected"
                /><label :for=option><span>{{text}}</span></label>
            </li>
        </ul>
        <br />
        <button v-if="!answered" @click="answer">提交</button>
        <button v-if="answered">您已提交选项【{{answeredOption}}】</button>
    </div>
</template>

<script>
export default {
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
            const options = [];
            for(const option in question.options) {
                options.push({
                    option: option,
                    text: question.options[option],
                });
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
}
</script>

<style lang="scss" scoped>

.question {
    max-width: 1024px;
}
.options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: auto;
    min-width: 256px;
    max-width: 1024px;
}

.options li {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 65px;
    margin-top: 1em;
}
.options:first-child {
    padding-top: 0;
    margin-top: 0;
}

.options li input {
    display: none;
}

.options li label {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    background: var(--button-background);
    border-radius: 5px;
}

.options li label span {
    display: block;
    position: relative;
    padding: 0;
    margin: 0;
    top: 50%;
    left: 5%;
    width: 90%;
    text-align: center;
    font-size: 1.2em;
    line-height: 1.4em;
    transform: translateY(-50%);
}

.options li input:checked + label {
    background: var(--button-background-hover);
}

</style>