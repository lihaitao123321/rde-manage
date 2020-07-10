import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from "vuex-i18n";
import enumeration from "./enumeration";
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    mqttUrl: 'mqtt://106.12.36.121:8884',
    baseUrl: 'https://iot.congrongyun.com',
    location: [121.469652, 31.230121],
    theme: {
      baseColor: '#333333',
      mainColor: '#2B7FF3',
      baseBgColor: 'white',
      mainBgColor: '#2B7FF3',
    },
    checkList: [],
    projectList: {},
    loginInfo: {},
    userInfo: {},
    company: {},
    isLogout: false,
    jPush: {
      messageNum: {

      }
    },

  },
  getters: {
    loginInfo:(state)=>{
      let u = localStorage.getItem('loginInfo')
      if(state.loginInfo.nickname){
        return state.loginInfo
      }else if(u){
        return JSON.parse(u)
      }
      return {}
    },
    company: (state) => {
      let company = localStorage.getItem('company')
      if (state.company.id) {
        return state.company
      } else if (company) {
        return JSON.parse(company)
      }
      return {}
    }
  },
  mutations: {
    setLocation(state, payload) {
      state.location = payload;
    },
    setLoginInfo(state, payload) {
      let loginInfo = JSON.parse(JSON.stringify(state.loginInfo))
      for (let key in payload) {
        if(payload.hasOwnProperty(key)){
          loginInfo[key] = payload[key];
        }
      }
      state.loginInfo = loginInfo;
      localStorage.setItem('loginInfo', JSON.stringify(state.loginInfo));
    },
    setLogout(state, data) {
      state.isLogout = data;
    },
    setCompany(state, data) {
      state.company = data;
      localStorage.setItem('company', JSON.stringify(data));
    },
    setPushNum(state, data) {
      state.jPush.messageNum = data;
    },
  },
  modules: {
    enumeration
  }
});
Vue.use(vuexI18n.plugin, store);
export default store;
