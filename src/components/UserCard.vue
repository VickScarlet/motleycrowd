<template>
    <div class="usercard">
        <span v-if="user.guest">
            游客{{user.uid}}
        </span>
        <span v-else>
            {{user.username}}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
</style>