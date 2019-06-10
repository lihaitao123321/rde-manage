import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login/login.vue'
import register from './views/login/register.vue'
import selectCompany from './views/login/selectCompany.vue'

Vue.use(Router)

export default new Router({
    routes: [
        //项目默认路由
        {
            path: '/',
            redirect: to => {
                return '/login';
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/selectCompany',
            name: 'selectCompany',
            component: selectCompany
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        }
    ]
})
