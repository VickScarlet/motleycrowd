<script setup>
import { ref, watch } from 'vue';
import Card from './Card.vue';
import Badge from './Badge.vue';

const props = defineProps({
    uuid: {type: String, required: true},
    p_card: {type: String, default: ''},
    p_badge: {type: String, default: ''},
});

const card = ref('');
const badge = ref('');
const username = ref('');
const guest = ref(false);
const update = async()=>{
    const uuid = props.uuid;
    const user = await $core.user.get(uuid);
    if(!user) return;
    console.debug(user);
    if(props.p_card == null) card.value = ''
    else card.value = props.p_card || user.card;
    if(props.p_badge == null) badge.value = ''
    else badge.value = props.p_badge || user.badge;
    username.value = user.username;
    guest.value = !!user.guest;
}
watch(()=>props.uuid, update);
watch(()=>props.p_card, update);
watch(()=>props.p_badge, update);
update();
</script>

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