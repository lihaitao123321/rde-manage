import Tools from '../util/Tools'
const state = {
  projectTypeList: [],
  areaList: []
}

const mutations = {
  SET_PROJECT: (state, list) => {
    state.projectTypeList = list
  },
  SET_AREA: (state, list) => {
    state.areaList = list
  }
}

const actions = {
  getProjectTypeList({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      if (state.projectTypeList.length > 0) {
        resolve(state.projectTypeList)
      } else {
        Tools.ajax({
          method: "/cloud/api/app/sys/listSysDict",
          data: {
            dictType: 'project_type'
          }
        }).then(data => {
          if (data.code === 0) {
            let list = data.data
            let resList = []
            for (let i = 0; i < list.length; i++) {
              resList.push({
                value: list[i].dictId,
                name: list[i].dictName
              })
            }
            commit('SET_PROJECT', resList)
            resolve(resList)
          } else {
            resolve([])
          }
        }).catch(() => {
          resolve([])
        });
      }
    })
  },
  getAreaList({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      if (state.areaList.length > 0) {
        resolve(state.areaList)
      } else {
        Tools.ajax({
          method: "/cloud/api/app/sys/getAreaList",
          data: {}
        }).then(data => {
          if (data.code === 0) {
            let list = data.data
            let resList = []
            for (let i = 0; i < list.length; i++) {
              resList.push({
                value: list[i].id,
                name: list[i].name,
                parent: list[i].parentId
              })
            }
            for (let i = 0; i < resList.length; i++) {
              let hasParent = false
              for (let j = 0; j < resList.length; j++) {
                if (resList[i].parent === resList[j].value) {
                  hasParent = true
                  break
                }
              }
              if (!hasParent) {
                resList[i].parent = 0
              }
            }
            commit('SET_AREA', resList)
            resolve(resList)
          } else {
            resolve([])
          }
        }).catch(() => {
          resolve([])
        });
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