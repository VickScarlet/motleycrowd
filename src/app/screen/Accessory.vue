<template>
    <div class="container">
        <div class="current">
            <div class="cardbox">
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
                    <li v-for="id in cards" :key="id" class="cardbox">
                        <input type="radio" name="card"
                            :id="`c${id}`"
                            :value="id"
                            v-model="card"
                        /><label :for="`c${id}`">
                            <UserCard :uuid="uuid" :p_card="id" />
                        </label>
                    </li>
                </ul>
            </div>
            <div class="badge">
                <p v-if="badges.length==0">{{$lang.g.no_badge}}</p>
                <ul v-if="badges.length!=0">
                    <li v-for="id in badges" :key="id" class="cardbox">
                        <input type="radio" name="badge"
                            :id="`c${id}`"
                            :value="id"
                            v-model="badge"
                        /><label :for="`c${id}`">
                            <UserCard :uuid="uuid" :p_badge="id" />
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
export default defineComponent({
    components: { UserCard },
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
        const badges = await $core.asset.badges();
        const cards = await $core.asset.cards();
        this.uuid = uuid;
        this.badges = badges;
        this.cards = cards;
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

.current {
    z-index: 1;
    width: 100%;
    height: 100px;
    top: 0;
    left: 0;
    position: fixed;
    margin: auto;
    background: #3d3d3d;
    background: linear-gradient(to bottom, #3d3d3d, #3d3d3d00);

    > div {
        height: 100px;
        display: inline-block;
    }

    > .buttons {
        position: relative;
        width: 150px;
        margin-right: 10px;
    }

    button {
        position: absolute;
        left: 0;
        &:first-child { top: 10px; }
        &:last-child { bottom: 10px; }
        width: 100%;
        height: 35px;
    }
}

input { display: none; }

div.list {
    margin-top: 130px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div.card {
        width: 300px;
    }

    > div.badge {
        min-width: 300px;
        width: 900px;
        max-height: 100%;
        > ul {
            position: relative;
            display: flex;
            align-items: center;
            align-content: space-between;
            justify-content: space-between;
            height: auto;
            margin: auto;
            flex-wrap: wrap;
        }
    }
}

.cardbox {
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 100px;
    cursor: pointer;
    &:hover {
        background: #ffa20030;
    }

}

@media all and (max-width: 1200px) {
    div.list {
        > div.badge {
            width: 600px;
        }
    }
}

@media all and (max-width: 900px) {
    div.list {
        > div.badge {
            width: 300px;
            > ul {
                display: block;
            }
        }
    }
}

@media all and (max-width: 600px) {
    div.list {
        flex-direction: column;
        > div.card {
            width: 100%;
        }
        > div.badge {
            width: 100%;
            > ul {
                display: block;
            }
        }
    }
}

@media all and (max-width: 460px) {
    div.list {
        margin-top: 175px;
    }

    .current {
        height: 145px;
        > .buttons {
            position: relative;
            width: 280px;
            height: 35px;
            margin-right: 0;
        }

        button {
            position: absolute;
            left: auto;
            &:first-child { top: 0; left: 0; }
            &:last-child { right: 0; bottom: 0;}
            width: 135px;
            height: 35px;
        }
    }
}



</style>