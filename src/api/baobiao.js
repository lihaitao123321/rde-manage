import Tools from '../util/Tools'
//监控报表
export function getJiankongTableList(params) {
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
//实际用电功率报表
export function getShijiTableList(params) {
    return Tools.ajax({
        method: "/cloud/api/app/firstpage/getGenElecGroupByDate",
        data: {
            startDate:Tools.Date.TimeFormat(params.startDate,'ymdhms'),
            endDate:Tools.Date.TimeFormat(params.endDate,'ymdhms'),
            pageNum:1,
            pageSize:100
        }
    })
}
