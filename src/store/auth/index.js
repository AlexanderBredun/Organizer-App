
import Firebase from '@/services/firebaseInit.js'
const firebase = new Firebase();


const state = {
    user: null
};
const mutations = {
    SET_USER: (state, {userData})=> state.user = {...userData},
    LOGOUT_USER: (state)=> state.user = null
};

const actions = {

    async REGISTER_USER(_, {email, password, login}){
        await firebase.register(email, password, login)

    },

    async LOGIN_USER({commit}, {email, password}){
        await firebase.login(email, password)
            .then(async (data) =>  {
                await firebase.getParticipationEvent(data.id)
                    .then((res)=> {
                        commit('SET_USER', {userData: {...data, ...res}})
                    })
            })


    },
    async CHANGE_PARTICIPATION_EVENT({state, commit},{eventID, sign}) {
        await firebase[`${sign}ParticipationEvent`](state.user.id, eventID)
            .then(()=> {
                firebase.getParticipationEvent(state.user.id)
                    .then((res)=> {
                        commit('SET_USER', {userData: {...state.user, ...res}})
                    })
            })
    }

};
const getters = {



};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}