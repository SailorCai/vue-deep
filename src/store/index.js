/*
 * @Author: SailorCai
 * @Date: 2019-12-19 07:24:45
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 23:13:23
 * @FilePath: /vue-deep/src/store/index.js
 */
import Vuex from '@/kVuex';
import Vue from 'vue';
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    // namespaced: true,
    modules: {user},
    state: {
        // name: 'Sailor',
        count: 1,
    },
    mutations: {
        increment (state, num = 1) {
            state.count += num;
        }
    },
    actions: {
        add({commit}) {
            setTimeout(() => {
                commit('increment', 5);
            }, 2000);
        },
    },
});