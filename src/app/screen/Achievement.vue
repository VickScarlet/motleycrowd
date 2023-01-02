<template>
    <div class="achievement">
        <div class="header">
            <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
        </div>
        <h1>{{$lang.g.achievement}}</h1>
        <ul>
            <li v-for="achiv of achivs" :key="achiv.id">
                <Item v-bind="achiv" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onActivated } from 'vue';
import Item from './Achievement.Item.vue';

const achivs = ref([]);
onActivated(async ()=>{
    const acs = await $core.achievement.achievements();
    acs.sort((a, b)=>{
        if(a.unlocked && !b.unlocked) return -1;
        if(!a.unlocked && b.unlocked) return 1;
        if(a.hide && !b.hide) return 1;
        if(!a.hide && b.hide) return -1;
        if(a.grade != b.grade) return b.grade - a.grade;
        return a.id - b.id;
    });
    achivs.value = acs;
});
</script>

<style lang="scss" scoped>

div.achievement {
    padding: 0;
    margin: 120px 0;
    width: 100%;
    > .header {
        > button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    > ul {
        width: 100%;
        li {
            display: inline-block;
            width: 250px;
            margin: 5px;
        }
    }
}
</style>