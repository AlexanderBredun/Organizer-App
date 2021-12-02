<template>
    <WrapperView :maxWidth="'1400'" v-if="creatingEvent">
        <h2 class="text-2xl font-bold mb-5">
            Создание митапа
        </h2>
        <EventForm
                @submitForm="submitHandler"
                @cancelForm="dismissCreating"
                @updateField="formFieldUpdate"
                @updateProgrammField="programmFieldUpdate"
                @addProgrammStep="addProggramStep"
                @deleteProgrammStep="deleteProgrammStep"
                :activeEvent="creatingEvent"
                submitText="Создать"
        ></EventForm>
    </WrapperView>
    <p v-else>
        Fukci t
    </p>

</template>

<script>
    import EventForm from '../components/ui/form/EventForm'
    import WrapperView from '../components/WrapperView'

    import { mapState } from 'vuex';



    export default {
        name: "CreateEvent",
        components: {
            EventForm,
            WrapperView,
        },

        created(){
            if(!this.creatingEvent){
                this.$store.commit('events/SET_UP_CREATING_EVENT')
            }
        },
        computed:{
            ...mapState({
                creatingEvent: state => state.events.creatingEvent,
            }),
        },
        methods:{

            submitHandler(){

                this.$store.dispatch('events/ADD_EVENT', {eventName: 'creatingEvent', type: 'add'})
                    .then(()=> {
                        this.$router.push(
                            {name: 'Event', params: {id: this.$store.state.events.creatingEvent.id}}
                        );
                        this.$store.commit('events/CLEAR_CREATING_EVENT');
                        this.$toast.success('Событие добавлено!');
                    })


            },
            dismissCreating(){
                this.$store.commit('events/CLEAR_CREATING_EVENT');
                this.$router.push('/');
            },
            addProggramStep(){
                this.$store.commit('events/ADD_PROGRAMM', {target: 'creatingEvent',})
            },
            programmFieldUpdate(el){
                this.$store.commit('events/UPDATE_PROGRAMM', {target: 'creatingEvent', stepUpd: el})
            },
            formFieldUpdate(el){
                this.$store.commit('events/UPDATE_FIELD', {target: 'creatingEvent', ...el})
            },

            deleteProgrammStep(id){
                this.$store.commit('events/DELETE_STEP', {target: 'creatingEvent', stepID: id})
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>