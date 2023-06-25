<script setup>
const auth = ()=>$app.switch('Authentication');
const guest = async ()=>{
    $app.loading(true);
    const result = await $core.user.guest();
    $app.loading(false);
    if (!result) return;
    $app.switch('Index');
};
</script>

<template lang="pug">
ul.welcome
    li
        h1 {{$lang.g.title}}
        h3.subtitle {{$lang.g.subtitle}}
    li: button(type='button' @click='auth') {{$lang.g.auth_regi}}
    li: button(type='button' @click='guest') {{$lang.g.guestmode}}
</template>