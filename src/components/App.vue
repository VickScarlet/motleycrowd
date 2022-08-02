<script setup>
import Loading from './Loading.vue'
import Alert from './Alert.vue'
import Tips from './Tips.vue'
defineExpose(getCurrentInstance().proxy);
</script>

<template>
    <keep-alive>
        <component :is="page" :_id="_id"
            @activated="componentActivated"
            @deactivated="componentDeactivated"
        ></component>
    </keep-alive>
    <p class="serverstat">
        当前延迟: {{delay}}ms<br/>
        在线人数: {{online}}
    </p>
    <Loading v-show="loading" />
    <Alert v-show="showAlert" @hide="hideAlert">{{alertMessage}}</Alert>
    <Tips v-show="showTips" @click="hideTips">{{tipsMessage}}</Tips>
    <div class="fullscreen">
        <input id="fullscreencb" type="checkbox" placeholder="自动登录" @click="fullscreen()" v-model.trim="isfullscreen"/>
        <label for="fullscreencb">{{isfullscreen?'窗口':'全屏'}}</label>
    </div>
</template>

<script>
import { v4 as uuidGenerator } from 'uuid';
import Welcome from './Welcome.vue'
import Authentication from './Authentication.vue'
import Index from './Index.vue'
import Room from './Room.vue'
import { getCurrentInstance } from 'vue'

export default {
    name: 'App',
    components: {
        Welcome,
        Authentication,
        Index,
        Room,
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
            isfullscreen: false,
            _id: uuidGenerator(),
            done: new Map(),
            next: new Map(),
            proxy: new Map(),
        }
    },
    methods: {
        async switch(page, data) {
            return new Promise(resolve => {
                const id = uuidGenerator();
                this._id = id;
                this.done.set(id, {page, data, resolve});
                this.page = page;
            });
        },
        async componentActivated({_id, proxy, callback}) {
            if (!this.done.has(_id)) return;
            const {page, data, resolve} = this.done.get(_id);
            this.proxy.set(page, proxy);
            this.done.set(_id, {page, data, done: ()=>this.proxy.delete(page)});
            console.debug('[UI:activated] [page:%s] [_id:%s] data:', page, _id, data);
            await callback(data);
            resolve();
        },
        async componentDeactivated({_id, callback}) {
            if (!this.done.has(_id)) return;
            const {page, data, done} = this.done.get(_id);
            console.debug('[UI:deactivated] [page:%s] [_id:%s] data:', page, _id, data);
            await callback();
            await done?.();
        },
        alert(message) {
            this.alertMessage = message;
            this.showAlert = true;
        },
        hideAlert() {
            this.showAlert = false;
        },
        async start() {
            this.tips('欢迎来到 [乌合之众]');

            const {r, _} = await $.core.user.autologin();
            if (r) {
                this.tips('自动登录成功');
                this.switch('Index');
            } else if (!_) {
                this.tips('自动登录失败');
            }
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
        },
        fullscreen() {
            if (!document.webkitIsFullScreen) {
                const de = document.documentElement;
                if(de.requestFullscreen) return de.requestFullscreen();
                if(de.mozRequestFullScreen) return de.mozRequestFullScreen();
                if(de.webkitRequestFullScreen) return de.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                if(de.msRequestFullScreen) return de.msRequestFullScreen();
                return this.tips('不支持全屏');
            }
            const d = document;
            if(d.exitFullscreen) return d.exitFullscreen();
            if(d.mozCancelFullScreen) return d.mozCancelFullScreen();
            if(d.webkitCancelFullScreen) return d.webkitCancelFullScreen();
            if(d.msExitFullscreen) return d.msExitFullscreen();
        },
        async activatedProxy(page, callback) {
            const proxy = this.proxy.get(page);
            if (!proxy) return {r: false, e: 'proxy not found'};
            return callback(proxy);
        },
        async serverpush(type, data) {
            switch (type) {
                case 'game.user':
                    return this.activatedProxy('Room', proxy=>proxy.user(data));
                case 'game.ready':
                case 'game.question':
                case 'game.answer':
                case 'game.settlement':
                default:
                    return true;
            }
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

.fullscreen {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: block;
    text-align: left;
    z-index: 99999999;
    position: fixed;
    bottom: 0.4em;
    right: 0.4em;
    width: 3em;
    height: 3em;
    line-height: 3em;
    text-align: center;
}
.fullscreen label {
    font-size: 0.8em;
    color: #888;
    background: var(--button-background);
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;;
}
.fullscreen input {
    display: none;
}
</style>
