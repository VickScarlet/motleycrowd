<template>
    <ul class="container">
        <li>
            <h1>{{$lang.g.title}}</h1>
            <h3 class="subtitle">{{$lang.g.subtitle}}</h3>
        </li>
        <li><button type="button" @click="pair(100)">{{$lang.g.pair_mode.f(100)}}</button></li>
        <li><button type="button" @click="pair(10)">{{$lang.g.pair_mode.f(10)}}</button></li>
        <li><button type="button" @click="custom">{{$lang.g.priv_mode}}</button></li>
        <li v-if="!$core.user.isguest">
            <button type="button" @click="$app.switch('History')">{{$lang.g.history}}</button>
        </li>
        <li v-if="!$core.user.isguest">
            <button type="button" @click="$app.switch('Achievement')">{{$lang.g.achievement}}</button>
        </li>
        <li v-if="!$core.user.isguest">
            <button type="button" @click="$app.switch('Rank')">{{$lang.g.rank}}</button>
        </li>
        <li v-if="!$core.user.isguest">
            <button type="button" @click="$app.switch('Accessory')">{{$lang.g.accessory}}</button>
        </li>
        <li v-if="!$core.user.isguest">
            <button type="button" @click="$app.switch('Shop')">{{$lang.g.shop}}</button>
        </li>
        <li><button type="button" @click="logout">{{$lang.g.logout}}</button></li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        async pair(type) {
            console.debug('pair', type);
            $app.loading = true;
            const result = await $core.game.pair(type);
            $app.loading = false;
            if (result) $app.switch('Room');
        },
        custom() {
            console.debug('custom');
        },
        async logout() {
            $app.loading = true;
            const result = await $core.user.logout();
            $app.loading = false;
            if (result) $app.switch('Welcome');
        },
    }
});
</script>

<style lang="scss" scoped>

</style>