<script setup>
import UserCard from './UserCard.vue'
</script>

<template>
    <div class="container">
        <p>{{users.length}}/{{limit}}</p>
        <ul class="userlist">
            <li v-for="user of users" :key="user.uid">
                <UserCard :user=user />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            limit: 0,
            users: [],
        }
    },
    activated() {
        this.update();
        $.on('game.user', this.update.bind(this));
        $.on('game.start', this.start)
    },
    deactivated() {
        $.off('game.user', this.update.bind(this));
        $.off('game.start', this.start)
    },
    methods: {
        start() {
            $.ui.switch('Question');
        },
        update() {
            const {users, limit} = $.core.game;
            this.limit = limit;
            this.users = [...users.values()];
        },
    }
}
</script>

<style lang="scss" scoped>

.container {
    display: block;
    position: absolute;
    top: 0;
    left: 50px;
    right: 50px;
    bottom: 0;
}

.userlist {
    position: relative;
    display: flex;
    align-items: center;
    align-content: space-between;
    justify-content: space-between;
    width: 100%;
    height: auto;
    padding-top: 80px;
    flex-wrap: wrap;
    min-width: 256px;
    max-width: 1024px;
}

.userlist > li {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100px;
}

@media all and (min-width: 612px) {
    .userlist > li{
        width: 50%;
    }
}

@media all and (min-width: 868px) {
    .userlist > li{
        width: 33%;
    }
}

@media all and (min-width: 1124px) {
    .userlist > li{
        width: 25%;
    }
}


</style>