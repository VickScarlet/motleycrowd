<script setup>
import UserCard from './UserCard.vue'
</script>

<template>
    <div class="container">
        <button class="exit" @click="back">退出房间</button>
        <p>{{users.length}}/{{limit}}</p>
        <ul class="userlist">
            <li v-for="uuid of users" :key="uuid">
                <UserCard :uuid=uuid />
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            limit: 0,
            users: [],
        }
    },
    activated() {
        this.update();
        $.on('game.user', this.update.bind(this));
    },
    deactivated() {
        $.off('game.user', this.update.bind(this));
    },
    methods: {
        async back() {
            const result = await $.core.game.leave();
            if(result)
                $.ui.switch('Index');
        },
        update() {
            const {users, limit} = $.core.game;
            this.limit = limit;
            this.users = [...users];
        },
    }
});
</script>

<style lang="scss" scoped>

.container {
    display: block;
    position: relative;
    width: 100%;
    min-width: 300px;
    max-width: 1200px;
}

.userlist {
    position: relative;
    display: flex;
    align-items: center;
    align-content: space-between;
    justify-content: space-between;
    height: auto;
    margin: auto;
    flex-wrap: wrap;
    > li {
        position: relative;
        margin: 0;
        padding: 0;
        width: 300px;
        height: 100px;
    }
}

@media all and (min-width: 300px) {
    .container {
        width: 300px;
    }
}

@media all and (min-width: 600px) {
    .container {
        width: 600px;
    }
}

@media all and (min-width: 900px) {
    .container {
        width: 900px;
    }
}

@media all and (min-width: 1200px) {
    .container {
        width: 1200px;
    }
}


</style>