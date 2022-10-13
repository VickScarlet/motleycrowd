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

<script>
import { defineComponent } from 'vue';
import UserCard from '../components/UserCard.vue';

export default defineComponent({
    components: { UserCard },
    data() {
        return {
            limit: 0,
            users: [],
        }
    },
    activated() {
        this.update();
        $on('game.user', this.update.bind(this));
    },
    deactivated() {
        $off('game.user', this.update.bind(this));
    },
    methods: {
        async back() {
            const result = await $core.game.leave();
            if(result)
                $app.switch('Index');
        },
        update() {
            const {users, limit} = $core.game;
            this.limit = limit;
            this.users = [...users];
        },
    }
});
</script>

<style lang="scss" scoped>

div.room {
    display: block;
    position: relative;
    width: 100%;
    min-width: 300px;
    max-width: 1200px;

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