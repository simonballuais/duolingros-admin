import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'

let router = new VueRouter({
    routes: [
        {name: 'login', path: '/login', component: Login},
        {path: '/', component: Home},
        {name: 'lessons', path: '/lessons', component: Home},
        {name: 'lesson', path: '/lessons/:id', component: Home, props: true},
    ],
})

export default router;
