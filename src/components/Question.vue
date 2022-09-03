<script setup>
import CountDownProgress from './CountDownProgress.vue'
import Confirm from './Confirm.vue'
</script>

<template>
    <div class="container">
        <button class="exit" @click="back">退出房间</button>
        <div class="progress-bar">
            <CountDownProgress :init="progress"/>
        </div>
        <div class="card">
            <h3 class="question">{{question}}</h3>
            <span class="count">{{answerCount}}/{{limit}}人</span>
            <ul class="options">
                <li v-for="{key, option, val, type} in options"
                    :key="key"
                    :type="type"
                >
                    <input type="radio" name="option"
                        :id="option"
                        :value="option"
                        v-model="selected"
                    /><label :for=option><span>{{option}}&nbsp;&nbsp;</span>{{val}}</label>
                </li>
            </ul>
            <button class="submit" v-if="!answered" @click="answer">提&nbsp;&nbsp;&nbsp;交</button>
            <button class="submit" v-if="answered">您已提交选项【{{answeredOption}}】</button>
        </div>
    </div>
    <Confirm v-if="confirm" @yes="doexit(true)" @no="doexit(false)">真的要退出吗</Confirm>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            confirm: false,
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
    },
    deactivated() {
        this.confirm = false;
        $.off('game.question', this.update.bind(this));
        $.off('game.answer', this.updateAnswer.bind(this));
    },
    methods: {
        back() {
            this.confirm = true;
        },
        async doexit(exit) {
            this.confirm = false;
            if(!exit) return;
            const result = await $.core.game.leave();
            if(result)
                $.ui.switch('Index');
        },
        update() {
            const q = $.core.game.currentQuestion;
            if(!q) return;
            const { id, question, size, left,
                answer, timeout: total, options
            } = q;
            if(this.id == id) return;
            this.id = id;
            this.answerCount = size;
            this.question = question;
            this.selected = '';
            this.answeredOption = answer;
            this.answered = !!answer;
            this.progress = {total, left};
            const opts = [];
            for(const option in options) {
                const data = options[option];
                if(!data) continue;
                const {type, val} = data;
                const key = `${id}-${option}`
                opts.push({key, option, val, type});
            }
            this.options = opts;
        },
        updateAnswer(count) {
            this.answerCount = count;
        },
        async answer() {
            const id = this.id;
            const selected = this.selected;
            $.ui.loading = true;
            const result = await $.core.game.answer(selected);
            $.ui.loading = false;
            if(!result) return;
            const q = $.core.game.currentQuestion;
            if(!q || id != q.id) return;
            this.answerCount++;
            this.answered = true;
            this.answeredOption = selected;
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
            padding-right: calc(1em + 20px);
            text-align: center;
            border: 1px solid #00000000;
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

        &[type="special"] label {
            border: 1px solid #6490ff;
            box-shadow: 0 0 8px #6490ff;

            &::before {
                content: "稀有!";
                position: absolute;
                font-style: italic;
                top: 0;
                right: 0;
                padding: 4px;
                margin: 0;
                color: #6490ff;
                font-size: 10px;
                line-height: 10px;;
            }
        }
    }
}

button.submit {
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