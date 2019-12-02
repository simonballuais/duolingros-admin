import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import {store} from './store'

import './base.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuex)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
