<script setup>
const logout = async () => {
    $app.loading(true);
    const result = await $core.user.logout();
    $app.loading(false);
    if (result) $app.switch('Welcome');
};
</script>

<template lang="pug">
.index-user
    h1 {{$lang.g.title}}
    h3.subtitle {{$lang.g.subtitle}}
    ul.menu
        li.l-1(@click='$app.switch("Achievement")')
            span.icon
            span {{$lang.g.achievement}}
        li.l-2(@click='$app.switch("Accessory")')
            span.icon
            span {{$lang.g.accessory}}
        li.l-3(@click='$app.switch("Shop")')
            span.icon
            span {{$lang.g.shop}}
        li.l-4(@click='logout')
            span.icon
            span {{$lang.g.logout}}
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