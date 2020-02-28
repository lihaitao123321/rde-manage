<template>
    <div>
        <div class="content_item" v-for="(item, index) in warnList" :key="index" @click="toDetail(item)">
            <div class="item_top">
                <div class="line">
                    <div class="label">报警描述:</div>
                    <div class="value">
                       {{item.cause}}
                    </div>
                </div>
                <div class="line">
                    <div class="label">报警变量:</div>
                    <div class="value">
                        {{item.name}}
                    </div>
                </div>
                <div class="line">
                    <div class="label">报警对象:</div>
                    <div class="value">
                        {{item.deviceName}}
                    </div>
                </div>
                <div class="line">
                    <div class="label">所属系统:</div>
                    <div class="value">{{item.subProjectName}}</div>
                </div>
                <div class="line">
                    <div class="label">所属项目:</div>
                    <div class="value">{{item.projectName}}</div>
                </div>
            </div>
            <div class="item_bottom">
                <div class="icons">
                    <div class="item1" v-if="Number(item.onLine) === 0">
                        <div class="online"></div>在线
                    </div>
                    <div class="item11" v-else>
                        <div class="online1"></div>不在线
                    </div>
                    <div class="item2" v-if="Number(item.status) === 1">
                        <div class="run"> </div>R 运行
                    </div>
                    <div class="item21" v-else-if="Number(item.status) === 2">
                        <div class="run1"> </div>S 停止
                    </div>
                    <div class="item22" v-else-if="Number(item.status) === 3">
                        <div class="run2"> </div>L 离线
                    </div>
                    <div class="item23" v-else>
                        <div class="run"> </div>—
                    </div>
                    <div class="item3" v-if="Number(item.alarmLevel) === 0">
                        W 警告
                    </div>
                    <div class="item31" v-else-if="Number(item.alarmLevel) === 1">
                        F 报警
                    </div>
                    <div class="item32" v-else-if="Number(item.alarmLevel) === 2">
                        F 故障
                    </div>
                    <div class="item33" v-else>
                        N 正常
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import warn from '../Warn/warn.js'
    export default {
        name: "baoJingListNew",
        data(){
            return{
                warnList:[]
            }
        },
        created(){
            this.getWarnFun();
        },
        methods:{
            getWarnFun(){
                console.log("执行了=====》");
                this.warnList = [];
                warn.warnReportFun().then(respont=>{
                    if(respont.code === 0 && Array.isArray(respont.data.data) && respont.data.data.length > 0){
                        this.warnList = respont.data.data;
                    }
                }).catch()
            },
            toDetail(param){
                sessionStorage.setItem('thingId',param.thingId);
                sessionStorage.setItem('abbreviate',param.abbreviate)
                this.$router.push({path:'/CycleWaterWarn'});
            }
        }
    }
</script>

<style lang="less" scoped>
    .content_item {
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        margin-top: 15px;
        .item_top {
            padding: 0 17px 8px 17px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            .line {
                display: flex;
                padding-top: 8px;

                .label {
                    font-size: 14px;
                    font-family: PingFangSCMedium;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                }

                .value {
                    font-size: 14px;
                    font-family: PingFangSCMedium;
                    color: #212121;
                    padding-left: 10px;
                }
            }
        }

        .item_bottom {
            display: flex;
            align-items: center;
            height: 47px;
            padding: 0 17px;

            .icons {
                display: flex;
                justify-content: space-between;
                flex-grow: 1;

                .item1 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(26,204,131,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(26,204,131,1);
                    .online {
                        width:7px;
                        height:7px;
                        background:rgba(26,204,131,1);
                        border-radius:50%;
                        margin-right: 5px;
                    }
                }
                .item11{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                    .online1{
                        width:7px;
                        height:7px;
                        background:rgba(128,128,128,1);
                        border-radius:50%;
                        margin-right: 5px;
                    }
                }
                .item2 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(26,204,131,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(26,204,131,1);
                    /*width: 74px;*/
                    /*height: 26px;*/
                    /*line-height: 26px;*/
                    /*text-align: center;*/
                    /*font-size: 13px;*/
                    /*ackground:rgba(26,204,131,0.1);*/
                    /*border-radius:13px;*/

                    /*font-family:PingFang-SC-Bold;*/
                    /*font-weight:bold;*/
                    /*background:rgba(26,204,131,1);*/
                    .run {
                        /*width:7px;*/
                        /*height:7px;*/
                        /*background:rgba(26,204,131,1);*/
                        /*border-radius:50%;*/
                        /*margin-right: 5px;*/
                    }
                }
                .item21{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                }
                .item22{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                }
                .item23{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                }
                .item3 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(255,165,35,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(255,165,35,1);
                }
                .item31 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(255,94,57,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(255,94,57,1);
                }
                .item32{
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(210,38,66,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:#D22642;
                }
                .item33{
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(26,204,131,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(26,204,131,1);
                }
            }

            .time {
                font-size: 13px;
                font-family: PingFangSCMedium;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
            }
        }
    }
</style>