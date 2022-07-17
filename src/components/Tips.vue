<template>
    <div class="tips">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.tips {
    position: fixed;
    background: var(--tips-background);
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.6;
    z-index: 9999999;
    box-shadow: 0 4px 16px -2px #000;
}

</style>