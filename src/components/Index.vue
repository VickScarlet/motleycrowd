<template>
    <div class="container">
        <button type="button" @click="pair(100)">100人排位</button><br/><br/>
        <button type="button" @click="pair(10)">10人排位</button><br/><br/>
        <button type="button" @click="custom">好友房</button><br/><br/>
        <button type="button" @click="logout">登出</button>
    </div>
</template>

<script>
export default {
    methods: {
        pair(type) {
            console.debug('pair', type);
        },
        custom() {
            console.debug('custom');
        },
        async logout() {
            $.ui.loading = true;
            const result = await $.core.user.logout();
            $.ui.loading = false;
            if (result.r) {
                $.ui.switch('Welcome');
            } else {
                $.ui.alert(result.e);
            }
        },
    }
}
</script>

<style lang="scss" scoped>

</style>