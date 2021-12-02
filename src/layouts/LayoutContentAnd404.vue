<template>
        <slot v-if="condition"></slot>
        <Spinner v-else-if="loading && !condition"></Spinner>
        <h1 v-else>
            Cant find page
        </h1>
</template>

<script>
    import Spinner from '@/components/Spinner'
    export default {
        name: "LayoutContentAnd404",
        props: ['condition', 'loading'],
        components: {
            Spinner
        }
    }
</script>

<style scoped>

</style>