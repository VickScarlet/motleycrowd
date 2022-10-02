<template>
    <div class="container" :iscollapsed="iscollapsed">
        <button @click="toggle" collapse v-if="!iscollapsed">{{$lang.g.collapse}}</button>
        <h3>{{$lang.g.rank}}</h3>
        <ul class="rank">
            <li v-for="({uuid, ranking, answers, total}) in rank"
                :key="uuid"
                :ismine="uuid==mine"
                :ranking="ranking"
                @click="$emit('ch',uuid)"
            >
                <div>
                    <div>
                        <span>{{ranking}}</span>
                        <span :gt0="total>0">{{total}}</span>
                    </div>
                    <div>
                        <UserCard :uuid="uuid" />
                    </div>
                </div>
                <ul>
                    <li v-for="({value, answer}, idx) in answers"
                        :key="idx"
                        :gt0="value>0"
                        :title="`Q${idx+1}: ${answer}`"
                    >
                        <span :style="`opacity: ${
                            Math.min(1, Math.abs(value/3)) || 0
                        };`"></span>
                        {{value>0?'+':''}}{{value}}
                    </li>
                </ul>
            </li>
        </ul>
        <button @click="toggle" collapse v-if="!iscollapsed">{{$lang.g.collapse}}</button>
        <button @click="toggle" expand   v-if="iscollapsed">{{$lang.g.expand}}</button>
    </div>
</template>
<script>
import { watch, defineComponent } from 'vue';
import UserCard from '../components/UserCard.vue';

export default defineComponent({
    components: {UserCard},
    data() {
        return {
            mine: '',
            iscollapsed: true,
            rank: [],
        }
    },
    mounted() {
        watch(()=>this.getData, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            const data = this.getData();
            if(!data) return;
            this.mine = data.uuid;
            this.rank = data.rank.map(({uuid, score, ranking, subs})=>({
                uuid,
                ranking,
                total: score,
                answers: subs,
            }));
        },
        toggle() {
            this.iscollapsed = !this.iscollapsed;
        },
    },
});
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    &[iscollapsed="true"] {
        overflow: hidden;
        max-height: 400px;
    }
    button {
        display: block;
        font-size: 0.8em;
        cursor: pointer;
        border: none;
        &:hover {
            box-shadow: none;
        }
        &[collapse] {
            position: relative;
            width: 100%;
            height: 2.5em;
            color: #ffffff98;
            background: transparent;
        }
        &[collapse]:first-child {
            margin-bottom:10px;
        }
        &[collapse]:last-child {
            margin-top:10px;
        }

        &[expand] {
            position: absolute;
            bottom: 0;
            left: 50%;
            padding: 0.4em 2em;
            border-radius: 4em;
            box-shadow: 0 2px 8px #000000cc;
            color: #ffffff;
            transform: translate(-50%, -100%);
            background: linear-gradient(67deg, #291ba6, #6f349f );
        }
    }
}

ul.rank > li {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 0;
    margin-top: 5px;
    &:first-child {
        margin-top: 0;
    }
    &[ismine="true"] {
        background: rgba($color: #ffa600, $alpha: 0.2);
        border-radius: 2px;
    }
    > div {
        display: flex;
        flex-direction: row;
        > div:first-child {
            display: flex;
            flex-direction: column;
            font-style: italic;
            height: 100px;
            width: 60px;
            text-align: center;
            margin: 0 10px;
            span {
                display: block;
                &:first-child {
                    margin-top: 20px;
                    height: 36px;
                    line-height: 36px;
                    font-size: 1.8em;
                    text-shadow: 0 0 8px #2563b3;
                    border: #2563b3 solid 2px;
                    border-radius: 4px 4px 0 0;
                }
                &:last-child {
                    height: 20px;
                    line-height: 20px;
                    font-size: 1em;
                    background: #2563b3;
                    border-radius: 0 0 4px 4px;
                }
            }
        }
        > div:last-child {
            position: relative;
            width: 300px;
            height: 100px;
        }
    }
    &[ranking="1"] {
        > div > div:first-child {
            span:first-child {
                position: relative;
                text-shadow: 0 0 8px #ffe600;
                border: #ffe600 solid 2px;
            }
            span:last-child {
                background: #ffe600;
                color: #2563b3
            }
        }
    }
    ul {
        padding: 0 10px;
        display: block;
        li {
            position: relative;
            font-size: 0.8em;
            display: inline-block;
            padding: 2px 6px;
            min-width: 14px;
            text-align: center;
            height: 22px;
            background: #0000006a;
            margin: 3px;
            border-radius: 2em;
            span {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 2em;
                z-index: -1;
            }

            &[gt0="true"] span {
                background: #6eff46;
            }

            &[gt0="false"] span {
                background: #ff5b5b;
            }
        }
    }
}

@media screen and (max-width: 600px) {
    ul.rank > li {
        flex-direction: column;
        ul { margin-top: 10px; }
        margin-top: 10px;
        padding-bottom: 10px;
        padding-right: 5px;
        border-bottom: 1px solid #ffffff3f;
        &:first-child { margin-top: 0; }
        &:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }
        > div {
            margin: auto;
        }
    }
}
</style>