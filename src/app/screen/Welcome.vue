<template>
    <ul class="container">
        <li>
            <h1>{{$lang.g.title}}</h1>
            <h3 class="subtitle">{{$lang.g.subtitle}}</h3>
        </li>
        <li><button type="button" @click="auth">{{$lang.g.auth_regi}}</button></li>
        <li><button type="button" @click="guest">{{$lang.g.guestmode}}</button></li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';

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