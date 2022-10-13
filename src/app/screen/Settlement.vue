<template>
    <div class="settlement">
        <div class="header">
            <button @click="ok?ok():$app.switch('Index')">{{$lang.g.ok}}</button>
        </div>
        <ul class="content">
            <li class="card">
                <Mine v-bind="mine" />
            </li>
            <li class="card">
                <Rank v-bind="rank" @ch="u=>$debug ?update($core.game.format(data, u)) :1" />
            </li>
            <li v-for="[idx, data] in questions" :key="idx" class="card">
                <Question v-bind="data" />
            </li>
        </ul>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue';
import Mine from './Settlement.Mine.vue';
import Question from './Settlement.Question.vue';
import Rank from './Settlement.Rank.vue';

export default defineComponent({
    components: {Mine, Question, Rank},
    props: {
        data: {
            type: Object,
        },
        id: {
            type: String,
        },
        ok: {
            type: Function,
            default: null,
        }
    },
    data() {
        return {
            questions: [],
            mine: {},
            rank: {},
        }
    },
    mounted() {
        const d = data=>this.update($core.game.format(data));
        const i = async id=>d(await $core.game.get(id));
        watch(()=>this.data, _=>d(this.data));
        watch(()=>this.id, _=>i(this.id));
        if(this.data) d(this.data);
        else if(this.id) i(this.id);
    },
    methods: {
        update({uuid, questions, rank, mine}) {
            this.mine = mine;
            this.rank = {rank, mine: uuid};
            this.questions = questions.map((d, i)=>([i, d]));
        },
    }
});
</script>

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