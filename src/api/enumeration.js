import Tools from '../util/Tools'
//项目类型
export function getProjectTypeList() {
  return new Promise((resolve, reject) => {
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
        resolve(resList)
      } else {
        resolve([])
      }
    }).catch(() => {
      resolve([])
    });
  })
}
//城市
export function getAreaList() {
  return new Promise((resolve, reject) => {
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
        resolve(resList)
      } else {
        resolve([])
      }
    }).catch(() => {
      resolve([])
    });
  })
}
//设备搜索相关枚举
export function getDeviceAround() {
  return new Promise((resolve, reject) => {
    Tools.ajax({
      method: "/cloud/api/app/monitor/device/getDeviceQueryParams",
      data: {}
    }).then(data => {
      if (data.code === 0) {
        //设备类型
        let deviceTypeList = data.data.deviceTypes;
        for (let i = 0; i < deviceTypeList.length; i++) {
          deviceTypeList[i] = {
            value: deviceTypeList[i].key,
            name: deviceTypeList[i].value,
          }
        }
        //设备型号
        let deviceModelList = data.data.deviceModels;
        for (let i = 0; i < deviceModelList.length; i++) {
          deviceModelList[i] = {
            value: deviceModelList[i].id,
            name: deviceModelList[i].name,
          }
        }
        //所属系统
        let deviceSystemList = data.data.deviceSystems;
        for (let i = 0; i < deviceSystemList.length; i++) {
          deviceSystemList[i] = {
            value: deviceSystemList[i].id,
            name: deviceSystemList[i].name,
          }
        }
        //所属项目
        let deviceProjectList = data.data.deviceProjects;
        for (let i = 0; i < deviceProjectList.length; i++) {
          deviceProjectList[i] = {
            value: deviceProjectList[i].key,
            name: deviceProjectList[i].value,
          }
        }
        //通讯状态
        let deviceCommStatusList = data.data.deviceCommStatus;
        for (let i = 0; i < deviceCommStatusList.length; i++) {
          deviceCommStatusList[i] = {
            value: deviceCommStatusList[i].key,
            name: deviceCommStatusList[i].value,
          }
        }
        //工作状态
        let deviceWorkStatusList = data.data.deviceWorkStatus;
        for (let i = 0; i < deviceWorkStatusList.length; i++) {
          deviceWorkStatusList[i] = {
            value: deviceWorkStatusList[i].key,
            name: deviceWorkStatusList[i].value,
          }
        }
        //报警状态
        let deviceAlarmStatusList = data.data.deviceAlarmStatus;
        for (let i = 0; i < deviceAlarmStatusList.length; i++) {
          deviceAlarmStatusList[i] = {
            value: deviceAlarmStatusList[i].key,
            name: deviceAlarmStatusList[i].value,
          }
        }
        resolve({
          deviceTypeList,
          deviceModelList,
          deviceSystemList,
          deviceProjectList,
          deviceCommStatusList,
          deviceWorkStatusList,
          deviceAlarmStatusList,
        })
      } else {
        resolve({})
      }
    }).catch(() => {
      resolve({})
    });
  })
}