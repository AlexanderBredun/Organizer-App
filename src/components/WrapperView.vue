<template>
    <div class="max-w-screen-md w-full my-0 mx-auto" :style="{maxWidth: maxWidth + 'px'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "WrapperView",
        props:['maxWidth']
    }
</script>

<style scoped>

</style>