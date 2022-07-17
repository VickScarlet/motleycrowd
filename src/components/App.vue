<script setup>
import Loading from './Loading.vue'
import Alert from './Alert.vue'
import Tips from './Tips.vue'
defineExpose(getCurrentInstance().proxy);
</script>

<template>
    <component ref="page" :is="page"></component>
    <p class="serverstat">
        当前延迟: {{delay}}ms<br/>
        在线人数: {{online}}
    </p>
    <Loading v-show="loading" />
    <Alert v-show="showAlert" @hide="hideAlert">{{alertMessage}}</Alert>
    <Tips v-show="showTips" @click="hideTips">{{tipsMessage}}</Tips>
</template>

<script>
import Welcome from './Welcome.vue'
import Authentication from './Authentication.vue'
import Index from './Index.vue'
import { getCurrentInstance } from 'vue'

export default {
    name: 'App',
    components: {
        Welcome,
        Authentication,
        Index,
    },
    data() {
        return {
            loading: true,
            showAlert: false,
            page: 'Welcome',
            alertMessage: '',
            delay: -1,
            online: -1,
            tipsMessage: '',
            showTips: false,
        }
    },
    methods: {
        async switch(page, data) {
            this.page = page;
            await this.$refs.page?.onshow?.(data);
        },
        alert(message) {
            this.alertMessage = message;
            this.showAlert = true;
        },
        hideAlert() {
            this.showAlert = false;
        },
        async start() {
            const updateStat = async () => {
                const {delay, online} =await $.core.ping();
                this.delay = delay;
                this.online = online;
            }
            setInterval(updateStat, 10000);
            await updateStat();
        },
        hideTips() {
            this.showTips = false;
        },
        tips(message) {
            this.tipsMessage = message;
            this.showTips = true;
            setTimeout(() => this.hideTips(), 3000);
        }
    },
}
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.serverstat {
    font-size: 0.8em;
    color: #888;
    display: block;
    text-align: left;
    z-index: -1;
    position: fixed;
    top: 0.2em;
    left: 0.2em;
}

</style>
