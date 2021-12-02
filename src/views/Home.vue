<template>

  <WrapperView>
    <LayoutContentAnd404 :condition="events.length"
                         :loading="loadingEvents"
    >
      <div class="my-5 flex space-between items-center">
        <div class="w-1/2 flex">
          <AppButton
                  class="mr-4 text-blue-400 "
                  v-for="(f, i) in filterButtons"
                  :key="i"
                  bordered
                  :isActive="f.value === querys.date"
                  @click="changedQueryOther('date', f.value)"
          >
            {{f.name}}
          </AppButton>
        </div>
        <InputIconField v-model="querys.search" @input="changedQuery"></InputIconField>
        <div class="ml-4 flex  text-blue-400 ">
          <button
                  @click.prevent="changedQueryOther('view', '')"
                  class="border-r-2 border-blue-400 px-4 py-2 rounded-l-lg border-2 border-blue-400 transition-all duration-500 hover:bg-blue-700 hover:text-white "
                  :class="[!isCalendarMode ? 'bg-blue-700 text-white' : null]"
            >
            <i class="fas fa-list fa-lg"></i>
          </button>
          <button
                  @click.prevent="changedQueryOther('view', 'calendar')"
                  class="px-4 py-2 transition-all rounded-r-lg border-2 border-blue-400 border-l-0 transition-all duration-500 hover:bg-blue-700 hover:text-white"
                  :class="[isCalendarMode ? 'bg-blue-700 text-white' : null]"
          >

            <i class="far fa-calendar-alt fa-lg"></i>
          </button>
        </div>
      </div>
      <EventsList
              v-if="filteredEvents.length && !isCalendarMode"
              :events="filteredEvents"
              :user="user"
      ></EventsList>
      <Calendar v-else-if="isCalendarMode" :events="filteredEvents" ></Calendar>
      <p v-else class="text-center my-8">
        Тут ничего нет ((
      </p>

    </LayoutContentAnd404>
  </WrapperView>
</template>

<script>
// @ is an alias to /src
import WrapperView from '../components/WrapperView'
import EventsList from '../components/EventsList'
import AppButton from '../components/ui/AppButton'
import InputIconField from '../components/ui/InputIconField'
import Calendar from '../components/Calendar'
import LayoutContentAnd404 from '@/layouts/LayoutContentAnd404'

import {mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
    WrapperView,
    EventsList,
    AppButton,
    InputIconField,
    LayoutContentAnd404,
    Calendar
  },
  data(){
    return {
      loadingEvents: true,
      searchFilter: '',
      querys: {
        search: this.$route.query?.search || '',
        date: this.$route.query?.date || 'all',
        participation: this.$route.query?.participation || '',
        view: this.$route.query?.view || '',
      },
      filterButtons: [
        {
          name: 'Все',
          value: 'all',
        },
        {
          name: 'Прошедшие',
          value: 'past'
        },
        {
          name: 'Будущие',
          value: 'future'
        }
      ]
    }
  },
  created(){
    this.loadingEvents = true;
    this.$store.dispatch('events/FETCH_EVENTS')
              .then(() => {
                this.loadingEvents = false;
              })
              .catch((e) => {
                this.loadingEvents = false;
                this.$toast.error(e.message);
              })
  },
  watch:{
    '$route.query': {
      immediate: true,
      handler(val){
        this.querys = {
          search: val?.search || '',
          date: val?.date || 'all',
          participation: val?.participation || '',
          view: val?.view || '',
        }
      }
    }
  },
  methods: {
    changedQuery(){
      this.$router.replace({
        query: {
          ...Object.fromEntries(Object.entries(this.querys).filter(([, value]) => value !== '')),
        },
      });
    },
    changedQueryOther(query, val){
     this.querys[query] = val;
      this.changedQuery();
    }
  },
  computed: {
    ...mapState({
      events: state => state.events.events,
      filter: state => state.events.filter,
      user: state => state.auth.user,
    }),

    isCalendarMode(){
      return this.$route.query.view === 'calendar';
    },

    filteredEvents(){

      const dateNow = new Date();
      let filteredEvents = this.events;


      if(this.querys.date === 'past'){
        filteredEvents = filteredEvents.filter(el => new Date(el.date) - dateNow < 0)
      }
      else if(this.querys.date === 'future'){
        filteredEvents = filteredEvents.filter(el => new Date(el.date) - dateNow > 0)
      }

      if(this.querys.search){
        filteredEvents = filteredEvents.filter(el => el.name.toLowerCase().includes(this.querys.search.toLowerCase()))
      }
      if(this.user){
        if(this.querys.participation === 'organizing'){
          filteredEvents = filteredEvents.filter(el => el.organizer === this.user.login)
        }
        else if(this.querys.participation === 'attending'){
          filteredEvents = filteredEvents.filter(el => this.user.participationEvents.includes(el.id))
        }
      }
      return filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }
}
</script>
