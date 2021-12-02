<template>
    <AppButton class="bg-red-500 hover:bg-red-700 w-fit py-2 px-2 text-white w-64 block mb-4">
        <slot></slot>
    </AppButton>
</template>

<script>
    import AppButton from './AppButton'

    export default {
        name: "DangerButton",
        components: {
            AppButton
        }
    }
</script>

<style scoped>

</style>