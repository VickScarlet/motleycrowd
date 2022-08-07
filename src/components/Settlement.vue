<template>
    <div class="container">
        {{_data}}
        <button @click="ok">确定</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    activated() {
    },
    deactivated() {
    },
    methods: {
        ok() {
            $.ui.switch('Index');
        }
    }
}
</script>

<style lang="scss" scoped>
</style>