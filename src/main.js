import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import TransitionPlugin from 'bootstrap-vue'

import App from './App'
import router from './router'
import {store} from './store'

import './base.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(TransitionPlugin)
Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
