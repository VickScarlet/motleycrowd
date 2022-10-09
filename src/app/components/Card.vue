<template>
    <div class="card" :card="card" :grade="grade">
        <slot></slot>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    props: {
        card: {
            type: String,
            required: true,
            default: '',
        },
    },
    data() {
        return {
            grade: 0,
        }
    },
    mounted() {
        watch(()=>this.badge, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            const data = $core.sheet.get('card', this.card);
            if(!data) return;
            this.grade = data.grade;
        },
    }
});
</script>

<style lang="scss" scoped>
div.card {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);

    &[card=""] {
        background: #424242;
        background: linear-gradient(67deg, #424242, #6e6e6e);
    }
    &[card="201"] {
        background: #2563b3;
        background: linear-gradient(67deg, #2563b3, #4c8adb);
    }
    &[card="202"] {
        background: #8a30ab;
        background: linear-gradient(67deg, #8a30ab, #c66de6);
    }
    &[card="203"] {
        background: #e19b22;
        background: linear-gradient(67deg, #e19b22, #e1b467);
    }
    &[card="204"] {
        background: #737373;
        background: linear-gradient(67deg, #73737349, #73737300);
    }
}

</style>