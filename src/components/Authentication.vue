<template>
    <a @click="back" class="back">&lt; 返回</a>
    <form v-show="isauth" @submit="auth">
        <input type="text" placeholder="用户名" autoComplete="username" v-model.trim="username"/><br />
        <br />
        <input type="password" placeholder="密码" autoComplete="current-password" v-model.trim="password"/><br />
        <br />
        <div class="checkbox">
            <input id="autologin1" type="checkbox" placeholder="自动登录" v-model.trim="autologin"/>
            <label for="autologin1">下次自动登录</label>
        </div><br />
        <br />
        <button type="submit">登录</button><br />
        <br />
        <a @click="this.isauth=false">没有账号? 立即注册.</a>
    </form>
    <form v-show="!isauth" @submit="regi">
        <input type="email" placeholder="邮箱" autoComplete="email" v-model.trim="email" /><br />
        <br />
        <input type="text" placeholder="用户名" autoComplete="username" v-model.trim="username" /><br />
        <br />
        <input type="password" placeholder="密码" autoComplete="new-password" v-model.trim="password" /><br />
        <br />
        <input type="password" placeholder="重复密码" autoComplete="new-password" v-model.trim="check"/><br />
        <br />
        <div class="checkbox">
            <input id="autologin2" type="checkbox" placeholder="自动登录" v-model.trim="autologin"/>
            <label for="autologin2">下次自动登录</label>
        </div><br />
        <br />
        <button type="submit">注册</button><br />
        <br />
        <a @click="this.isauth=true">已有账号? 马上登录.</a>
    </form>
</template>

<script>
export default {
    data() {
        return {
            autologin: true,
            isauth: true,
            email: '',
            username: '',
            password: '',
            check: '',
        }
    },
    methods: {
        back() {
            $.ui.switch('Welcome');
        },
        async auth(e) {
            e.returnValue = false;
            const { username, password, autologin } = this;
            $.ui.loading = true;
            const result = await $.core.user.authenticate(username, password, autologin);
            $.ui.loading = false;
            if (result.r) {
                $.ui.switch('Index');
            } else {
                $.ui.alert(result.e);
            }
        },
        async regi(e) {
            e.returnValue = false;
            const { email, username, password, check, autologin } = this;
            $.ui.loading = true;
            const result = await $.core.user.register(username, password, check, email, autologin);
            $.ui.loading = false;
            if (result.r) {
                $.ui.switch('Index');
            } else {
                $.ui.alert(result.e);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.back {
    float: left;
    margin-bottom: 1em;
}
</style>