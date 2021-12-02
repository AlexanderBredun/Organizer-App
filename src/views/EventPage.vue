<template>

    <WrapperView :maxWidth="'1400'" >

        <LayoutContentAnd404 :condition="currentEvent"
                             :loading="loadingEvent"
        >
            <div class="flex items-center justify-center  relative bg-img h-96 p-2 mb-16" :style="{backgroundImage: currentEvent.img ? 'url(' + currentEvent.img + ')' : null}">
                <div class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-40  rounded-r-none z-0"></div>
                <p class="text-white relative z-10 text-6xl font-bold">
                    {{currentEvent.name}}
                </p>
            </div>
            <div class="flex space-between">
                <div class="w-full">
                    <ul class="flex list-tabs mb-8">
                        <li v-for="tab in tabs"
                            :key = "tab.id"
                            @click="activeTab = tab.id"
                            class="mr-4 pb-2 " :class="{active: activeTab === tab.id}">
                            <p>
                                {{tab.title}}
                            </p>
                        </li>

                    </ul>
                    <div class="w-4/5">
                        <component :is="activeTab" :event="currentEvent"></component>
                    </div>
                </div>
                <EventBaseInfo
                        class="w-1/5"
                        :data="[
                        {
                            className: 'fa-user',
                            value: currentEvent.organizer
                        },
                        {
                            className: 'fa-compass',
                            value: currentEvent.location
                        },
                        {
                            className: 'fa-calendar',
                            value: reformatedDateTime
                        }]"
                ></EventBaseInfo>
                <div v-if="currentEvent.organizer === user?.login" class="sticky h-full top-4 w-1/4">
                    <DangerButton @click.prevent="deleteEvent">
                        Удалить
                    </DangerButton>
                    <SuccerButton
                            class="text-center"
                            tag="router-link"
                            :to="{ name: 'EventEdit', params: {id}}"
                    >
                        Изменить
                    </SuccerButton>
                </div>
                <div v-if="user && currentEvent.organizer !== user.login" class="sticky h-full top-4 w-1/4">
                    <AppButton
                            v-if="!isInParticipation"
                            @click.prevent="addParticipationEvent"
                            defaultBtn
                            class="text-center"
                    >
                        Принять участие
                    </AppButton>
                    <AppButton
                            v-else
                            @click.prevent="removeParticipationEvent"
                            defaultBtn
                            class="text-center"
                    >
                        Отменить участие
                    </AppButton>
                </div>
            </div>

        </LayoutContentAnd404>
    </WrapperView>
</template>

<script>

    import {mapState} from 'vuex'
    import LayoutContentAnd404 from '../layouts/LayoutContentAnd404'
    import WrapperView from '../components/WrapperView'
    import EventBaseInfo from '../components/EventBaseInfo'
    import ProgrammTab from '../components/ProgrammTab'
    import DescriptionTab from '../components/DescriptionTab'
    import DangerButton from '../components/ui/DangerButton'
    import SuccerButton from '../components/ui/SuccerButton'
    import AppButton from '../components/ui/AppButton'


    export default {
        name: "EventPage",

        props: {
            id: String
        },
        components: {
            LayoutContentAnd404,
            WrapperView,
            EventBaseInfo,
            ProgrammTab,
            DescriptionTab,
            DangerButton,
            SuccerButton,
            AppButton
        },
        data(){
            return {
                currentEvent: null,
                tabs: [
                    {title: 'Описание', id: 'DescriptionTab'},
                    {title: 'Программа', id: 'ProgrammTab'}
                    ],
                activeTab: 'DescriptionTab',
                loadingEvent: true
            }
        },
        created(){
            console.log(1);
            this.getCurrentEvent(this.$props.id)
        },

        methods: {
            getCurrentEvent(id){
                this.loadingEvent = true;
                this.$store.dispatch('events/FETCH_OPENED_EVENT', {eventID: id})
                    .then(res => {
                        this.loadingEvent = false;
                        this.currentEvent = res[0];
                        document.title = this.currentEvent.name;
                    })
                    .catch(() => {
                        this.$toast.error('Что-то пошло не так. Попробуйте позже');
                        this.loadingEvent = false;
                    })
            },
            deleteEvent(){
                if(confirm('Вы уверены?')){
                    this.$store.dispatch('events/DELETE_EVENT', {eventID: this.$props.id});
                    this.$router.push({name: 'Home'});
                    this.$toast.success('Событие успешно удалено!')
                }
            },
            addParticipationEvent(){
                this.$store.dispatch('auth/CHANGE_PARTICIPATION_EVENT', {eventID: this.$props.id, sign: 'add'})
                    .then(()=> this.$toast.success('Теперь вы учавствуете в этом событии!'))
                    .catch(()=> this.$toast.error('Что-то пошло не так('))
            },
            removeParticipationEvent(){
                this.$store.dispatch('auth/CHANGE_PARTICIPATION_EVENT', {eventID: this.$props.id, sign: 'remove'})
                    .then(()=> this.$toast.warning('Вы больше не учавствуете в этом событии!'))
                    .catch(()=> this.$toast.error('Что-то пошло не так('))
            }
        },
        computed:{
            ...mapState({
                events: state => state.events.events,
                user: state => state.auth.user,
            }),
            reformatedDateTime(){
                return new Date(this.currentEvent.date).toLocaleDateString();
            },
            isInParticipation(){
                return this.user.participationEvents.includes(this.currentEvent.id)
            },

        },

    }
</script>

<style lang="scss" scoped>
    .bg-img{
        background: var(--var-default-img) center center / cover no-repeat;
    }
    .list-tabs{
        li{cursor: pointer}
        li:hover{
            border-bottom: 4px solid yellowgreen;
        }
    }
    .active{
        border-bottom: 4px solid yellowgreen;
    }
</style>