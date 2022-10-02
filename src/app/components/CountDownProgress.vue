<template>
    <div class="container">
        <div class="bg"></div>
        <div class="bar" :style="`right:${100-width}%;`"></div>
        <p>{{left}}s</p>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    props: {
        init: {
            type: Object,
            default: {
                total: 60000,
                left: 60000,
            },
        },
    },
    data() {
        return {
            left: 60,
            width: 100,
            interval: null,
        };
    },
    mounted() {
        watch(()=>this.init, ()=>this.render());
        this.render();
    },
    methods: {
        render() {
            if(this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }

            const total = this.init.total;
            const end = Date.now() +
                (this.init.left || total);
            const tick = ()=>{
                const left = end - Date.now();
                if(left > 0) {
                    this.left = Math.floor(left / 1000);
                    this.width = left / total * 100;
                    return;
                }

                clearInterval(this.interval);
                this.interval = null;
                this.width = 0;
                this.left = 0;
            };
            this.interval = setInterval(tick, 100);
            tick();
        }
    }
});
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 100%;
    height: 100%;
}
.bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(35deg, #2b1330, #0e1237);
    border: 2px solid black;
    opacity: 0.8;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba($color: #000000, $alpha: .8);
}

.bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: 2px;
    background: linear-gradient(15deg, #a34bb9, #3b4ec8);
    border-radius: 4px;
}

p {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 0 0 4px #4bff87;
}

</style>