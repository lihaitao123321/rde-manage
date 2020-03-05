<template>
    <div class="t_page">
        <x-header
                title="B001循环水报警"
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
        >
        </x-header>
        <div class="pageContent">
            <div class="padding_lrt15px">
                <div class="warter_cycle">
                    <div class="uf dr">
                        <div class="warn_problem uf ac jf">报警描述</div>
                        <div class="warn_describe uf ac jf f1">{{detailObj.cause}}</div>
                    </div>
                    <div class="uf dr">
                        <div class="warn_problem uf ac jf">报警变量</div>
                        <div class="warn_describe uf ac jf f1">{{detailObj.name}}</div>
                    </div>
                    <div class="uf dr">
                        <div class="warn_problem uf ac jf">报警对象</div>
                        <div class="warn_describe uf ac jf f1">{{detailObj.deviceName}}</div>
                    </div>
                    <div class="uf dr">
                        <div class="warn_problem uf ac jf">所属系统</div>
                        <div class="warn_describe uf ac jf f1">{{detailObj.subProjectName}}</div>
                    </div>
                    <div class="uf dr">
                        <div class="warn_problem uf ac jf">所属项目</div>
                        <div class="warn_describe uf ac jf f1">{{detailObj.projectName}}</div>
                    </div>
                    <div class="uf dr">
                        <div class="warn_problem uf ac jf">解除时间</div>
                        <div class="warn_describe uf ac jf f1">{{detailObj.relieveTime}}</div>
                    </div>
                    <div class="uf dr">
                        <div class="warn_problem uf ac jf">恢复时间</div>
                        <div class="warn_describe uf ac jf f1">{{detailObj.recoverTime}}</div>
                    </div>
                </div>
                <div class="item_bottom">
                    <div class="icons">
                        <div class="item1" v-if="Number(detailObj.level) === 1">
                            <img src="../../assets/images/index3/warning@2x.png">报警
                        </div>
                        <div class="item11" v-else-if="Number(detailObj.level) === 0">
                            <img src="../../assets/images/index3/warning@2x.png">警告
                        </div>
                        <div class="item12" v-else-if="Number(detailObj.level) === 2">
                            <img src="../../assets/images/index3/warning@2x.png">故障
                        </div>
                        <div class="item2">
                            报警中
                        </div>
                    </div>
                    <div class="time">
                        {{detailObj.operationTime}}
                    </div>
                </div>
                <div class="top_bottom_word uf dr js">
                    <div class="router_warn">报警折线图</div>
                    <div class="detail_word uf ac jc" @click="WarnDetailFun">详情<span>></span></div>
                </div>
                <div class="ReportEcharts">
                    <div class="position_button uf dr">
                        <div>1:报警</div>
                        <div>0:正常</div>
                    </div>
                    <echartsTotal :detailList="detailList"></echartsTotal>
                </div>
                <div class="top_bottom_word uf dr js">
                    <div class="photo_warn">报警快照分析(n条)</div>
                    <div class="uf dr">
                        <span class="point">已选：{{counter}}</span>
                        <div class="detail_analysis uf ac jc" @click="WarnPhotoAna">分析</div>
                    </div>
                </div>


                <div class="checkList">
                    <div v-for="(item,index) in checkListData" :key="index" @click="BoxWarnFun(index)"
                         class="warp"
                         :class="item.active?'activeWarp':'noActiveWarp'"
                         :style="getBackgroouImage(item,index)">
                        <div class="title_word">{{item.title_word}}<span class="unit">{{item.unit}}</span></div>
                        <div class="warn_status">{{item.warn_status}}</div>
                    </div>
                </div>


                <div class="warn_total">每次最多选择3个分析</div>
            </div>
            <div class="position_bottom uf dr ac">
                <div class="repair uf ac jc">报修</div>
                <div class="remove_repair uf ac jc" @click="RemoveWarn">解除报警</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        XHeader,
        XButton,
    } from 'vux'
    import echartsTotal from './echartsTotal'
    import  warns  from '../Warn/warn.js'

    export default {
        components: {
            XHeader,
            echartsTotal,
        },
        name: "CycleWaterWarn",
        data() {
            return {
                detailObj:{},
                detailList:[],
                checkListData: [{
                    title_word: '运行速度',
                    warn_status: '500',
                    unit:'(km/h)',
                    active: true
                }, {
                    title_word: '工作状态',
                    warn_status: '运行速度',
                    unit:'',
                    active: false
                }, {
                    title_word: '实时电量',
                    warn_status: '80',
                    unit:'',
                    active: false
                }, {
                    title_word: '实时储水量',
                    warn_status: '2680',
                    unit:'',
                    active: false
                }, {
                    title_word: '本次工作距离',
                    warn_status: '1500',
                    unit:'',
                    active: false
                }, {
                    title_word: '实时功率',
                    warn_status: '1800',
                    unit:'',
                    active: false
                }],
                isOne: true,
                isTwo: true,
                isThree: true,
                isFore: true,
                isFive: true,
                isSix: true,
                // counter: 0,
                unit:'',
                list: [
                    {
                        problem: '报警描述:',
                        Describe: '越上限报警',
                    },
                    {
                        problem: '报警变量',
                        Describe: 'X001 CPU工作温度',
                    },
                    {
                        problem: '报警对象',
                        Describe: 'B001 循环水泵',
                    },
                    {
                        problem: '所属系统',
                        Describe: 'NYGL01 1号楼能源管理',
                    },
                    {
                        problem: '所属项目',
                        Describe: '镇江出版大厦',
                    },
                    {
                        problem: '解除时间',
                        Describe: '2019-03-17 19：22：00',
                    },
                    {
                        problem: '恢复时间',
                        Describe: '2019-03-18 19：22：00',
                    },
                ]
            }
        },
        computed:{
            counter(){
                let count = 0;
                  if(this.checkListData.length > 0){
                      for(let i=0;i<this.checkListData.length;i++){
                          if(this.checkListData[i].active){
                              count++
                          }else {

                          }
                      }
                  }
                return count;
            }
        },
        mounted(){
            this.CycleWaterFunOne();
        },
        methods: {
            CycleWaterFunOne(){
                this.detailObj = {};
                this.checkListData = [];
                this.detailList = [];
                warns.warnManageDetailFun().then(respont=>{
                    if(respont.code === 0 && respont.data.detail instanceof Object){
                        this.detailObj = respont.data.detail;
                    };
                    if(respont.code === 0 && Array.isArray(respont.data.lineChart) && respont.data.lineChart.length > 0){
                        this.detailList = respont.data.lineChart;
                    };
                    if(respont.code === 0 && Array.isArray(respont.data.alarmVariable) && respont.data.alarmVariable.length > 0){
                        let alarmVariableObj = {};
                       respont.data.alarmVariable.forEach(item=>{
                           alarmVariableObj = {};
                           alarmVariableObj.title_word = item.name;
                           alarmVariableObj.warn_status = item.value;
                           alarmVariableObj.unit = item.unit;
                           alarmVariableObj.active = false;
                           alarmVariableObj.id = item.id;
                           this.checkListData.push(JSON.parse(JSON.stringify(alarmVariableObj)));
                       })
                    }
                }).catch()
            },
            getBackgroouImage(item,index) {
                let isLeft=null;
                if(index%2===0){
                    isLeft=false;
                }else{
                    isLeft=true;
                }
                if (item.active) {
                    return {
                        'background-image': `url(${require('../../assets/images/index3/ActiveChecked.png')})`,
                        'margin-right':isLeft?0:'7px',
                        'margin-left':isLeft?'7px':0
                    }
                } else {
                    return {
                        'margin-right':isLeft?0:'7px',
                        'margin-left':isLeft?'7px':0
                    };
                }
            },
            WarnPhotoAna(){
                let checkList = [];
               if(Array.isArray(this.checkListData) &&  this.checkListData.length > 0){
                   this.checkListData.forEach(item=>{
                       if(item.active){
                           checkList.push(item.id);
                       }
                   });
               }
                this.$store.commit('checkListFun', checkList);
                this.$router.push({path: '/WarnReport'});
            },
            WarnDetailFun(){
              this.$router.push({path:'/ReportAna'});
            },
            RemoveWarn(){
                this.$router.push({path:'/CancelAlarm'});
            },
            BoxWarnFun(index) {
                if(!this.checkListData[index].active){
                    let count=0;
                    for (let i = 0; i < this.checkListData.length; i++) {
                        if(this.checkListData[i].active){
                            count++;
                            if(count>=3){
                                return false;
                            }
                            // this.counter = count + 1;
                        }
                    }
                }

                this.checkListData[index].active = !this.checkListData[index].active;
            }
        }
    }
