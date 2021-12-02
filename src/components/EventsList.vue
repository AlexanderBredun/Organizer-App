<template>
    <div class="w-full">
        <EventItem
                v-for="event in events"
                :key="event.id"
                :event="event"
                :user="user"
        ></EventItem>
    </div>

</template>

<script>
    import EventItem from './EventItem'
    export default {
        name: "EventsList",
        props: {
          events: Array,
            user: Object
        },
        components: {
            EventItem
        }
    }
</script>

<style scoped>

</style>