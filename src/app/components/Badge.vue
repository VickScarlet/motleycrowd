<template>
    <span class="badge" :grade="grade" v-if="display">{{name}}</span>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        badge: {
            type: String,
            required: true,
            default: '',
        },
    },
    computed: {
        sheet() {
            return $core.sheet.get('badge', this.badge);
        },
        name() {
            return this.sheet.name;
        },
        grade() {
            return this.sheet.grade;
        },
        display() {
            return !!this.sheet;
        },
    },
});
</script>

<style lang="scss" scoped>
span.badge {
    padding: 0 4px;
    border-radius: 4px;
    text-shadow: #000000b2 1px 1px 2px;
    box-shadow: #00000060 1px 1px 2px;
    &[grade="0"] { background: #383838; }
    &[grade="1"] { background: #39c2f9; }
    &[grade="2"] { background: #e24fff; }
    &[grade="3"] { background: #fbb946; }
}

</style>