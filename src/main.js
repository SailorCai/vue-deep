/*
 * @Author: SailorCai
 * @Date: 2019-09-15 12:24:14
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 17:23:20
 * @FilePath: /vue-deep/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import create from '@/utils/extend.js'
import router from '@/router'


Vue.config.productionTip = false

Vue.prototype.$create = create;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
