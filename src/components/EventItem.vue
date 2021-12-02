<template>
    <router-link :to="{ name: 'Event', params: { id: event.id}}" >
        <div class="flex justify-between bg-gray-50 shadow-lg rounded-2xl mb-5 relative overflow-hidden">
            <div class="flex items-center justify-center w-2/4 relative bg-img " :style="{backgroundImage: event.img ? 'url(' + event.img + ')' : null}">
                <div class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-40 rounded-2xl rounded-r-none z-0"></div>
                <p class="text-white relative z-10 text-3xl">
                    {{event.name}}
                </p>
            </div>
            <div class="w-2/4 py-12 px-8 border-l-4 border-red-400 ">
                <template v-if="user">
                    <div v-if="user?.login === event.organizer" class="absolute px-2 py-1 top-0 right-0 text-white bg-purple-500 bg-opacity-50">
                        <p>
                            Организую
                        </p>
                    </div>
                    <div v-else-if="isInParticipation" class="absolute px-2 py-1 top-0 right-0 text-white bg-green-500 bg-opacity-50">
                        <p>
                            Учавствую
                        </p>
                    </div>
                </template>

                <EventBaseInfo
                        :data="[
                        {
                            className: 'fa-user',
                            value: event.organizer || 'default'
                        },
                        {
                            className: 'fa-compass',
                            value: event.location
                        },
                        {
                            className: 'fa-calendar',
                            value: reformatedDateTime
                        }]"
                ></EventBaseInfo>
            </div>
        </div>
    </router-link>
</template>

<script>
    import EventBaseInfo from './EventBaseInfo'

    export default {
        name: "EventItem",
        props: {
            event: Object,
            user: Object
        },
        components: {
            EventBaseInfo
        },
        computed: {
            reformatedDateTime(){
                return new Date(this.$props.event.date).toLocaleDateString()
            },
            isInParticipation(){
                return this.$props.user?.participationEvents.includes(this.event.id)
            }

        }
    }
</script>

<style lang="scss" scoped>

    .bg-img{
        background: var(--var-default-img) center center / cover no-repeat;
    }

</style>