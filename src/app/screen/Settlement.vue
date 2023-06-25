<script setup>
import { watch, ref, toRefs } from 'vue';
import Mine from './Settlement.Mine.vue';
import Question from './Settlement.Question.vue';
import Rank from './Settlement.Rank.vue';

const props = defineProps({
    data: {type: Object},
    id: {type: String},
    ok: {type: Function, default: null}
});

const questions = ref([]);
const mine = ref({});
const rank = ref({});
const update = d => {
    mine.value = d.mine;
    rank.value = {rank: d.rank, mine: d.uuid};
    questions.value = d.questions.map((d, i)=>([i, d]));
};
const d = data=>update($core.game.format(data));
const i = async id=>d(await $core.game.get(id));
watch(()=>props.data, _=>d(props.data));
watch(()=>props.id, _=>i(props.id));
const {data, id, ok} = toRefs(props);
if(data.value) d(data.value);
else if(id.value) i(id.value);
</script>

<template lang="pug">
.settlement
    .header: button(@click='ok?ok():$app.switch("Index")') {{$lang.g.ok}}
    ul.content
        li.card: Mine(v-bind='mine')
        li.card: Rank(v-bind='rank' @ch='u=>$debug ?update($core.game.format(data, u)) :1')
        li.card(v-for='[idx, data] in questions' :key='idx')
            Question(v-bind='data')
</template>

<style lang="scss" scoped>
div.settlement {
    >.header {
        > button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    >ul.content {
        margin: 120px 10px;
        > .card {
            max-width: 960px;
            padding: 10px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            background: #170c33;
            background: #170c334d;
            background: linear-gradient(35deg, #170c334d, #22412f4f);
            margin: 0;
            margin-top: 1em;
            &:first-child {
                margin-top: 0;
            }
        }
    }
}
</style>