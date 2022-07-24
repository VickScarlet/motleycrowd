<template>
    <div class="container">
        <ul class="userlist">
            <li v-for="(user, index) in users" :key="index">
                {{user}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
        }
    },
    methods: {
        async activated({users}) {
            this.users = users;
        },
        join(user) {
            this.users.push(user);
        },
        leave(user) {
            this.users.splice(this.users.indexOf(user), 1);
        },
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