<template>
    <div class="container" v-if="data.unlocked" :grade=data.grade >
        <span class="name">{{data.name}}</span>
        <span class="desc">{{data.description}}</span>
    </div>
    <div class="container" v-if="!data.unlocked" :grade=data.grade locked >
        <span class="name" v-if="!data.hide">{{data.name}}</span>
        <span class="name" v-if="data.hide">???</span>
        <span class="desc" v-if="!data.hide">{{data.description}}</span>
        <span class="desc" v-if="data.hide">???</span>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
            default: {
                id: -1,
                name: '',
                description: '',
                grade: 0,
                hide: false,
            },
        },
    },
});
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    margin: 0;
    padding: 4px;
    min-width: 100%;
    height: 6rem;
    border-radius: 4px;

    > span {
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
    &[grade='0'] { background: #f5f5f5; }
    &[grade='1'] { background: #6565e1; }
    &[grade='2'] { background: #c04fe2; }
    &[grade='3'] { background: #ee9b49; }
    .name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #000000;
    }
    .desc {
        font-size: 1rem;
        color: #000000;
    }
}
.container[locked]::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 1;
}

</style>