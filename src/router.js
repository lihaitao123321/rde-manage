import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login/login.vue'
import register from './views/login/register.vue'
import registerOk from './views/login/registerOk.vue'
import selectCompany from './views/login/selectCompany.vue'
import home from './views/Home.vue'
import index1 from './views/index1/index1.vue'
import index2 from './views/index2/index2.vue'
import index3 from './views/index3/index3.vue'
import index4 from './views/index4/index4.vue'
import index5 from './views/index5/index5.vue'
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
import EchartsAnl from './views/index3/ElectricityAnalysis'
import ReportAna from './views/index3/ReportAnalysis'
import baojingbianliangDetail from './views/index3/baojingbianliangDetail';
import canshuDetail from './views/index3/canshuDetail';
import moshizhuangtaiDetail from './views/index3/moshizhuangtaiDetail';
import shebeishuxingDetail from './views/index3/shebeishuxingDetail';
import caozuo from './views/index3/caozuo';
import WarnReport from './views/index3/WarnPhotoReport';
import CycleWaterWarn from './views/index3/CycleWaterWarn'
import baojingList from './views/index3/baoJingList'
import baojingListNew from './views/index3/baojingListNew'
import BoxRadio from './views/index3/BoxRadio'
import CancelAlarm from './views/index3/CancelAlarm'
import RemoveRecord from './views/index3/RemoveRecord'
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
            path:'/BoxRadio',
            name:'BoxRadio',
            component:BoxRadio
        },
        {
            path: '/baojingList',
            name: 'baojingList',
            component: baojingList
        },
        {
            path:'/baojingListNew',
            name:'baojingListNew',
            component:baojingListNew
        },
        {
            path: '/ReportAna',
            name: 'ReportAna',
            component: ReportAna
        },
        {
            path: '/CancelAlarm',
            name: 'CancelAlarm',
            component: CancelAlarm
        },
        {
            path: '/RemoveRecord',
            name: 'RemoveRecord',
            component: RemoveRecord
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
            path: '/CycleWaterWarn',
            name: 'CycleWaterWarn',
            component: CycleWaterWarn
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
            component: home,
            meta:{
                keepAlive:true
            },
            children: [
                {
                    path: '',
                    redirect: to => {
                        return 'index1';
                    }
                },
                {
                    path: 'index1',
                    name: 'index1',
                    component: index1,
                    meta:{
                        keepAlive:true
                    },
                },
                {
                    path: 'index2',
                    name: 'index2',
                    component: index2,
                    meta:{
                        keepAlive:true
                    },
                },
                {
                    path: 'index4',
                    name: 'index4',
                    component: index4,
                    meta:{
                        keepAlive:true
                    },
                },
                {
                    path: 'index5',
                    name: 'index5',
                    component: index5,
                    meta:{
                        keepAlive:true
                    },
                }
            ]
        },
        {
            path: '/index3',
            name: 'index3',
            component: index3,
            meta:{
                keepAlive:true
            },
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
            path: '/sheBeiDetail/:deviceId',
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
