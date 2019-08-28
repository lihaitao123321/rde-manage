import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login/login.vue'
import register from './views/login/register.vue'
import registerOk from './views/login/registerOk.vue'
import selectCompany from './views/login/selectCompany.vue'
import index2 from './views/index2/index2.vue'
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
import projectNumber from './views/index1/projectNumber.vue'
import baojingbaobiao from './views/index1/baojingbaobiao.vue'
import jiankongbaobiao from './views/index1/jiankongbaobiao.vue'
import shiyonggonglvbaobiao from './views/index1/shiyonggonglvbaobiao.vue'
import fadianbaobiao from './views/index1/fadianbaobiao.vue'
import shishinengyuanbaobiao from './views/index1/shishinengyuanbaobiao.vue'
import retrievePw from './views/login/RetrievePw'
import startPage from './views/login/startPage'
import aboutUs from './views/index5/aboutUs.vue'
import searchMap from './views/index2/searchMap.vue'
import baoJingSearch from './views/index3/baoJingSearch';
import caoZuoSearch from './views/index3/caoZuoSearch';
import sheBeiSearch from './views/index3/sheBeiSearch';
import xiangMuSearch from './views/index3/xiangMuSearch';
import xiTongSearch from './views/index3/xiTongSearch';
import baoJingDetail from './views/index3/baoJingDetail';
import caoZuoDetail from './views/index3/caoZuoDetail';
import sheBeiDetail from './views/index3/sheBeiDetail';
import xiangMuDetail from './views/index3/xiangMuDetail';
import xiTongDetail from './views/index3/xiTongDetail';
import shebeiDetail from './views/index3/sheBeiDetail';
import EchartsAnl from './views/EchartsAnlasys/ElectricityAnalysis'
import ReportAna from './views/EchartsAnlasys/ReportAnalysis'
import baojingbianliangDetail from './views/index3/baojingbianliangDetail';
import canshuDetail from './views/index3/canshuDetail';
import moshizhuangtaiDetail from './views/index3/moshizhuangtaiDetail';
import shebeishuxingDetail from './views/index3/shebeishuxingDetail';
import caozuo from './views/index3/caozuo';
import WarnReport from './views/EchartsAnlasys/WarnPhotoReport';
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
            path: '/ReportAna',
            name: 'ReportAna',
            component: ReportAna
        },
        {
            path: '/EchartsAnl',
            name: 'EchartsAnl',
            component: EchartsAnl
        },
        {
            path: '/WarnReport',
            name: 'WarnReport',
            component: WarnReport
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
            path: '/index2',
            name: 'index2',
            component: index2
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
        {
            path: '/aboutUs',
            name: 'aboutUs',
            component: aboutUs
        },
        {
            path: '/searchMap',
            name: 'searchMap',
            component: searchMap
        },
        {
            path: '/projectNumber',
            name: 'projectNumber',
            component: projectNumber
        },
        {
            path: '/baojingbaobiao',
            name: 'baojingbaobiao',
            component: baojingbaobiao
        },
        {
            path: '/jiankongbaobiao',
            name: 'jiankongbaobiao',
            component: jiankongbaobiao
        },
        {
            path: '/shiyonggonglvbaobiao',
            name: 'shiyonggonglvbaobiao',
            component: shiyonggonglvbaobiao
        },
        {
            path: '/fadianbaobiao',
            name: 'fadianbaobiao',
            component: fadianbaobiao
        },
        {
            path: '/shishinengyuanbaobiao',
            name: 'shishinengyuanbaobiao',
            component: shishinengyuanbaobiao
        },
        {
            path: '/aboutUs',
            name: 'aboutUs',
            component: aboutUs
        },
        {
            path: '/searchMap',
            name: 'searchMap',
            component: searchMap
        },
        {
            path: '/baoJingSearch',
            name: 'baoJingSearch',
            component: baoJingSearch
        },
        {
            path: '/caoZuoSearch',
            name: 'caoZuoSearch',
            component: caoZuoSearch
        },
        {
            path: '/sheBeiSearch',
            name: 'sheBeiSearch',
            component: sheBeiSearch
        },
        {
            path: '/xiangMuSearch',
            name: 'xiangMuSearch',
            component: xiangMuSearch
        },
        {
            path: '/xiTongSearch',
            name: 'xiTongSearch',
            component: xiTongSearch
        },
        {
            path: '/baoJingDetail',
            name: 'baoJingDetail',
            component: baoJingDetail
        },
        {
            path: '/caoZuoDetail',
            name: 'caoZuoDetail',
            component: caoZuoDetail
        },
        {
            path: '/sheBeiDetail',
            name: 'sheBeiDetail',
            component: sheBeiDetail
        },
        {
            path: '/xiangMuDetail',
            name: 'xiangMuDetail',
            component: xiangMuDetail
        },
        {
            path: '/xiTongDetail',
            name: 'xiTongDetail',
            component: xiTongDetail
        },
        {
            path: '/shebeiDetail',
            name: 'shebeiDetail',
            component: shebeiDetail
        },
        {
            path: '/baojingbianliangDetail',
            name: 'baojingbianliangDetail',
            component: baojingbianliangDetail
        },
        {
            path: '/canshuDetail',
            name: 'canshuDetail',
            component: canshuDetail
        },
        {
            path: '/moshizhuangtaiDetail',
            name: 'moshizhuangtaiDetail',
            component: moshizhuangtaiDetail
        },
        {
            path: '/shebeishuxingDetail',
            name: 'shebeishuxingDetail',
            component: shebeishuxingDetail
        },
        {
            path: '/caozuo',
            name: 'caozuo',
            component: caozuo
        }
    ]
})
