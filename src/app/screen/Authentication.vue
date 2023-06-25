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

<template lang="pug">
a.back(@click='back') &lt; {{$lang.g.back}}

form(v-if='isauth' @submit='auth'): ul
    li: input(type='text' :placeholder='$lang.g.username' autoComplete='username' v-model.trim='username')
    li: input(type='password' :placeholder='$lang.g.password' autoComplete='current-password' v-model.trim='password')
    li: .checkbox
        input#autologin1(type='checkbox' :placeholder='$lang.g.autologin' v-model.trim='autologin')
        label(for='autologin1') {{$lang.g['autologin_'+(autologin?'open':'close')]}}
    li: button(type='submit') {{$lang.g.authenticate}}
    li: a(@click='isauth=false') {{$lang.g.no_account}}

form(v-else @submit='regi'): ul
    li: input(type='text' :placeholder='$lang.g.username' autoComplete='username' v-model.trim='username')
    li: input(type='password' :placeholder='$lang.g.password' autoComplete='new-password' v-model.trim='password')
    li: input(type='password' :placeholder='$lang.g.password_check' autoComplete='new-password' v-model.trim='check')
    li: .checkbox
        input#autologin2(type='checkbox' :placeholder='$lang.g.autologin' v-model.trim='autologin')
        label(for='autologin2') {{$lang.g['autologin_'+(autologin?'open':'close')]}}
    li: button(type='submit') {{$lang.g.register}}
    li: a(@click='isauth=true') {{$lang.g.has_account}}
</template>

<style lang="scss" scoped>
.back {
    float: left;
    margin-bottom: 1em;
}
</style>