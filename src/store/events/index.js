import { createEmptyEvent, createEmptyProgrammStep} from '@/services/testApi.js'
import Firebase from '@/services/firebaseInit.js'
const firebase = new Firebase();


const state = {
    events: [],
    creatingEvent: null,
    editingEvent: null,
    filter: 'all',
    searchFilter: '',
    eventsLoaded: false
};
const mutations = {
    SET_EVENTS: (state, {payload})=> state.events = payload,

    SET_FILTER: (state, {payload})=> state.filter = payload,

    SET_SEARCH_FILTER: (state, {payload})=> state.searchFilter = payload,

    SET_EVENTS_LOADED: (state, {payload})=> state.eventsLoaded = payload,


    SET_UP_CREATING_EVENT: (state)=> {
        state.creatingEvent = createEmptyEvent()
    },

    ADD_CREATING_EVENT_TO_EVENTS: (state)=> {
        state.events.push(state.creatingEvent);
    },

    ADD_EDITING_EVENT_TO_EVENTS: (state)=> {
        state.events = state.events.map(el => el.id === state.editingEvent.id ? {...state.editingEvent} : el)
    },

    CLEAR_CREATING_EVENT: (state)=> state.creatingEvent = null,

    CLEAR_EDITING_EVENT: (state)=> state.editingEvent = null,

    SET_UP_EDITING_EVENT: (state, {event}) => state.editingEvent = event,

    UPDATE_FIELD: (state, {target, field, value})=> {
        state[target][field] = value;
    },

    DELETE_STEP: (state, {target, stepID})=> {
        console.log(stepID);
        state[target].programm = state[target].programm.filter(el => el.id !== stepID)
    },

    ADD_PROGRAMM: (state, {target})=> {
        state[target].programm.push(createEmptyProgrammStep())
    },

    UPDATE_PROGRAMM: (state, {target, stepUpd})=> state[target].programm = state[target].programm.map(el => {

        if(el.id === stepUpd.id){
            return {
                ...el,
                ...stepUpd
            }
        }
        return el;
    }),

    DELETE_PROGRAMM: (state, {target, id})=> state[target].programm = state[target].programm.filter(el => el.id !== id),



};

const actions = {
    async FETCH_EVENTS({commit}){
       // await fetchAllTestApi()
       //     .then(data => commit('SET_EVENTS', {payload: data}))

        await firebase.getAllEvents()
            .then(res => commit('SET_EVENTS', {payload: res}))

        commit('SET_EVENTS_LOADED', {payload: true})
    },
    async ADD_EVENT({state, commit}, {eventName, type}){
        if(!state[eventName].img || state[eventName].img.match(/images/gm)){
            await firebase.addEvent(state[eventName], type)
        }
        else{

            const imgName = `${state[eventName].name}.${state[eventName].id}`;

            await firebase.addImageToStorage(state[eventName].img, imgName)
                .then((imgLink)=>  {
                    commit('UPDATE_FIELD',{target: eventName, field: 'img', value: imgLink})
                })

            await firebase.addEvent(state[eventName], type)


        }
    },
    async FETCH_EDITING_EVENT({commit}, {eventID}){
        await firebase.getEventByID(eventID)
            .then(res => commit('SET_UP_EDITING_EVENT', {event: res[0]}))
    },
    async FETCH_OPENED_EVENT(_, {eventID}){
        return await firebase.getEventByID(eventID)
            .then(res => res)
    },
    async DELETE_EVENT(_, {eventID}){
        await firebase.deleteEvent(eventID)

    },
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