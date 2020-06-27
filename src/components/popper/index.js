import Vue from 'vue';
import popper from './popper.vue';
const Constructor = Vue.extend(popper); // 直接将Vue组件作为Vue.extend的参数
const Instance = (cb) => {
  let instance = new Constructor({
    el: document.createElement('div')
  });
  instance.callback = function (value) {
    cb(value);
  };
  //关闭弹框
  instance.closePop=()=>{
    //后退一次取消popstate的插入
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
  return instance
};
export default {
  install: Vue => {
    Vue.prototype.popperMark = Instance; // 将组件暴露出去，并挂载在Vue的prototype上
  }
};
