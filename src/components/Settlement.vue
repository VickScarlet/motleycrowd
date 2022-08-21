<script setup>
import { getCurrentInstance } from 'vue'
import SettlementQuestion from './SettlementQuestion.vue'
defineExpose(getCurrentInstance().proxy);
</script>

<template>
    <div class="container">
        <ul>
            <li v-for="index in getData().indexs" :key="index">
                <settlement-question :getData="()=>getData().at(index)" />
            </li>
        </ul>
        <button @click="ok">确定</button>
    </div>
</template>

<script>
export default {
    methods: {
        ok() {
            $.ui.switch('Index');
        }
    }
}
</script>

<style lang="scss" scoped>
</style>