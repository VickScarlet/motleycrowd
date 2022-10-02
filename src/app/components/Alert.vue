<template>
    <div class="alert-message">
        <div class="alert-message-content">
            <slot></slot>
            <button class="alert-message-hide" @click="hide">✕</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        hide() {
            this.$emit('hide');
        },
    }
});
</script>

<style lang="scss" scoped>
.alert-message::before {
    position: fixed;
    content: " ";
    background: #000;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.6;
}
.alert-message {
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    position: fixed;
    z-index: 999999;
}
.alert-message-content {
    max-width: 98%;
    min-width: 300px;
    min-height: 6em;
    text-align: left;
    text-shadow: 0 0 8px #000;
    position: absolute;
    padding: 2em 3em;
    font-size: 1.2em;
    background: var(--alert-message-background);
    border-radius: 0.5em;
    box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    /*垂直居中*/
    -webkit-box-align: center;/*旧版本*/
    -moz-box-align: center;/*旧版本*/
    -ms-flex-align: center;/*混合版本*/
    -webkit-align-items: center;/*新版本*/
    align-items: center;/*新版本*/
}

.alert-message-hide {
    background: linear-gradient(45deg, #132b6800, rgba(165, 17, 91, 0.386), #ff0000a8);
    border-radius: 0 0.5em 0 50%;
    height: 2em;
    width: 2em;
    border: none;
    font-weight: 700;
    position: absolute;
    top: 0;
    right: 0;
}
.alert-message-hide:hover {
    box-shadow: none;
    background: linear-gradient(45deg, #132b6800, rgba(165, 17, 91, 0.713), #ff0000);
    border-radius: 0 4px 0 50%;
}


</style>