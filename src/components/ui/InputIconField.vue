<template>
    <div class="w-1/2 ml-4 relative">
        <input type="search"
               @input="$emit('update:modelValue', $event.target.value)"
               :value="modelValue"
               class="input w-full h-12 border-2 border-blue-400 p-2 pl-10 rounded-2xl">
        <i class="absolute left-2 top-1/2 transform-gpu -translate-y-2/4 fas fa-search text-blue-400"></i>
    </div>
</template>

<script>
    export default {
        name: "InputIconField",
        props: {
            modelValue: String
        },
        emits: ['update:modelValue'],
    }
</script>

<style lang="scss" scoped>
    .input{
        &:focus{
            outline: none;
            border-color:blue;
            & + i{
                color: blue;
            }
        }
    }
</style>