import Tools from '../util/Tools'
import {
  getProjectTypeList,
  getAreaList,
  getDeviceAround,
  getUserList
} from '@/api/enumeration'
const state = {
  projectTypeList: [], //项目类型
  areaList: [], //位置
  deviceTypeList: [],//设备类型
  deviceModelList: [],//设备型号
  deviceSystemList: [],//所属系统
  deviceProjectList: [],//所属项目
  deviceCommStatusList: [],//通讯状态
  deviceWorkStatusList: [],//工作状态
  deviceAlarmStatusList: [],//报警状态
  userList:[],//操作人员
}

const mutations = {
  SET_PROJECT: (state, list) => {
    state.projectTypeList = list
  },
  SET_AREA: (state, list) => {
    state.areaList = list
  },
  SET_DEVICE_AROUND: (state, obj) => {
    state.deviceTypeList = JSON.parse(JSON.stringify(obj.deviceTypeList))
    state.deviceModelList = JSON.parse(JSON.stringify(obj.deviceModelList))
    state.deviceSystemList = JSON.parse(JSON.stringify(obj.deviceSystemList))
    state.deviceProjectList = JSON.parse(JSON.stringify(obj.deviceProjectList))
    state.deviceCommStatusList = JSON.parse(JSON.stringify(obj.deviceCommStatusList))
    state.deviceWorkStatusList = JSON.parse(JSON.stringify(obj.deviceWorkStatusList))
    state.deviceAlarmStatusList = JSON.parse(JSON.stringify(obj.deviceAlarmStatusList))
  },
  SET_USER: (state, list) => {
    state.userList = list
  },
}

const actions = {
  //项目类型
  getProjectTypeList: ({
    state,
    commit
  }) => {
    return new Promise(async (resolve, reject) => {
      if (state.projectTypeList.length > 0) {
        resolve(state.projectTypeList)
      } else {
        let resList = await getProjectTypeList()
        commit('SET_PROJECT', resList)
        resolve(resList)
      }
    })
  },
  //城市
  getAreaList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.areaList.length > 0) {
        resolve(state.areaList)
      } else {
        let resList = await getAreaList()
        commit('SET_AREA', resList)
        resolve(resList)
      }
    })
  },
  //设备类型
  getDeviceTypeList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.deviceTypeList.length > 0) {
        resolve(state.deviceTypeList)
      } else {
        let res = await getDeviceAround()
        commit('SET_DEVICE_AROUND', res)
        resolve(res.deviceTypeList)
      }
    })
  },
  //设备型号
  getDeviceModelList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.deviceModelList.length > 0) {
        resolve(state.deviceModelList)
      } else {
        let res = await getDeviceAround()
        commit('SET_DEVICE_AROUND', res)
        resolve(res.deviceModelList)
      }
    })
  },
  //所属系统
  getDeviceSystemList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.deviceSystemList.length > 0) {
        resolve(state.deviceSystemList)
      } else {
        let res = await getDeviceAround()
        commit('SET_DEVICE_AROUND', res)
        resolve(res.deviceSystemList)
      }
    })
  },
  //所属项目
  getDeviceProjectList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.deviceProjectList.length > 0) {
        resolve(state.deviceProjectList)
      } else {
        let res = await getDeviceAround()
        commit('SET_DEVICE_AROUND', res)
        resolve(res.deviceProjectList)
      }
    })
  },
  //通讯状态
  getDeviceCommStatusList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.deviceCommStatusList.length > 0) {
        resolve(state.deviceCommStatusList)
      } else {
        let res = await getDeviceAround()
        commit('SET_DEVICE_AROUND', res)
        resolve(res.deviceCommStatusList)
      }
    })
  },
  //工作状态
  getDeviceWorkStatusList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.deviceWorkStatusList.length > 0) {
        resolve(state.deviceWorkStatusList)
      } else {
        let res = await getDeviceAround()
        commit('SET_DEVICE_AROUND', res)
        resolve(res.deviceWorkStatusList)
      }
    })
  },
  //报警状态
  getDeviceAlarmStatusList({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      if (state.deviceAlarmStatusList.length > 0) {
        resolve(state.deviceAlarmStatusList)
      } else {
        let res = await getDeviceAround()
        commit('SET_DEVICE_AROUND', res)
        resolve(res.deviceAlarmStatusList)
      }
    })
  },
  //报警状态
  getUserList({
     state,
     commit
   }) {
    return new Promise(async (resolve, reject) => {
      if (state.userList.length > 0) {
        resolve(state.userList)
      } else {
        let res = await getUserList()
        commit('SET_USER', res)
        resolve(res)
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
