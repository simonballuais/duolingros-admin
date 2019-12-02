import Vue from 'vue'
import Vuex from 'vuex'

import {security} from './security'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        security,
    }
})
