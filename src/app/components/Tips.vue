<template>
    <div :class="{tips: true,'tips-show': show}" :type="type">
        <span class="icon" />
        <span class="content">{{tips}}</span>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    props: {
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'info',
        },
    },
    data() {
        return {
            n: 0,
            interval: null,
            timeout: null,
            list: [],
            show: false,
        }
    },
    computed: {
        tips() {
            return this.list?.slice(0, this.n).join('') || '';
        },
    },
    mounted() {
        watch(()=>this.content, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            clearTimeout(this.timeout);
            this.timeout = null;
            this.n = 0;
            this.list = this.content.match(/(\w+|[^\w])/g) || [];
            if(this.list.length == 0) return;
            if(this.interval) return;
            this.show = true;
            this.interval = setInterval(()=>{
                if (this.n < this.list.length)
                    return this.n++;
                clearInterval(this.interval);
                this.interval = null;
                this.timeout = setTimeout(()=>{
                    this.show = false;
                    this.$emit('done');
                }, 2000);
            }, 50);
        }
    }
});
</script>

<style lang="scss" scoped>
div.tips {
    pointer-events: none;
    position: relative;
    background: #777c97ad;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    min-width: 1.5em;
    min-height: 1.5em;
    display: none;
    padding: 0.5em;
    border-radius: 2em;
    box-shadow: 0 4px 16px -2px #000;
    >.icon {
        background-image: url(/icons/info.svg);
        background-size: 1.5em;
        width: 1.5em;
        height: 1.5em;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0.5em;
    }
    &[type="achievement"] {
        background: #00ff04ad;
        top: 2em;
        >.icon {
            background-image: url(/icons/achi.svg);
        }
    }
    >.content {
        display: block;
        margin-left: 2em;
        margin-right: 0.5em;
    }
}
div.tips-show {
    display: block;
}
</style>