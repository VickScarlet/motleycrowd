<template>
    <div class="container">
        <div v-if="!ranking || ranking<1">{{$lang.g.not_in_rank}}</div>
        <div v-if="ranking>0">
            {{$lang.g.my_ranking_as.f(ranking)}} / {{$lang.g.rank_size.f(size)}}
        </div>
        <ul>
            <li v-for="{uuid, ranking} of users" :key="uuid">
                <div><Ranking :ranking="ranking" /></div>
                <div><UserCard :uuid="uuid" /></div>
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
.container {
    width: auto;
    margin: 4em 20px;
}

ul {
    position: relative;
    display: flex;
    align-items: center;
    align-content: space-between;
    justify-content: space-between;
    height: auto;
    width: auto;
    flex-wrap: wrap;

    > li {
        position: relative;
        display: flex;
        text-align: center;
        margin: 0 10px;
        padding: 0;
        height: 100px;
        > div {
            position: relative;
            height: 100%;

            &:first-child {
                width: 60px;
                display: flex;
                align-items: center;
            }

            &:last-child {
                width: 300px;
            }
        }
    }
}

@media all and (min-width: 400px ) {
    ul { width: 360px; }
}

@media all and (min-width: 800px ) {
    ul { width: 760px; }
}

@media all and (min-width: 1200px ) {
    ul { width: 1160px; }
}


</style>