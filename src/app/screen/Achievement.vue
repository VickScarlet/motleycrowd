<template>
    <div class="header">
        <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
    </div>
    <div class="container">
        <h1 v-if="!show">{{message}}</h1>
        <h1 v-if="show">{{$lang.g.achievement}}</h1>
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

.header {
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.container {
    padding: 0;
    margin: 120px 10px;
    width: 1030px;
}

ul {
    position: relative;
    display: flex;
    align-items: center;
    align-content: space-between;
    justify-content: space-between;
    height: auto;
    margin: auto;
    flex-wrap: wrap;
    width: 100%;
    li {
        width: 250px;
        margin: 0;
        margin-top: 0;
        margin-bottom: 10px;
    }
}

@media all and (max-width: 1050px) {
    .container { width: 770px; }
}

@media all and (max-width: 790px) {
    .container { width: 510px; }
}

@media all and (max-width: 530px) {
    .container { width: 250px; }
}
</style>