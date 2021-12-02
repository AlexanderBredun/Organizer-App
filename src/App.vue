<template>
  <div class="my-3 px-2 ">
    <header id="header" class="text-center mb-16 border-b-2 border-gray-700 shadow-xl p-2" >
      <strong class="logo ">
        <router-link to="/" class="text-4xl">
          VueOrganizer
        </router-link>
      </strong>

      <nav id="nav" class="mt-5">
        <ul class="flex justify-center">
          <li class="mr-2 "><router-link to="/create-event" class="text-gray-500">Создать событие</router-link></li>
          <li class="mr-2 " v-if="user"><router-link :to="{name: 'Home', query: {participation: 'attending'}}">Мои события</router-link></li>
          <li class="mr-2 " v-if="user"><router-link :to="{name: 'Home', query: {participation: 'organizing'}}">Организуемые события</router-link></li>
          <li v-if="!user" class="mr-2"> <router-link to="/login" class="text-gray-500">Войти</router-link></li>
          <li v-if="!user"><router-link to="/register" class="text-gray-500">Зарегистрироваться</router-link></li>
          <li class="ml-2" v-if="user"><a href="#" @click.prevent = 'logout'>Пользователь: {{user.login}}(Выйти)</a></li>
        </ul>
      </nav>
    </header>
    <router-view  v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!--<template v-if="$store.state.events.eventsLoaded && !loading">-->
      <!--<router-view />-->
    <!--</template>-->

    <!--<p v-else-if="!loading && !events.length">-->
      <!--Nothing to show-->
    <!--</p>-->
    <!--<Spinner v-if="loading"></Spinner>-->
  </div>
</template>

<script>
  // @ is an alias to /src

  //import Spinner from './components/Spinner'

  import {mapState} from 'vuex'

  export default {
    name: 'Home',
    components: {
      //Spinner,
    },
    // data(){
    //   return {
    //     loading: true,
    //   }
    // },
    // created(){
    //   this.$store.dispatch('events/FETCH_EVENTS')
    //           .then(() => this.loading = false)
    //           .catch((e) => {
    //             this.loading = false;
    //             this.$toast.error(e.message);
    //           })
    // },
    methods: {
      logout(){
        this.$store.commit('auth/LOGOUT_USER');
        this.$store.commit('events/CLEAR_CREATING_EVENT');
        this.$router.go()
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Vue Oranizer';
        }
      },
    },
    computed: {
      ...mapState({
        events: state => state.events.events,
        user: state => state.auth.user,
      })
    }
  }
</script>

<style lang="scss" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;

  --var-default-img: url(https://course-vue.javascript.ru/images/undraw_conference_speaker_6nt7.svg);
}
.fade-enter-active, .fade-leave-active{
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active{
  opacity: 0;
}

</style>
