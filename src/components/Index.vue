<template>
    <ul class="container">
        <li>
            <button type="button" @click="pair(100)">100人排位</button>
        </li>
        <li>
            <button type="button" @click="pair(10)">10人排位</button>
        </li>
        <li>
            <button type="button" @click="custom">好友房</button>
        </li>
        <li>
            <button type="button" @click="logout">登出</button>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    methods: {
        async pair(type) {
            console.debug('pair', type);
            $.ui.loading = true;
            const result = await $.core.game.pair(type);
            $.ui.loading = false;
            if (result) {
                $.ui.switch('Room');
            } else {
                $.ui.alert(result.e);
            }
        },
        custom() {
            console.debug('custom');
        },
        async logout() {
            $.ui.loading = true;
            const result = await $.core.user.logout();
            $.ui.loading = false;
            if (result) {
                $.ui.switch('Welcome');
            } else {
                $.ui.alert(result.e);
            }
        },
    }
});
</script>

<style lang="scss" scoped>

</style>