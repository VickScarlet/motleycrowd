<template>
    <div class="usercard">
        <span class="username">
            <!-- <span :class=badge(user.style)>测试</span>
            <span>子鼠丑牛寅虎卯兔辰龙巳蛇午马未羊申猴酉鸡戌狗亥猪</span> -->

            <span v-if="user.guest">游客{{user.uuid}}</span>
            <span v-else>{{user.username}}</span>
        </span>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    methods: {
        badge(style) {
            return 'badge badge-default';
        },
    }
});
</script>

<style lang="scss" scoped>
.usercard {
    display: block;
    position: absolute;
    margin: 10px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    background: linear-gradient(67deg, #bfff00, 15%,#e500f9, 15%, #e500f9, 18%, #2563b3 );
    background: linear-gradient(67deg, #bfff00, 15%, #64065b, 15%, #64065b, #e500f9, calc(15% + 2px), #e500f9, calc(15% + 4px), #2563b3 );
    // background: radial-gradient( #bfff00, #2563b3, );

    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.username {
    text-shadow: 0 0 4px rgba(0,0,0,0.5);
    text-align: center;
    position: relative;
    &:first-child,
    &:last-child {
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
    }
    &:last-child {
        font-size: 18px;
    }
}

.badge {
    padding: 0 4px;
    border-radius: 5px;
    margin: 0;
    height: 14px;
    font-size: 14px;
    line-height: 14px;
    margin-right: 4px;
}

.badge-default {
    background: linear-gradient(67deg, #1decbc, 15%, #00ddd1 );
    color: #ffffff;
}
</style>