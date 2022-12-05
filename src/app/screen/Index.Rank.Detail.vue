<template>
    <div class="index-rank-detail">
        <div>
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

div.index-rank-detail {
    width: 100%;
    max-width: 1160px;
    margin: 120px 0;
    >div > h3 {
        text-shadow: #3d3d3d 0 0 10px;
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