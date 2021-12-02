<template>
    <ul class="text-left list-details">
        <li
                v-for="(el, i) of data"
                :key="i"
                class="relative pl-8 mb-3">
            <i class="absolute left-0 top-1 fas" :class="el.className"></i>
            <p>
                {{el.value}}
            </p>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "EventBaseInfo",
        props: {
            data: Array
        },

    }
</script>

<style lang="scss">
    .list-details{
        li{
            &:last-child{
                margin: 0 ;
            }
        }
    }
</style>