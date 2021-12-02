<template>
    <p>
        {{event.description}}
    </p>
</template>

<script>
    export default {
        name: "DescriptionTab",
        props: {
            event: Object
        }
    }
</script>

<style scoped>

</style>