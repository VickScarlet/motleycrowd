<script setup>
const {title, subtitle, auth_regi, guestmode} = $lang.g;
const auth = ()=>$app.switch('Authentication');
const guest = async ()=>{
    $app.loading(true);
    const result = await $core.user.guest();
    $app.loading(false);
    if (!result) return;
    $app.switch('Index');
};
</script>

<template>
    <ul class="welcome">
        <li>
            <h1>{{title}}</h1>
            <h3 class="subtitle">{{subtitle}}</h3>
        </li>
        <li><button type="button" @click="auth">{{auth_regi}}</button></li>
        <li><button type="button" @click="guest">{{guestmode}}</button></li>
    </ul>
</template>