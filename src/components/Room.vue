<script setup>
import UserCard from './UserCard.vue'
</script>

<template>
    <div class="container">
        <ul class="userlist">
            <li v-for="uid in users" :key="uid">
                <UserCard :user=userInfo.get(uid) />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: new Set(),
            userInfo: new Map(),
        }
    },
    methods: {
        async activated({users}) {
            this.join(users);
        },
        user({join, leave}) {
            this.join(join);
            this.leave(leave);
            return true;
        },
        join(users) {
            for(const user of users) {
                const [uid, guest, username] = user;
                this.users.add(uid);
                this.userInfo.set(uid, {
                    uid, guest, username,
                });
            }
            return true;
        },
        leave(uids) {
            for(const uid of uids) {
                this.users.delete(uid);
                this.userInfo.delete(uid);
            }
            return true;
        }
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