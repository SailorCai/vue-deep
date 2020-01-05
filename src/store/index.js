import Vuex from 'vuex';
import Vue from 'vue';
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    // namespaced: true,
    modules: {user},
    state: {
        // name: 'Sailor',
    },
    mutations: {
        increment (state, str) {
            state.name += str;
        }
    }
});