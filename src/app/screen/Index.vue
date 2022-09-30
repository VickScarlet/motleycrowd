<template>
    <ul class="container">
        <li>
            <h1>乌合之众</h1>
            <h3 class="subtitle">群体博弈研究</h3>
        </li>
        <li><button type="button" @click="pair(100)">100人排位</button></li>
        <li><button type="button" @click="pair(10)">10人排位</button></li>
        <li><button type="button" @click="custom">好友房</button></li>
        <li><button type="button" @click="logout">登出</button></li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    methods: {
        async pair(type) {
            console.debug('pair', type);
            $app.loading = true;
            const result = await $core.game.pair(type);
            $app.loading = false;
            if (result) {
                $app.switch('Room');
            } else {
                $app.alert(result.e);
            }
        },
        custom() {
            console.debug('custom');
        },
        async logout() {
            $app.loading = true;
            const result = await $core.user.logout();
            $app.loading = false;
            if (result) {
                $app.switch('Welcome');
            } else {
                $app.alert(result.e);
            }
        },
    }
});
</script>

<style lang="scss" scoped>

</style>