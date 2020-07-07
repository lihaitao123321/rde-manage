import Tools from '../util/Tools'
//项目类型
export function getTableList(params) {
    return Tools.ajax({
        method: "/cloud/api/app/firstpage/getAlarmDynamicState",
        data: {
            type: 1,
            step:params.step,
            startDate:Tools.Date.TimeFormat(params.startDate,'ymdhms'),
            endDate:Tools.Date.TimeFormat(params.endDate,'ymdhms'),
            level:params.level,
            pageNum:1,
            pageSize:100
        }
    })
}
