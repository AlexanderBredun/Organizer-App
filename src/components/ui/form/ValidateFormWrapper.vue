<template>
    <Form action="#" @submit="$emit('submitHandler', $event)">
        <slot></slot>
    </Form>
</template>

<script>
    import { Form } from 'vee-validate';
    export default {
        name: "ValidateFormWrapper",
        emits:['submitHandler'],
        components: {
            Form
        }
    }
</script>

<style scoped>

</style>
