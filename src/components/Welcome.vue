<template>
    <div class="container">
        <button type="button" @click="auth">登录/注册</button><br/><br/>
        <button type="button" @click="guest">游客模式</button><br/><br/>
        <button type="button" @click="test">测试按钮</button>
    </div>
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
        guest() {
            $.ui.loading = true;
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