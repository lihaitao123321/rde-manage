import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import localConfig from './config'
//配置
Vue.prototype.localConfig = localConfig;
//bus
import VueBus from 'vue-bus'
Vue.use(VueBus);
// 引入Mint ui全部组件

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  size: 'mini',
  zIndex: 3000
});

// vue-echarts
import './components/echarts'
import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts)
// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import './css/main.less';
//引入全局字体图标库,用法：<i class="fa fa-angle-left"></i>,具体图标去 http://fontawesome.dashgame.com 查看
import './assets/font-awesome-4.7.0/css/font-awesome.css'
//多选button组件
import CheckButtonList from './components/checkButtonList'
Vue.component('CheckButtonList', CheckButtonList);
//遮罩弹框组件
import PopMask from './components/pop-mask/PopMask.vue'
Vue.component('PopMask', PopMask);
import Popper from './components/popper'
Vue.use(Popper)
//公用筛选组件
// import Condition from './components/condition/Condition.vue'
// Vue.component('Condition', Condition);
//加载中组件
import {
  LoadingPlugin
} from 'vux'
Vue.use(LoadingPlugin)
import {
  TransferDom
} from 'vux'
Vue.directive('TransferDom', TransferDom)
//自定义路由方法
router.goBack = function () {
  this.isBack = true;
  window.history.back();
};
import Tools from './util/Tools'
Vue.prototype.Tools = Tools;


import {
  ToastPlugin
} from 'vux'
import Vuex from "vuex";
Vue.use(ToastPlugin);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
