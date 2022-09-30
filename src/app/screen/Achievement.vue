<template>
    <div class="container">
        <ul>
            <li>{{$lang.g.test}}</li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            show: false,
            message: '',
            achivs: [],
        }
    },
    async activated() {
        if(!$core.user.authenticated) {
            this.show = false;
            this.message = 'You must be logged in to view this page';
        }
        this.achivs = await $core.achievements();
    },
});
</script>

<style lang="scss" scoped>

</style>