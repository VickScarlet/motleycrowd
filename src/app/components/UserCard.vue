<template>
    <div class="usercard">
        <span class="username">
            <span v-if="guest">{{$lang.g.guestname.f(uuid)}}</span>
            <span v-else>{{username}}</span>
        </span>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue';

export default defineComponent({
    props: {
        uuid: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            username: '',
            guest: false,
        }
    },
    mounted() {
        watch(()=>this.uuid, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            const {uuid} = this;
            const user = await $core.user.get(uuid);
            if(user) {
                this.username = user.username;
                this.guest = !!user.guest;
            }
        },
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