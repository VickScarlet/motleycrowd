<template>
    <span class="grade" :grade="grade">{{text}}</span>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        grade: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    computed: {
        text() {
            return $lang.g[`grade_${this.grade}`];
        },
    }
});
</script>

<style lang="scss" scoped>
span.grade {
    padding: 2px 4px;
    border-radius: 4px;
    display: inline-block;
    vertical-align: top;
    text-shadow: #000000b2 1px 1px 2px;
    box-shadow: #00000060 1px 1px 2px;
    &[grade="0"] { display: none; }
    &[grade="1"] { background: #39c2f9; }
    &[grade="2"] { background: #e24fff; }
    &[grade="3"] { background: #fbb946; }
}

</style>