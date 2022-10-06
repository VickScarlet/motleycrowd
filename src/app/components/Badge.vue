<template>
    <span :grade="grade" v-if="display">{{name}}</span>
</template>

<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    props: {
        badge: {
            type: String,
            required: true,
            default: '',
        },
    },
    data() {
        return {
            display: false,
            name: '',
            grade: 0,
        }
    },
    mounted() {
        watch(()=>this.badge, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            const data = $core.sheet.get('badge', this.badge);
            if(!data) {
                this.display = false;
                return;
            }
            this.display = true;
            const {name, grade} = data;
            this.name = name;
            this.grade = grade;
        },
    }
});
</script>

<style lang="scss" scoped>

span[grade="0"] { background: #383838; }
span[grade="1"] { background: #39c2f9; }
span[grade="2"] { background: #e24fff; }
span[grade="3"] { background: #fbb946; }
span {
    padding: 0 4px;
    border-radius: 4px;
}

</style>