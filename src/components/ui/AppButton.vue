<template>
    <component
            :is="tag"
            class="text-xl "
            :class="[defaultBtn ? 'bg-blue-500 hover:bg-blue-700 w-fit py-2 px-2 text-white w-64 block mb-4' : null, {active: isActive}]"
    >
        <slot></slot>
    </component>
</template>

<script>
    export default {
        name: "AppButton",
        props: {
            isActive: {
                type: Boolean,
                default: false
            },
            defaultBtn: {
                type: Boolean
            },
            tag: {
                type: String,
                default: 'button',
                validate: (tag)=> ['button', 'a', 'router-link'].includes(tag)

            }
        },
        emits:['action']
    }
</script>

<style lang="scss" scoped>
    .active{
        border: 2px solid blue;
        border-radius: 20px;
        padding: 10px 20px;
        color: blue;
    }
</style>