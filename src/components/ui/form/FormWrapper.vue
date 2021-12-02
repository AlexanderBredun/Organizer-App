<template>
    <form action="#" @submit="$emit('submitHandler', $event)">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: "FormWrapper",
        emits:['submitHandler'],
    }
</script>

<style scoped>

</style>