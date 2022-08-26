<template>
    <div id="confirm">
        <div class="content">
            <div>
                <slot></slot>
            </div>
            <div>
                <button class="yes" @click="$emit('yes')">是</button>
                <button class="no" @click="$emit('no')">否</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#confirm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000090;
}

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(138deg, #2d144e, #0c164b);
    border-radius: 8px;
    box-shadow: 0 0 16px #000000;
    > div {
        &:first-child {
            padding: 10px;
            min-height: 180px;
        }
        &:last-child {
            display: flex;
            >button {
                width: 50%;
                margin: 5px;
                border: none;
                height: 30px;
                border-radius: 5em;
                color: white;
                opacity: 0.8;
                &.yes { background: #ffe10099; }
                &.no  { background: #00b7ff99; }
                &:hover { opacity: 1;}
            }
        }
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.2;
        background: linear-gradient(240deg, #1aff0087, #ffcc0038);
        z-index: -1;
        border-radius: 8px;
    }
}

</style>