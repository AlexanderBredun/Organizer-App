<template>
    <WrapperView :maxWidth="'1400'" >
        <LayoutContentAnd404 :condition="editingEvent"
                             :loading="loadingEvent"
        >
            <h2 class="text-2xl font-bold mb-5">
               Изменение события
            </h2>
            <EventForm
                    @submitForm="submitHandler"
                    @cancelForm="dismissCreating"
                    @updateField="formFieldUpdate"
                    @updateProgrammField="programmFieldUpdate"
                    @addProgrammStep="addProggramStep"
                    @deleteProgrammStep="deleteProgrammStep"
                    :activeEvent="editingEvent"
                    submitText="Сохранить"
            ></EventForm>
        </LayoutContentAnd404>
    </WrapperView>
</template>

<script>
    import EventForm from '../components/ui/form/EventForm'
    import WrapperView from '../components/WrapperView'
    import LayoutContentAnd404 from '../layouts/LayoutContentAnd404'

    import { mapState } from 'vuex';

    export default {
        name: "EditEvent",
        components: {
            EventForm,
            WrapperView,
            LayoutContentAnd404
        },
        props:['id'],
        created(){
            if(!this.editingEvent){
                this.$store.dispatch('events/FETCH_EDITING_EVENT', {eventID: this.$route.params.id})
                    .then(()=> this.loadingEvent = false)
                    .catch(()=> {
                        this.loadingEvent = false;
                        this.$toast.error('Что-то пошло не так( Попробуйте позже')
                    })
            }
        },
        data(){
          return {
              loadingEvent: true
          }
        },
        computed:{
            ...mapState({
                editingEvent: state => state.events.editingEvent,
            }),
           
        },
        methods:{

            submitHandler(){
                this.$store.dispatch('events/ADD_EVENT', {eventName: 'editingEvent', type: 'change'})
                    .then(()=> {
                        this.$router.push({name: 'Event', params: {id: this.$store.state.events.editingEvent.id}});
                        this.$store.commit('events/CLEAR_EDITING_EVENT');
                        this.$toast.success('Событие изменено!');
                    });

            },
            dismissCreating(){
                this.$store.commit('events/CLEAR_EDITING_EVENT');
                this.$router.push('/');
            },
            addProggramStep(){
                this.$store.commit('events/ADD_PROGRAMM', {target: 'editingEvent'})
            },
            programmFieldUpdate(el){
                this.$store.commit('events/UPDATE_PROGRAMM', {target: 'editingEvent', stepUpd: el})
            },
            formFieldUpdate(el){
                this.$store.commit('events/UPDATE_FIELD', {target: 'editingEvent', ...el})
            },
            deleteProgrammStep(id){
                this.$store.commit('events/DELETE_STEP', {target: 'editingEvent', stepID: id})
            },
        }

    }
</script>

<style scoped>

</style>