<template>
    <ul class="container">
        <li><h1>乌合之众</h1></li>
        <li><button type="button" @click="auth">登录/注册</button></li>
        <li><button type="button" @click="guest">游客模式</button></li>
        <li><button type="button" @click="test">测试按钮</button></li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            delay: -1,
            online: -1,
        }
    },
    methods: {
        auth() {
            $.ui.switch('Authentication', 'hello');
        },
        async guest() {
            $.ui.loading = true;
            const result = await $.core.user.guest();
            $.ui.loading = false;
            if (result.r) {
                $.ui.switch('Index');
            } else {
                $.ui.alert(result.e);
            }

            setTimeout(() => {
                $.ui.loading = false;
                $.ui.switch('Index');
            }, Math.random() * 400);
        },
        test() {
            $.ui.alert('弹窗测试');
            setTimeout(() => $.ui.alert('弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试'), 1000);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>