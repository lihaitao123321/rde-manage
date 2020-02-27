import Tools from '../../util/Tools'
let warns = {
    CycleWaterFun(){
        console.log(Tools);
     return  Tools.ajax({
            method: '/cloud/api/app/monitor/alarmDetail',
            data: {
                "thingId":"dv_1",
                "variableId":"01704398b77b00047c1a704398b70002",
                "abbreviate":"r4025"
            }
        })
    }
}

export default warns