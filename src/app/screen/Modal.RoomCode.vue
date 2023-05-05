<script setup>
import { ref } from 'vue';
const code = ref('');
const emit = defineEmits(['create', 'join', 'cancel']);
</script>

<template>
    <div class="modal" @click="()=>emit('cancel')">
        <div class="modal-roomcode" @click="e=>e.stopPropagation()">
            <div class="create">
                <button @click="()=>emit('create', 10)">建十人房</button>
                <button @click="()=>emit('create', 100)">建百人房</button>
            </div>
            <hr />
            <div class="join">
                <input type="text"
                    :placeholder="$lang.g.input_roomcode"
                    v-model.trim="code"
                />
                <button @click="()=>emit('join', code)">进入房间</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    > .modal-roomcode {
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline-block;
        width: 260px;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        text-align: center;
        > div { margin: 10px; }
        button {
            width: 100%;
            height: 50px;
            font-size: 20px;
            text-align: center;
            margin: 0;
            padding: 0;
            border: none;
            border-radius: 4px;
            background: #1055b6;
            box-shadow: #000000 0 0 10px;
        }
        > .create > button:last-child { margin-top: 10px; }
        > .join {
            > input {
                width: 100%;
                height: 50px;
                border: none;
                margin: 0;
                border-radius: 10px 10px 0 0;
                font-size: 36px;
                text-align: center;
                padding: 0;
                font-family: consolas, 'Courier New', Courier, monospace;
                background: #000000;
                box-shadow: inset #1055b6 0 0 0 1px;
                border-radius: 4px 4px 0 0;
            }
            > button {
                box-shadow: none;
                border-radius: 0 0 4px 4px;
            }
            border-radius: 4px;
            box-shadow: #000000 0 0 10px;
            margin: 10px;
        }
    }
}
</style>