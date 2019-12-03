import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'

let router = new VueRouter({
    routes: [
        {path: '/login', component: Login},
        {path: '/', component: Home},
    ],
})

export default router;
