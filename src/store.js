import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from "vuex-i18n";
Vue.use(Vuex);
let store=new Vuex.Store({
  state: {
      theme:{
        baseColor:'#333333',
        mainColor:'#2B7FF3',
        baseBgColor:'white',
        mainBgColor:'#2B7FF3',
      }
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    i18n: vuexI18n.store
  }
});
Vue.use(vuexI18n.plugin, store);
export default store;
