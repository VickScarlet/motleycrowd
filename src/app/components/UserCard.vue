<template>
    <div class="usercard">
        <Card :card="card">
            <span class="username">
                <Badge class="badge" :badge="badge" />
                <span class="name" v-if="guest">{{$lang.g.guestname.f(uuid)}}</span>
                <span class="name" v-else>{{username}}</span>
            </span>
        </Card>
    </div>
</template>

<script>
import { watch, defineComponent } from 'vue';
import Card from './Card.vue';
import Badge from './Badge.vue';

export default defineComponent({
    components: { Card, Badge },
    props: {
        uuid: {
            type: String,
            required: true,
        },
        p_card: {
            type: String,
            default: '',
        },
        p_badge: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            card: '',
            badge: '',
            username: '',
            guest: false,
        }
    },
    mounted() {
        watch(()=>this.uuid, ()=>this.update());
        watch(()=>this.p_card, ()=>this.update());
        watch(()=>this.p_badge, ()=>this.update());
        this.update();
    },
    methods: {
        async update() {
            const {uuid} = this;
            const user = await $core.user.get(uuid);
            if(!user) return;
            const {username, guest, badge, card} = user;
            if(this.p_card == null) this.card = ''
            else this.card = this.p_card||card;
            if(this.p_badge == null) this.badge = ''
            else this.badge = this.p_badge||badge;
            this.username = username;
            this.guest = !!guest;
        }
    }
});
</script>

<style lang="scss" scoped>

.usercard {
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    span.username {
        text-shadow: 0 0 4px rgba(0,0,0,0.5);
        text-align: center;
        position: relative;
        display: inline-block;
        > .badge { margin-right: 4px; }
    }
}

</style>