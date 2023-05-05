<script setup>
const logout = async () => {
    $app.loading(true);
    const result = await $core.user.logout();
    $app.loading(false);
    if (result) $app.switch('Welcome');
};
</script>

<template>
    <div class="index-user">
        <h1>{{$lang.g.title}}</h1>
        <h3 class="subtitle">{{$lang.g.subtitle}}</h3>
        <ul class="menu">
            <li class="l-1" @click="$app.switch('Achievement')">
                <span class="icon"></span>
                <span>{{$lang.g.achievement}}</span>
            </li>
            <li class="l-2" @click="$app.switch('Accessory')">
                <span class="icon"></span>
                <span>{{$lang.g.accessory}}</span>
            </li>
            <li class="l-3" @click="$app.switch('Shop')">
                <span class="icon"></span>
                <span>{{$lang.g.shop}}</span>
            </li>
            <li class="l-4" @click="logout">
                <span class="icon"></span>
                <span>{{$lang.g.logout}}</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
div.index-user {
    > ul.menu {
        max-width: 600px;
        > li {
            cursor: pointer;
            user-select: none;
            display: inline-block;
            width: 220px;
            height: 100px;
            backdrop-filter: blur(10px);
            border-radius: 8px;
            font-size: 2.5em;
            line-height: 100px;
            color: #1b0c56;
            text-align: left;
            padding-left: 20px;
            font-weight: bold;
            margin: 8px;
            margin-top: auto;
            position: relative;
            span { position: absolute; }
            span.icon {
                border-radius: 0 8px 8px 0;
                display: block;
                width: 120px;
                height: 100px;
                background-repeat: no-repeat;
                background-position: 0px -20px;
                background-size: 130px;
                position: absolute;
                right: 0;
                top: 0;
            }
            &.l-1 {
                background: linear-gradient(45deg, #aaffb2, #ffff00);
                span.icon { background-image: url(/icons/achi.svg); }
            }
            &.l-2 {
                background: linear-gradient(45deg, #f5f5f5, #8282b4);
                span.icon { background-image: url(/icons/accessory.svg); }
            }
            &.l-3 {
                background: linear-gradient(45deg, #f5f5f5, #438e8a);
                span.icon { background-image: url(/icons/shop.svg); }
            }
            &.l-4 {
                background: linear-gradient(45deg, #f5f5f5, #933737);
                span.icon { background-image: url(/icons/out.svg); }
            }
        }
    }
}
</style>