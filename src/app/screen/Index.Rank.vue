<script setup>
import { ref } from 'vue';
import Detail from './Index.Rank.Detail.vue';

const rank = ref('main');
</script>

<template lang="pug">
.index-rank
    Detail(:rank='rank')
    ul.menu
        li
            input#main(type='radio' name='rank' v-model='rank' value='main')
            label(for='main') {{$lang.g.rank_main}}
        li
            input#ten(type='radio' name='rank' v-model='rank' value='ten')
            label(for='ten') {{$lang.g.rank_ten}}
        li
            input#hundred(type='radio' name='rank' v-model='rank' value='hundred')
            label(for='hundred') {{$lang.g.rank_hundred}}

</template>

<style lang="scss" scoped>
div.index-rank {
    width: 100%;
    > ul.menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 0;
        display: flex;
        background: #262626;
        li {
            margin: 0;
            position: relative;
            padding: 0;
            width: 100%;
            input { display: none; }
            border-left: 1px solid #7d7d7d;
            border-right: 1px solid #7d7d7d;

            label {
                display: block;
                padding: 0.5em 0;
                text-align: center;
                background: rgba(0, 0, 0, 0.4);
            }

            input:checked + label {
                background: linear-gradient(67deg, #ffae0090, #48ff007b);
            }
        }
    }
}


</style>