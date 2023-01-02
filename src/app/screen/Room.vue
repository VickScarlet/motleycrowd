<script setup>
import { ref, onActivated, onDeactivated } from 'vue';
import UserCard from '../components/UserCard.vue';

const limit = ref(0);
const users = ref([]);
const back = ()=>$core.game.leave().then(result=>result&&$app.switch('Index'));
const update = () => {
    limit.value = $core.game.limit;
    users.value = [...$core.game.users];
};
onActivated(()=>$on('game.user', update));
onDeactivated(()=>$off('game.user', update));
update();
</script>

<template>
    <div class="room">
        <div class="header">
            <button class="exit" @click="back">{{$lang.g.exit_room}}</button>
            <p>{{users.length}}/{{limit}}</p>
        </div>
        <ul class="userlist">
            <li v-for="uuid of users" :key="uuid">
                <UserCard :uuid=uuid />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

div.room {
    display: block;
    position: relative;
    width: 100%;
    min-width: 300px;
    max-width: 1200px;

    > .header {
        > * { margin-top: 10px; }
    }
    > ul.goods {
        max-width: 720px;
        > li {
            display: inline-block;
        }
    }

    > ul.userlist > li {
        display: inline-block;
        position: relative;
        margin: 0;
        padding: 0;
        width: 300px;
        height: 100px;
    }
}
</style>