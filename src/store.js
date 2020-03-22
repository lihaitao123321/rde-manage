import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from "vuex-i18n";
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    mqttUrl:'mqtt://106.12.36.121:8884',
    baseUrl:'https://iot.congrongyun.com',
    location: [121.469652,31.230121],
    theme: {
      baseColor: '#333333',
      mainColor: '#2B7FF3',
      baseBgColor: 'white',
      mainBgColor: '#2B7FF3',
    },
    checkList:[],
    projectList:{},
    loginInfo: {},
    userInfo: {},
    isLogout:false,
    jPush:{
      messageNum:{

      }
    },

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
    setLogout(state, data){
      state.isLogout=data;
    },
    setPushNum(state, data){
      state.jPush.messageNum = data;
    },
    checkListFun(state,data){
      state.checkList = data
    },
    projectListFun(state,data){
      state.projectList = data
    }

  },
  actions: {
    getUserInfo({ commit, state }, products) {
        return state.userInfo;
    },
  },
  modules: {
    i18n: vuexI18n.store
  }
});
Vue.use(vuexI18n.plugin, store);
export default store;
