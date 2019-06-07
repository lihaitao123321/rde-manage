import Vue from 'vue';
import PopMask from './PopMask.vue';
const Constructor = Vue.extend(PopMask); // 直接将Vue组件作为Vue.extend的参数
const Instance = (data, cb) => {
  let instance = new Constructor({
    el: document.createElement('div'),
    data: {
      options: data
    }
  });
  instance.callback = function (value) {
    cb(value);
  };
  //插入空popstate
  history.pushState(null, null, location.href);
  window.onpopstate=()=>{
    instance.show=false;
    instance.$el.addEventListener('transitionend', event=>{
      if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
      }
    });
  };
  //关闭弹框
  instance.closePop=()=>{
    //后退一次取消popstate的插入
    window.history.back();
    instance.show=false;
    instance.$el.addEventListener('transitionend', event=>{
      if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
      }
    });
  }
  document.body.appendChild(instance.$el);
  Vue.nextTick(function() {
    instance.show = true;
  });
};
export default {
  install: Vue => {
    Vue.prototype.PopMask = Instance; // 将组件暴露出去，并挂载在Vue的prototype上
  }
};
