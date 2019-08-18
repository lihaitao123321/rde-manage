import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login/login.vue'
import register from './views/login/register.vue'
import registerOk from './views/login/registerOk.vue'
import selectCompany from './views/login/selectCompany.vue'
import index3 from './views/index3/index3.vue'
import searchBaoJing from './views/index3/searchBaoJing.vue'
import changePassword from './views/index5/changePassword.vue'
import message from './views/index5/message.vue'
import language from './views/index5/language.vue'
import personal from './views/index5/personal.vue'
import nickname from './views/index5/nickname.vue'
import address from './views/index5/address.vue'
import search from './views/index1/search.vue'
import region from './views/index5/region.vue'
import version from './views/index5/version.vue'
import notice from './views/index1/noticeCenter.vue'
import retrievePw from './views/login/RetrievePw'
import startPage from './views/login/startPage'

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
            path: '/registerOk',
            name: 'registerOk',
            component: registerOk
        },
        {
            path: '/startPage',
            name: 'startPage',
            component: startPage
        },
        {
            path: '/retrievePw',
            name: 'retrievePw',
            component: retrievePw
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
        },
        {
            path: '/index3',
            name: 'index3',
            component: index3
        },
        {
            path: '/searchBaoJing',
            name: 'searchBaoJing',
            component: searchBaoJing
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component: changePassword
        },
        {
            path: '/message',
            name: 'message',
            component: message
        },
        {
            path: '/language',
            name: 'language',
            component: language
        },
        {
            path: '/personal',
            name: 'personal',
            component: personal
        },
        {
            path: '/nickname',
            name: 'nickname',
            component: nickname
        },
        {
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/region',
            name: 'region',
            component: region
        },
        {
            path: '/version',
            name: 'version',
            component: version
        },
        {
            path: '/notice',
            name: 'notice',
            component: notice
        },
    ]
})
