<template>
    <div class="container">
        <button type="button" @click="auth">登录/注册</button><br/><br/>
        <button type="button" @click="guest">游客模式</button>
    </div>
</template>

<script>
export default {
    methods: {
        auth() {
            $page('Authentication', 'hello');
        },
        guest() {
            // TODO: guest
        }
    }
}
</script>

<style lang="scss" scoped>

</style>