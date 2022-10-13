<template>
    <div class="v-card" :card="card" :grade="grade">
        <div><slot></slot></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        card: {
            type: String,
            required: true,
            default: '',
        },
    },
    computed: {
        grade() {
            return $core.sheet.get('card', this.card, 'grade') || 0;
        },
    },
});
</script>

<style lang="scss" scoped>
div.v-card {
    display: block;
    position: relative;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    > div {
        position: relative;
        display: block;
        padding: 10px;
        top: 50%;
        left: 0;
        width: calc(100% - 20px);
        transform: translateY(-50%);
        z-index: 5;
    }
}

</style>