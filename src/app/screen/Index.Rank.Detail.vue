<script setup>
import { ref, watch } from 'vue';
import Ranking from '../components/Ranking.vue';
import UserCard from '../components/UserCard.vue';

const props = defineProps({rank: {type: String, required: true, default: ''}});
const ranking = ref(0);
const size = ref(0);
const users = ref([]);
const update = async()=>{
    const data = await $core.rank.get(props.rank);
    ranking.value = data.ranking;
    size.value = data.size;
    users.value = data.users;
    console.debug(data.users);
};
watch(()=>props.rank, update);
update();
</script>

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