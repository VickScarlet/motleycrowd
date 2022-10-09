<template>
    <div class="ranking" :ranking="ranking">
        <span>{{ranking}}</span>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        ranking: {
            type: Number,
            required: true,
            default: 0,
        },
    },
});
</script>

<style lang="scss" scoped>
div.ranking {
    font-style: italic;
    height: 60px;
    width: 60px;
    line-height: 60px;
    margin: 0;
    text-align: center;
    span {
        display: block;
        height: 100%;
        font-size: 1em;
        background: #2563b3;
        border-radius: 4px;
    }

    &[ranking="1"] {
        span {
            background: #ffe600;
            color: #2563b3
        }
    }
}

</style>