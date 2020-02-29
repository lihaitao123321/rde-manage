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
    }
    //报警折线图报表
}

export default warns