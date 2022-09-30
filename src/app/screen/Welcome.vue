<template>
    <ul class="container">
        <li>
            <h1>乌合之众</h1>
            <h3 class="subtitle">群体博弈研究</h3>
        </li>
        <li><button type="button" @click="auth">登录/注册</button></li>
        <li><button type="button" @click="guest">游客模式</button></li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            delay: -1,
            online: -1,
        }
    },
    methods: {
        auth() {
            $app.switch('Authentication');
        },
        async guest() {
            $app.loading = true;
            const result = await $core.user.guest();
            $app.loading = false;
            if (!result) return;
            $app.switch('Index');
        },
    }
});
</script>

<style lang="scss" scoped>

</style>