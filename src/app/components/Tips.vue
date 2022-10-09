<template>
    <div class="tips">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
div.tips {
    position: fixed;
    background: var(--tips-background);
    max-width: 90%;
    min-width: 12em;
    display: block;
    top: 0;
    left: 50%;
    z-index: 9999999;
    transform: translate(-50%, 100%);
    animation: tips-show 200ms ease-out;
    padding: 0.5em 2em;
    border-radius: 2em;
    box-shadow: 0 4px 16px -2px #000;
}

@keyframes tips-show {
    0% {
        transform: translate(-50%, -100%);
    }

    100% {
        transform: translate(-50%, 100%);
    }
}

</style>