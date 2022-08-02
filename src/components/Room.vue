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
                const uid = user.uid;
                this.users.add(uid);
                this.userInfo.set(uid, user);
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

.userlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.userlist > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    color: #fff;
    background-color: #000;
    border-radius: 5px;
    padding: 10px;
}

</style>