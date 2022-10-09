<template>
    <ul class="pages">
        <li class="first" @click="p=1">⇤</li>
        <li class="prev" @click="p--">↞</li>
        <li v-for="_ in center" :key="_" @click="p=_"
            :class="{active: p==_, center: 1}"
        >{{_}}</li>
        <li class="next" @click="p++">↠</li>
        <li class="last" @click="p=total">⇥</li>
        <li class="input">
            <input type="number" v-model.number="input"/>
        </li>
        <li class="go" @click="p=input">↲</li>
    </ul>
</template>

<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    props: {
        total: {
            type: Number,
            required: true,
            default: 0,
        },
        live: {
            type: Number,
            default: 5,
        },
        page: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            _input: 1,
            _p: 1,
            center: [],
        }
    },
    mounted() {
        watch(()=>this.total, _=>this.p=this._p);
        watch(()=>this.page, p=>this.p=p);
        this.p=this.page;
    },
    computed: {
        p: {
            get() { return this._p; },
            set(page) {
                if(page < 1 || page > this.total)
                    return;
                const live = this.live;
                const total = this.total;
                const prev = Math.floor(live/2);
                const start = total < live ? 1
                    : Math.max(1, page - prev);
                const end = Math.min(total, start + live);
                this.center = new Array(end - start + 1)
                    .fill(0).map((_, i) => start + i);
                this.input = page;
                if(page === this._p)
                    return;
                this._p = page;
                this.$emit('update:page', page);
            }
        },
        input: {
            get() { return this._input || this._p; },
            set(input) {
                if(input < 1)
                    input = 1;
                else if(input > this.total)
                    input = this.total;
                this._input = input;
            }
        },
    },
});
</script>

<style lang="scss" scoped>
ul.pages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 35px;
    list-style: none;
    li {
        padding: 0;
        margin: 0 5px;
        line-height: 35px;
        text-align: center;
        width: 35px;
        height: 35px;
        border: 1px solid #000;
        border-radius: 5px;
        cursor: pointer;

        &:first-child { margin-left: 0; }
        &:last-child { margin-right: 0; }

        &:hover {
            background: #000;
            color: #fff;
        }
        &.active {
            background: #000;
            color: #fff;
        }
        &.input {
            border: none;
            width: 37px;
            height: 37px;
            > input {
                width: 35px;
                height: 35px;
                line-height: 35px;
                padding: 0;
                margin: 0;
                border: 1px solid #266fdb !important;
                border-radius: 5px;
                text-align: center;
                background: none;
            }
        }
    }
}
</style>