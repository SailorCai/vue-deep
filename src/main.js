import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import create from '@/utils/extend.js'

Vue.config.productionTip = false

Vue.prototype.$create = create;
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
