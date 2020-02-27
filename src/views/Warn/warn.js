import Tools from '../../util/Tools'
let warns = {
    CycleWaterFun(){
     return  Tools.ajax({
            method: '/cloud/api/app/monitor/alarmDetail',
            data: {
                "thingId":"dv_1",
                "variableId":"01704398b77b00047c1a704398b70002",
                "abbreviate":"r4025"
            }
        })
    },
    //报警列表
    warnReportFun(){
        return  Tools.ajax({
            method: '/cloud/api/app/monitor/pageAlarm',
            data: {
                        "pageSize":10,
                        "pageNum":1
            }
        })
    }
}

export default warns