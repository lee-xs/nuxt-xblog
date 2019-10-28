import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isPhone: false
    },
    mutations:{
        SET_ISPHONE: (state, isPhone) => {
            state.isPhone = isPhone
        }
    },
    modules: {

    },
    getters
})