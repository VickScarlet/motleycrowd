<template>
    <component ref="page" :is="page"></component>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Authentication from './components/Authentication.vue'
import Index from './components/Index.vue'

export default {
    name: 'App',
    components: {
        Welcome,
        Authentication,
        Index,
    },
    data() {
        return {
            page: 'Welcome',
        }
    },
    methods: {
        switch(page, data) {
            this.page = page;
            this.$refs.page?.onshow?.(data);
        },
    },
}
</script>

<style scoped>

</style>
