<script setup>
import { ref, onActivated, onDeactivated } from 'vue';
import UserCard from '../components/UserCard.vue';

const info = ref("");
const users = ref([]);
const back = ()=>$core.game.leave().then(result=>result&&$app.switch('Index'));
const update = () => {
    users.value = [...$core.game.users];
    const limit = $core.game.limit;
    const count = users.value.length;
    if($core.game.isPrivate) {
        info.value = $lang.g.room_info_private.f(
            count, limit, $core.game.room
        );
    } else {
        info.value = $lang.g.room_info_pair.f(
            count, limit
        );
    }
};
onActivated(()=>{
    $on('game.user', update);
    update();
});
onDeactivated(()=>$off('game.user', update));
update();
</script>

<template lang="pug">
.room
    .header
        button.exit(@click='back') {{$lang.g.exit_room}}
        p {{info}}
    ul.userlist: li(v-for='uuid of users' :key='uuid')
        UserCard(:uuid='uuid')
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