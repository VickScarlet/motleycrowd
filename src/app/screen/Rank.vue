<script setup>
import Detail from './Rank.Detail.vue';
</script>

<template>
    <div class="container">
        <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
        <Detail :rank="rank" />
        <ul>
            <li>
                <input type="radio" name="rank" v-model="rank"
                    id="main" value="main"
                /><label for=main>{{$lang.g.rank_main}}</label>
            </li>
            <li>
                <input type="radio" name="rank" v-model="rank"
                    id="ten" value="ten"
                /><label for=ten>{{$lang.g.rank_ten}}</label>
            </li>
            <li>
                <input type="radio" name="rank" v-model="rank"
                    id="hundred" value="hundred"
                /><label for=hundred>{{$lang.g.rank_hundred}}</label>
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            rank: 'main',
        }
    },
});
</script>

<style lang="scss" scoped>
ul {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    display: flex;
    background: #262626;
    li {
        margin: 0;
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        input { display: none; }
        border-left: 1px solid #7d7d7d;
        border-right: 1px solid #7d7d7d;

        label {
            display: block;
            padding: 0.5em 0;
            text-align: center;
            background: rgba(0, 0, 0, 0.4);
        }

        input:checked + label {
            background: linear-gradient(67deg, #ffae0090, #48ff007b);
        }
    }
}


</style>