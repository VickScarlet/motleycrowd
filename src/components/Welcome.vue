<template>
    <ul class="container">
        <li>
            <img src="../assets/title.svg" alt="乌合之众"/>
            <h3 class="subtitle">群体博奕研究</h3>
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
            $.ui.switch('Authentication');
        },
        async guest() {
            $.ui.loading = true;
            const result = await $.core.user.guest();
            $.ui.loading = false;
            if (!result) return;
            $.ui.switch('Index');
        },
    }
});
</script>

<style lang="scss" scoped>

</style>