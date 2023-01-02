<script setup>
import { ref } from 'vue';

const autologin = ref(true);
const isauth = ref(true);
const username = ref('');
const password = ref('');
const check = ref('');
const back = ()=>$app.switch('Welcome');
const auth = async e => {
    e.returnValue = false;
    $app.loading(true);
    const result = await $core.user.authenticate(
        username.value, password.value, autologin.value
    );
    $app.loading(false);
    if (!result) return;
    if ($core.game.isInRoom) return;
    $app.switch('Index');
};
const regi = async e => {
    e.returnValue = false;
    $app.loading(true);
    const result = await $core.user.register(
        username.value, password.value, check.value, autologin.value
    );
    $app.loading(false);
    if (!result) return;
    if ($core.game.isInRoom) return;
    $app.switch('Index');
};
</script>

<template>
    <a @click="back" class="back">&lt; {{$lang.g.back}}</a>
    <form v-show="isauth" @submit="auth">
        <ul>
            <li><input type="text"
                :placeholder="$lang.g.username"
                autoComplete="username"
                v-model.trim="username"
            /></li>
            <li><input type="password"
                :placeholder="$lang.g.password"
                autoComplete="current-password"
                v-model.trim="password"
            /></li>
            <li><div class="checkbox">
                <input id="autologin1"
                    type="checkbox"
                    :placeholder="$lang.g.autologin"
                    v-model.trim="autologin"
                />
                <label for="autologin1">{{
                    autologin?
                        $lang.g.autologin_open:
                        $lang.g.autologin_close
                }}</label>
            </div></li>
            <li><button type="submit">{{$lang.g.authenticate}}</button></li>
            <li><a @click="isauth=false">{{$lang.g.no_account}}</a></li>
        </ul>
    </form>
    <form v-show="!isauth" @submit="regi">
        <ul>
            <li><input type="text"
                :placeholder="$lang.g.username"
                autoComplete="username"
                v-model.trim="username"
            /></li>
            <li><input type="password"
                :placeholder="$lang.g.password"
                autoComplete="new-password"
                v-model.trim="password"
            /></li>
            <li><input type="password"
                :placeholder="$lang.g.password_check"
                autoComplete="new-password"
                v-model.trim="check"
            /></li>
            <li><div class="checkbox">
                <input id="autologin2"
                    type="checkbox"
                    :placeholder="$lang.g.autologin"
                    v-model.trim="autologin"
                />
                <label for="autologin2">{{
                    autologin?
                        $lang.g.autologin_open:
                        $lang.g.autologin_close
                }}</label>
            </div></li>
            <li><button type="submit">{{$lang.g.register}}</button><br /></li>
            <li><a @click="isauth=true">{{$lang.g.has_account}}</a></li>
        </ul>
    </form>
</template>

<style lang="scss" scoped>
.back {
    float: left;
    margin-bottom: 1em;
}
</style>