import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.less';
//引入全局字体图标库,用法：<i class="fa fa-angle-left"></i>,具体图标去 http://fontawesome.dashgame.com 查看
import './assets/font-awesome-4.7.0/css/font-awesome.css'
//遮罩弹框组件
import PopMask from './components/pop-mask/PopMask.vue'
Vue.component('PopMask',PopMask);
//公用筛选组件
import Condition from './components/condition/Condition.vue'
Vue.component('Condition',Condition);
//自定义路由方法
router.goBack = function () {
  this.isBack = true;
  window.history.back();
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
