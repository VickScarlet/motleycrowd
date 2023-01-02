<template>
    <div class="container">
        <button class="exit" @click="confirm=true">{{$lang.g.exit_room}}</button>
        <div class="progress-bar">
            <CountDownProgress v-bind="progress"/>
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
            <button class="submit" v-if="!answered" @click="answer">{{$lang.g.submit}}</button>
            <button class="submit" v-if="answered">{{$lang.g.submit_as.f(answeredOption)}}</button>
        </div>
    </div>
    <Confirm v-if="confirm" @yes="doexit(true)" @no="doexit(false)">{{$lang.g.exit_check}}</Confirm>
</template>

<script setup>
import { ref, reactive, onActivated, onDeactivated } from 'vue';
import CountDownProgress from '../components/CountDownProgress.vue';
import Confirm from '../components/Confirm.vue';

const confirm = ref(false);
const id = ref('');
const selected = ref('');
const question = ref('');
const limit = ref(0);
const answerCount = ref(0);
const answered = ref(false);
const answeredOption = ref('');
const options = ref([]);
const progress = reactive({total: 60, left: 60});

const doexit = async exit => {
    confirm.value = false;
    if(!exit) return;
    const result = await $core.game.leave();
    if(result) $app.switch('Index');
};

const updateAnswer = count => answerCount.value = count;

const update = _ => {
    const q = $core.game.currentQuestion;
    if(!q) return;
    if(id.value == q.id) return;
    id.value = q.id;
    answerCount.value = q.size;
    question.value = q.question;
    selected.value = '';
    answeredOption.value = q.answer;
    answered.value = !!q.answer;
    progress.total = q.timeout;
    progress.left = q.left;
    const opts = [];
    for(const option in q.options) {
        const data = q.options[option];
        if(!data) continue;
        const {type, val} = data;
        const key = `${id}-${option}`
        opts.push({key, option, val, type});
    }
    options.value = opts;
};

const answer = async () => {
    const i = id.value;
    const s = selected.value;
    $app.loading(true);
    const result = await $core.game.answer(s);
    $app.loading(false);
    if(!result) return;
    const q = $core.game.currentQuestion;
    if(!q || i != q.id) return;
    answerCount.value++;
    answered.value = true;
    answeredOption.value = s;
};

onActivated(() => {
    limit.value = $core.game.limit;
    this.update();
    $on('game.question', update);
    $on('game.answer', updateAnswer);
});
onDeactivated(() => {
    confirm.value = false;
    $off('game.question', update);
    $off('game.answer', updateAnswer);
});
update();
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