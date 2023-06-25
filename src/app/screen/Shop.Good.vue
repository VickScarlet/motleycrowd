<script setup>
import Card from '../components/Card.vue';
import Badge from '../components/Badge.vue';
import Price from './Shop.Price.vue';
import Grade from '../components/Grade.vue';

const props = defineProps({
    rewards: { type: Object, default: {} },
    price: { type: Object, default: {} },
    original: { type: Object, default: null },
    owned: { type: Boolean, default: false },
    enough: { type: Boolean, default: false },
    discount: { type: Number, default: null },
});

const { rewards, price, original, owned, enough, discount } = props;
const type = Object.keys(rewards)[0];
const id = Object.keys(rewards[type])[0];
const item = { type, id };
const grade = $core.sheet.get(type, id, 'grade');
</script>

<template lang="pug">
ul.good(:grade='grade')
    li.type {{$lang.g[`good_${item.type}`]}}
    li.item
        Card.card(v-if='item.type=="card"' :card='item.id') {{$core.sheet.get('card', item.id, 'name')}}
        Badge.badge(v-if='item.type=="badge"' :badge='item.id')
    li.price: Price(:price='price' :original='original' :discount='discount')
    li.button
        button(v-if='owned' disabled) {{$lang.g.already_owned}}
        button(v-if='!owned&&!enough' disabled) {{$lang.g.asset_not_enough}}
        button(v-if='!owned&&enough' @click='$emit("buy")') {{$lang.g.buy}}
    li.grade: Grade(:grade='grade')
</template>

<style lang="scss" scoped>

ul.good {
    width: 150px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 5px;
    background: #0000001e;
    border-radius: 2px;
    box-shadow: inset 0 4px 16px -4px #c8c8c8;
    &[grade="1"] {
        background: #39c2f91e;
        box-shadow: inset 0 4px 16px -4px #39c2f9;
    }
    &[grade="2"] {
        background: #e24fff1e;
        box-shadow: inset 0 4px 16px -4px #e24fff;
    }
    &[grade="3"] {
        background: #fbb9461e;
        box-shadow: inset 0 4px 16px -4px #fbb946;
    }
    position: relative;
    > li {
        width: 150px;
        text-align: center;
        margin-top: 8px;
        &:first-child { margin-top: 0; }

        &.item {
            display: block;
            width: 150px;
            height: 35px;
            line-height: 35px;
        }
        &.button {
            width: 100%;
            padding: 5px 0;
            > button {
                width: 60px;
                height: 30px;
                margin: auto;
                border: none;
                border-radius: 4px;
                background: #2563b3;
                color: #ffffff;
                font-size: 1em;
                font-weight: bold;
                cursor: pointer;
                &:disabled {
                    background: #6e6e6e9c;
                    color: #b2b2b2;
                }
            }
        }
        &.grade {
            position: absolute;
            top: 0;
            right: 0;
            width: auto;
            height: auto;
            margin-top: 0;
            transform: translate(5px, -50%);
        }
    }
}
</style>