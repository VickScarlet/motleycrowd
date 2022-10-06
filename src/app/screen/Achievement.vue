<template>
    <div class="container">
        <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
        <h1 v-if="!show">{{message}}</h1>
        <ul v-if="show">
            <li v-for="achiv of achivs" :key="achiv.id">
                <Item :data="achiv" />
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Item from './Achievement.Item.vue';
export default defineComponent({
    components: { Item },
    data() {
        return {
            show: false,
            message: '',
            achivs: [],
        }
    },
    async activated() {
        this.show = false;
        if(!$core.user.authenticated) {
            this.message = $lang.g.login_first;
            return;
        }
        if($core.user.isguest) {
            this.message = $lang.g.only_member;
            return;
        }
        this.show = true;
        const achivs = await $core.achievement.achievements();
        achivs.sort((a, b)=>{
            if(a.unlocked && !b.unlocked) return -1;
            if(!a.unlocked && b.unlocked) return 1;
            if(a.hide && !b.hide) return 1;
            if(!a.hide && b.hide) return -1;
            if(a.grade != b.grade) return b.grade - a.grade;
            return a.id - b.id;
        });
        this.achivs = achivs;
    },
    deactivate() {},
});
</script>

<style lang="scss" scoped>

.container {
    padding: 3em 0;
}
ul {
    position: relative;
    display: flex;
    align-items: center;
    align-content: space-between;
    justify-content: space-between;
    height: auto;
    margin: auto 20px;
    flex-wrap: wrap;

    li {
        width: 250px;
        margin: 10px;
        margin-top: 0;
    }
}

</style>