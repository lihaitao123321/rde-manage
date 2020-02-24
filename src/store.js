import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from "vuex-i18n";
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    location: [121.469652,31.230121],
    theme: {
      baseColor: '#333333',
      mainColor: '#2B7FF3',
      baseBgColor: 'white',
      mainBgColor: '#2B7FF3',
    },
    loginInfo: {},
    userInfo: {},
    isLogout:false,
    jPush:{
      messageNum:{

      }
    }
  },
  mutations: {
    setLocation(state, payload) {
      state.location = payload;
    },
    setUserInfo(state, payload) {
      for (let key in payload) {
        state.userInfo[key] = payload[key];
      }
    },
    setLoginInfo(state, payload) {
      for (let key in payload) {
        state.loginInfo[key] = payload[key];
      }
    },
    //设置keep-alive要缓存的页面
    catchPage(state, data) {
      if(state.includedComponents.every(item=>item!==data)){
        state.includedComponents.push(data);
      }
      state.excludedComponents.forEach((item,index)=>{
        if(item===data){
          state.excludedComponents.splice(index,1);
        }
      })
    },
    //设置keep-alive要取消缓存的页面
    removeCatchPage(state, data){
      if(state.excludedComponents.every(item=>item!==data)){
        state.excludedComponents.push(data);
      }
      state.includedComponents.forEach((item,index)=>{
        if(item===data){
          state.includedComponents.splice(index,1);
        }
      })
    },
    setLogout(state, data){
      state.isLogout=data;
    },
    setPushNum(state, data){
      state.jPush.messageNum = data;
    }
  },
  actions: {
    getUserInfo() {

    }
  },
  modules: {
    i18n: vuexI18n.store
  }
});
Vue.use(vuexI18n.plugin, store);
export default store;
