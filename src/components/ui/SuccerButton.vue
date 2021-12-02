<template>
    <AppButton class="bg-green-500 hover:bg-green-700 w-fit py-2 px-6 text-white w-64 block">
        <slot></slot>
    </AppButton>
</template>

<script>
    import AppButton from './AppButton'

    export default {
        name: "SuccerButton",
        components: {
            AppButton
        }
    }
</script>

<style scoped>

</style>