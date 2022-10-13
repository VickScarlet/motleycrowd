<template>
    <div class="accessory">
        <div class="header">
            <div class="item">
                <UserCard :uuid="uuid" :p_card="card" :p_badge="badge" />
            </div>
            <div class="buttons">
                <button class="back" @click="$app.switch('Index')">{{$lang.g.back}}</button>
                <button @click="accessory">{{$lang.g.apply_accessory}}</button>
            </div>
        </div>
        <div class="list">
            <div class="card">
                <p v-if="cards.length==0">{{$lang.g.no_card}}</p>
                <ul v-if="cards.length!=0">
                    <li v-for="id in cards" :key="id">
                        <input type="radio" name="card"
                            :id="`c${id}`"
                            :value="id"
                            v-model="card"
                        /><label :for="`c${id}`">
                            <Card :card="id">
                                {{$core.sheet.get('card', id, 'name')}}
                            </Card>
                        </label>
                    </li>
                </ul>
            </div>
            <div class="badge">
                <p v-if="badges.length==0">{{$lang.g.no_badge}}</p>
                <ul v-if="badges.length!=0">
                    <li v-for="id in badges" :key="id">
                        <input type="radio" name="badge"
                            :id="`c${id}`"
                            :value="id"
                            v-model="badge"
                        /><label :for="`c${id}`">
                            <Badge :badge="id" />
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserCard from '../components/UserCard.vue';
import Card from '../components/Card.vue';
import Badge from '../components/Badge.vue';
export default defineComponent({
    components: { UserCard, Card, Badge },
    data() {
        return {
            badges: [],
            cards: [],
            uuid: '',
            card: '',
            badge: '',
        }
    },
    async activated() {
        const uuid = $core.user.uuid;
        let badges = await $core.asset.badges();
        let cards = await $core.asset.cards();
        if($debug) {
            cards = $core.sheet.keys('card');
            badges = $core.sheet.keys('badge');
        }

        badges = badges.sort((a,b)=>
            $core.sheet.get('badge',b,'grade')-
            $core.sheet.get('badge',a,'grade')
        );
        cards = cards.sort((a,b)=>
            $core.sheet.get('card',b,'grade')-
            $core.sheet.get('card',a,'grade')
        );

        this.uuid = uuid;
        this.cards = cards;
        this.badges = badges;
        this.card = '';
        this.badge = '';
    },
    deactivate() {},
    methods: {
        async accessory() {
            const {card, badge} = this;
            $app.loading = true;
            await $core.user.accessory({card, badge});
            $app.loading = false;
        },
    },
});
</script>

<style lang="scss" scoped>

div.accessory {
    > .header {
        z-index: 10;
        width: 100%;
        height: 100px;
        top: 0;
        left: 0;
        position: fixed;
        margin: auto;
        background: #3d3d3d;
        background: linear-gradient(to bottom, #3d3d3d, #3d3d3d00);

        > * {
            display: inline-block;
            height: 100px;
            vertical-align: top;
        }

        > .buttons {
            position: relative;
            width: 150px;
            margin-right: 10px;
            > button {
                position: absolute;
                left: 0;
                &:first-child { top: 10px; }
                &:last-child { bottom: 10px; }
                width: 100%;
                height: 35px;
            }
        }

        > .item {
            margin: 0;
            padding: 0;
            width: 300px;
            &:hover { background: #ffa20030; }
        }
    }

    > div.list {
        margin-top: 130px;
        display: flex;
        justify-content: space-between;
        width: 100%;

        > div {
            > ul > * {
                position: relative;
                display: inline-block;
                cursor: pointer;
                padding: 0;
                margin: 2px;
                > input { display: none; }
                &:hover::after {
                    content: "";
                    display: block;
                    position: absolute;
                    z-index: -1;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    border: 1px solid #ffa200;
                }
            }
            &.card {
                width: 160px;
                > ul > * {
                    width: 150px;
                    height: 40px;
                }
            }
            &.badge {
                width: calc(100% - 160px);
                > ul {
                    position: relative;
                    display: flex;
                    align-items: center;
                    align-content: space-between;
                    justify-content: space-between;
                    height: auto;
                    margin: auto;
                    flex-wrap: wrap;
                    > * { padding: 6px; }
                }
            }
        }


    }
}

@media all and (max-width: 460px) {
div.accessory {
    > .header {
        height: 145px;
        > .buttons {
            position: relative;
            width: 280px;
            height: 35px;
            margin-right: 0;
            > button {
                position: absolute;
                left: auto;
                &:first-child { top: 0; left: 0; }
                &:last-child { right: 0; bottom: 0;}
                width: 135px;
                height: 35px;
            }
        }
    }

    > div.list {
        flex-direction: column;
        margin-top: 175px;

        > div.card,
        > div.badge {
            width: 100%;
            > ul { display: block; }
        }
    }

}
}

</style>