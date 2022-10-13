<template>
    <div class="rank-detail">
        <div class="header">
            <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
            <h3 v-if="!ranking || ranking<1">{{$lang.g.not_in_rank}}</h3>
            <h3 v-if="ranking>0">
                {{$lang.g.my_ranking_as.f(ranking)}} / {{$lang.g.rank_size.f(size)}}
            </h3>
        </div>
        <ul>
            <li v-for="{uuid, ranking} of users" :key="uuid">
                <div>
                    <div><Ranking :ranking="ranking" /></div>
                    <div><UserCard :uuid="uuid" /></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue';
import Ranking from '../components/Ranking.vue';
import UserCard from '../components/UserCard.vue';

export default defineComponent({
    components: { Ranking, UserCard },
    props: {
        rank: {
            type: String,
            required: true,
            default: '',
        },
    },
    data() {
        return {
            ranking: 0,
            size: 0,
            users: [],
        }
    },
    mounted() {
        watch(()=>this.rank, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            const data = await $core.rank.get(this.rank);
            this.ranking = data.ranking;
            this.size = data.size;
            this.users = data.users;
            console.debug(data.users);
        }
    }
});
</script>

<style lang="scss" scoped>

div.rank-detail {
    width: 100%;
    max-width: 1160px;
    margin: 120px 0;
    > .header {
        z-index: 10;
        width: 100%;
        height: 100px;
        top: 0;
        left: 0;
        position: fixed;
        margin: auto;
        background: #3d3d3d;
        background: linear-gradient(to bottom, #3d3d3d, #3d3d3d00);
        > button {
            position: absolute;
            top: 4px;
            left: 50%;
            transform: translateX(-50%);
        }

        > h3 {
            margin: 0;
            padding: 0;
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.3em;
            text-shadow: #3d3d3d 0 0 10px;
        }
    }
    > ul {
        width: 100%;
        max-width: 1160px;
    }
    > ul > li {
        position: relative;
        display: inline-block;
        width: 360px;
        text-align: center;
        margin: 0 10px;
        padding: 0;
        height: 100px;
        > div {
            display: flex;
            height: 100%;
            > div:first-child {
                margin-top: 20px;
                width: 60px;
                height:60px;
            }
            > div:last-child {
                width: 300px;
                height: 100%;
            }
        }
    }
}



</style>