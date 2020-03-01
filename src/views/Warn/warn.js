import Tools from '../../util/Tools'
let warns = {
    //报警列表
    warnReportFun(){
        return  Tools.ajax({
            method: '/cloud/api/app/monitor/pageAlarm',
            data: {
                        "pageSize":10000,
                        "pageNum":1
            }
        })
    },
    //报警管理-报警变量明细查询
    warnManageDetailFun(param){
        return Tools.ajax({
            method:'/cloud/api/app/monitor/alarmDetail',
            data: {
                "thingId":sessionStorage.getItem('thingId'),
                "variableId":null,
                "abbreviate":sessionStorage.getItem('abbreviate'),
            }
        })
    },
    //报警折线图分析
    warnBrokenFun(startTime,endTime){
        return Tools.ajax({
            method:'/cloud/api/app/monitor/alarmLine',
            data: {
                "thingId":sessionStorage.getItem('thingId'),
                "beginTime":startTime + ':00',
                "endTime":endTime + ':00',
                "abbreviate":sessionStorage.getItem('abbreviate'),
            }
        })
    },
    warnLineReportFun(startTime,endTime,period){
        return Tools.ajax({
            method:'/cloud/api/app/monitor/alarmLineData',
            data: {
                "thingId":sessionStorage.getItem('thingId'),
                "beginTime":startTime + ':00',
                "endTime":endTime + ':00',
                "period":period,
                "abbreviate":sessionStorage.getItem('abbreviate'),
                "pageSize":5,
                "pageNum":1
            }
        })
    },
    //报警折线图报表
    //报警快照分析
    warnAnalysisFun(param1,param2,param3){
        return Tools.ajax({
            method:'/cloud/api/app/monitor/analyzeAlarmSnap',
            data: {
                "thingId":sessionStorage.getItem('thingId'),
                "variableIds":param1,
                "beginTime":param2 + ':00',
                "endTime":param3 + ':00'

            // "variableIds":["8aaa83ed644054090164406e8b01001f","8aaa83ed644054090164406e8ae20016"],
            // "thingId":"dv_96",
            // "beginTime":"2017-06-12 09:00:00",
            // "endTime":"2020-06-12 09:00:00"

            }
        })
    },
    //报警解除报警接口
    cancelAlarmFun(param1,param2){
        return Tools.ajax({
            method:'/cloud/api/app/monitor/removeAlarm',
            data:{
                "thingId":sessionStorage.getItem('thingId'),
                "abbreviate":sessionStorage.getItem('abbreviate'),
                "causeDesc":param1,
                "solution":param2
            }
        })
    },
    //报警解除记录
    removeRecordFun(){
        return Tools.ajax({
            method:'/cloud/api/app/monitor/getRemoveAlarmMessage',
            data:{
                "thingId":sessionStorage.getItem('thingId'),
                "abbreviate":sessionStorage.getItem('abbreviate'),
            }
        })
    }
}

export default warns