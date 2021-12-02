import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import events from './events'
import auth from './auth'


export default createStore({
  plugins: [createPersistedState({
    paths: ['events.creatingEvent', 'auth.user']
  })],

  modules: {
    events,
    auth
  }
})