</script>

<style lang="less" scoped>
    .checkList {
        display: flex;
        flex-wrap: wrap;
        width: 345px;

        .warp {
            width: 165px;
            height: 71px;
            background-color: white;
            border-radius: 5px;
            padding: 10px 10px;
            position: relative;
            background-size: 100% 100%;
            margin-bottom: 10px;
        }

        .activeWarp {
            .title_word {
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(43, 127, 243, 1);

                .unit {
                    color: rgba(43, 127, 243, 1);
                }
            }


            .warn_status {
                font-size: 24px;
                margin-top: 5px;
                font-family: DIN;
                font-weight: bold;
                color: rgba(43, 127, 243, 1);
            }
        }

        .noActiveWarp {
            .title_word {
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(119, 119, 119, 1);

                .unit {
                    color: rgba(119, 119, 119, 0.5);
                }
            }

            .warn_status {
                font-size: 24px;
                margin-top: 5px;
                font-family: DIN;
                font-weight: bold;
                color: rgba(33, 33, 33, 1);
            }
        }
    }

    .pageContent {
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow-x: scroll;
    }

    .box_radio {
        width: calc(50% - 10px);
        height: 71px
    }

    .padding_lrt15px {
        padding: 15px 0px 0 0px;
        margin: 0px 10px;

    }

    .uf {
        display: flex;
    }

    .ac {
        align-items: center;
    }

    .jc {
        justify-content: center;
    }

    .dr {
        flex-direction: row;
    }

    .fw {
        flex-warp: warp
    }

    .dc {
        flex-direction: column;
    }

    .f1 {
        flex: 1;
    }

    .jf {
        justify-content: flex-start;
    }

    .js {
        justify-content: space-between;
    }

    .position_bottom {
        width: 100%;
        height: 60px;
        padding: 0px 10px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -3px 12px 0px rgba(0, 0, 0, 0.2);
    }

    .repair {
        height: 41px;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(43, 127, 243, 1);;
        border: 1px solid rgba(43, 127, 243, 0.5);
        border-radius: 20px;
        margin-right: 5px;
        width: calc(50% - 5px);
    }

    .remove_repair {
        height: 41px;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);;
        border: 1px solid rgba(43, 127, 243, 0.5);
        border-radius: 20px;
        margin-left: 5px;
        width: calc(50% - 5px);
        background: rgba(43, 127, 243, 1);
    }

    .warn_total {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(170, 170, 170, 1);
        margin-bottom: 39px;
    }

    .warter_cycle {
        width: 100%;
        padding: 10px 10px;
        background: rgba(255, 255, 255, 1);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;

    }

    .ReportEcharts {
        width: 100%;
        background-color: white;
        height: 300px;
        border-radius: 5px;
        position: relative;
    }

    .position_button {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .photo_warn {
        width: 160px;
        height: 17px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(33, 33, 33, 1);
    }

    .point {
        width: 60px;
        height: 30px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(136, 136, 136, 1);
        display: flex;
        align-items: center;
    }

    .detail_analysis {
        width: 60px;
        height: 30px;
        background: rgba(43, 127, 243, 1);
        border-radius: 15px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);


    }

    .position_button div:nth-child(1) {
        width: 70px;
        height: 27px;
        background: rgba(210, 38, 66, 0.1);
        border-radius: 18px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(210, 38, 66, 1);
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .position_button div:nth-child(2) {
        width: 70px;
        height: 27px;
        background: rgba(26, 204, 131, 0.1);
        border-radius: 18px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(26, 204, 131, 1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .router_warn {
        width: 105px;
        height: 20px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(33, 33, 33, 1);
    }

    .top_bottom_word {
        margin: 20px 0px;
    }

    .warn_problem {
        width: 70px;
        height: 13px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        margin-bottom: 10px;
        color: rgba(136, 136, 136, 1);
    }

    .warn_describe {
        width: 100px;
        height: 13px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: black;
    }

    .detail_word {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(43, 127, 243, 1);
        width: 75px;
        height: 25px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 21px 0px rgba(0, 0, 0, 0.2);
        border-radius: 13px;
    }

    .item_bottom {
        display: flex;
        align-items: center;
        height: 47px;
        padding: 0px 10px;
        background-color: white;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        .icons {
            display: flex;
            flex-grow: 1;

            .item1 {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 64px;
                height: 26px;
                border-radius: 13px;
                margin-right: 16px;
                background: rgba(248, 146, 0, 0.1);
                font-size: 13px;
                font-weight: bold;
                color: rgba(248, 146, 0, 1);

                img {
                    width: 14px;
                    height: 12px;
                    margin-right: 6px;
                }
            }
        .item11{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 26px;
            border-radius: 13px;
            margin-right: 16px;
            background:rgba(255,94,57,0.1);
            font-size: 13px;
            font-weight: bold;
            color:rgba(255,94,57,1);

            img {
                width: 14px;
                height: 12px;
                margin-right: 6px;
            }
        }
            .item12{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 64px;
                height: 26px;
                border-radius: 13px;
                margin-right: 16px;
                background:rgba(210,38,66,0.1);
                font-size: 13px;
                font-weight: bold;
                color:#D22642;

                img {
                    width: 14px;
                    height: 12px;
                    margin-right: 6px;
                }
            }

            .item2 {
                width: 64px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                border-radius: 13px;
                font-size: 13px;
                background: rgba(210, 38, 66, 0.1);
                font-weight: bold;
                color: rgba(210, 38, 66, 1);
            }
        }

        .time {
            font-size: 13px;
            font-family: PingFangSCMedium;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            width: 140px;
            height: 20px;
        }
    }

    .style_box {


        .title_word {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(43, 127, 243, 1);

            .unit {
                color: rgba(43, 127, 243, 1);
            }
        }

        .warn_status {
            font-size: 24px;
            margin-top: 5px;
            font-family: DIN;
            font-weight: bold;
            color: rgba(43, 127, 243, 1);
        }

        .style_box_position {
            position: absolute;
            top: 0px;
            right: 0px;
            height: 0px;
            width: 0px;
            border-top: 15px solid rgba(43, 127, 243, 1);
            border-left: 15px solid transparent;
            border-right: 15px solid rgba(43, 127, 243, 1);
            border-bottom: 15px solid transparent;
            border-top-right-radius: 5px;
        }

        .icon_size {
            position: absolute;
            top: 2px;
            right: 1px;
            width: 15px;
            height: 12px;
        }

        .title_word {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(119, 119, 119, 1);
        }

        .warn_status {
            font-size: 24px;
            margin-top: 5px;
            font-family: DIN;
            font-weight: bold;
            color: rgba(33, 33, 33, 1);
        }
    }

    .style_box1 {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 5px;
        padding: 10px 10px;

        .title_word {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(119, 119, 119, 1);

            .unit {
                color: rgba(119, 119, 119, 0.5);
            }
        }

        .warn_status {
            font-size: 24px;
            margin-top: 5px;
            font-family: DIN;
            font-weight: bold;
            color: rgba(33, 33, 33, 1);
        }
    }

</style>