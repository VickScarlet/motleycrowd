import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

const app = createApp(App);
const vm = app.mount('#app');

window.app = app;
window.vm = vm;
window.$page = (page, data) => vm.switch(page, data);