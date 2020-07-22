<template>
    <div class="t_page">
        <XHeader class="header" :left-options="{ preventGoBack:true, backText: '' }" @on-click-back="$router.goBack()">
            {{tabType===0 ? '报警快照分析':'报警快照报表'}}
            <div class="right-box" slot="right">
                <img src="../../assets/images/index1/share.png" />
                <img src="../../assets/images/index1/clip.png" />
            </div>
        </XHeader>
        <div class="project-page">

            <div class="type-tab">
                <div class="tab-box" :class="tabType===0 ? 'active' : '' " @click="tabChange(0)"><span>分析</span><div class="line"></div></div>
                <div class="tab-box" :class="tabType===1 ? 'active' : '' " @click="tabChange(1)"><span>报表</span><div class="line"></div></div>
            </div>
            <template v-if="tabType===1">
                <div class="table-box">
                    <x-table class="table-con" :cell-bordered="false" :content-bordered="false">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>时间</th>
                            <th>报警状态</th>
                        </tr>
                        </thead>
                        <tbody class="tbody">
                        <tr v-for="(item,index) in tableDataList" :key="item.series">
                            <td>{{index+1}}</td>
                            <td>{{item.date}}</td>
                            <td>{{item.level}}</td>
                        </tr>
                        </tbody>
                    </x-table>
                </div>

            </template>
            <template v-else>
                <div class="tabs_right">
                    <div class="tab_style">
                        <div class="uf jc ac cycle_Color" @click="tabsActive=0" :class="{tabbgColor:tabsActive===0}">合图</div>
                        <div class="uf jc ac cycle_Color" @click="tabsActive=1" :class="{tabbgColor1:tabsActive===1}">分图</div>
                    </div>
                </div>
                <div class="baobiao" v-if="tabsActive===0">
                    <div class="all-mon">
                        <div class="pillar-box">
                            <echarts :options="chartOption"/>
                        </div>
                    </div>
                </div>
                <div class="baobiao" v-else v-for="(item,index) in chartOptionList" :key="index">
                    <div class="all-mon">
                        <div class="pillar-box">
                            <echarts :options="item"/>
                        </div>
                    </div>
                </div>
            </template>
            <div class="options">
                <!--          <div class="option-box">-->
                <!--            <div class="label-name">采集周期：</div>-->
                <!--            <el-select v-model="select2" class="select-box">-->
                <!--              <el-option-->
                <!--                      v-for="item in options2"-->
                <!--                      :key="item.value"-->
                <!--                      :label="item.label"-->
                <!--                      :value="item.value">-->
                <!--              </el-option>-->
                <!--              <div class="el-icon-caret-bottom" slot=""></div>-->
                <!--            </el-select>-->
                <!--          </div>-->
                <div class="option-box" @click="showPopup(1)">
                    <div class="label-name">起始时间：</div>
                    <div class="content">{{Tools.Date.TimeFormat(startDate,'ymdhm')}}</div>
                    <div class="el-icon-caret-bottom sanjiao"></div>
                </div>
                <div class="option-box" @click="showPopup(2)">
                    <div class="label-name">终止时间：</div>
                    <div class="content">{{Tools.Date.TimeFormat(endDate,'ymdhm')}}</div>
                    <div class="el-icon-caret-bottom sanjiao"></div>
                </div>
            </div>
            <div class="search-btn" @click="clickButton">{{tabType===1?'查询':'分析'}}</div>
            <div class="timer">
                <img src="../../assets/images/index1/timer-icon.png"/>
                <span>2019-06-06  12:26:00</span>
            </div>
        </div>


        <Popup
                v-model="show1"
                position="bottom"
        >
            <DatetimePicker
                    :value="startDate"
                    :filter="filter1"
                    type="datetime"
                    :max-date="endDate"
                    @cancel="show1=false"
                    @confirm="startDateOk"
            />
        </Popup>
        <Popup
                v-model="show2"
                position="bottom"
        >
            <DatetimePicker
                    :value="endDate"
                    :filter="filter1"
                    type="datetime"
                    :min-date="startDate"
                    @cancel="show2=false"
                    @confirm="endDateOk"
            />
        </Popup>
    </div>
</template>

<script>
    // 1、开始时间和结束时间不能大于一年
    // 2、开始时间和结束时间小于等于一年大于1个月，按月统计；步长1个月
    // 3、开始时间和结束时间小于等于一个月大于1天，按天统计；步长一天
    // 4、开始时间和结束时间小于等于1天大于一小时，按小时统计，步长1小时
    // 5、开始时间和结束时间小于等于1小时，按分统计，步长5分钟
    import Vue from 'vue'
    import { DatetimePlugin } from 'vux'
    Vue.use(DatetimePlugin)
    import { XHeader,Datetime,XButton,Toast,XTable, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Tabbar, TabbarItem, Group, Cell,XInput,
        VChart, VLine, VArea, VTooltip, VLegend, VPie, VGuide, VBar, VScale, VPoint } from "vux";
    import {DatetimePicker, Popup} from 'vant';
    import echarts from '../../components/echarts'
    import {getOption} from "./chartOptions/analysisAll"
    import {getOption as getLineOption} from "./chartOptions/analysisOne"
    let colors = ['#B41736','#273DDC','#1ACC83','#FFAA47','#AA54F2','#00CCFF']
    //渐变颜色
    import  warns  from '../Warn/warn.js'
    export default {
        components: {
            XHeader,
            Datetime,
            Group,
            XInput,
            XButton,
            Toast,
            XTable,
            VChart,
            VLine,
            VArea,
            VTooltip,
            VLegend,
            VBar,
            VGuide,
            VPie,
            VScale,
            VPoint,
            echarts,
            DatetimePicker,
            Popup
        },
        data(){
            return{
                level: 0,
                tabType: 0,
                startTime:'',
                endTime:'',
                tableDataList:[],
                chartOption:{},
                chartOptionList:[{},{},{},{}],
                tabsActive:0,
                dateIndex: 0,
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                startMinDate: '',
                startDate: '',
                endDate: '',
                options: [{
                    value: 0,
                    label: '警告'
                }, {
                    value: 1,
                    label: '报警'
                }, {
                    value: 2,
                    label: '故障'
                }, {
                    value: 3,
                    label: '离线'
                }],
                select2:5,
                options2: [{
                    value: 5,
                    label: '5分钟'
                }, {
                    value: 10,
                    label: '10分钟'
                }, {
                    value: 30,
                    label: '30分钟'
                }, {
                    value: 60,
                    label: '1小时'
                }],
                select3:''
            }
        },
        computed: {
            getTypeName(){
                for (let i = 0; i < this.options.length; i++) {
                    if(this.options[i].value === this.level){
                        return this.options[i].label + '数'
                    }
                }
                return ''
            },
            limitEndTime() {
                let time = this.Tools.Date.getDateDistanceToOneTimeByMinute(this.startDate, 30);
                return time;
            }
        },
        methods:{
            filter1(type, options) {
                let date = new Date();
                if (type === 'hour') {
                    // return options.filter(option => option >= date.getHours())
                }
                if (type === 'minute') {
                    return options.filter(option => option % 5 === 0)
                }
                return options;
            },
            filter2(type, options) {
                if (this.startTime) {
                    let hour = Number(this.startTime.split(':')[0]);
                    let minute = Number(this.startTime.split(':')[1]);
                    if (type === 'hour') {
                        return options.filter(option => option >= hour)
                    }
                    if (type === 'minute') {
                        return options.filter(option => option % 30 === 0)
                    }
                } else {
                    let date = new Date();
                    if (type === 'hour') {
                        return options.filter(option => option > date.getHours())
                    }
                    if (type === 'minute') {
                        return options.filter(option => option % 30 === 0)
                    }
                }

                return options;
            },
            startDateOk(value) {
                this.show1 = false;
                this.startDate = value;
            },
            endDateOk(value) {
                this.show2 = false;
                this.endDate = value;
            },
            showPopup(value) {
                if (value === 2 && !this.startDate) {
                    this.$toast('请先选择开始时间');
                    return false;
                }
                this.dateIndex = value;
                this['show' + value] = true;
            },
            //点击查询或者分析按钮
            clickButton(){
                this.initData()
            },
            //获取报表数据
            initData(){
                warns.warnAnalysisFun({
                    "thingId":sessionStorage.getItem('thingId'),
                    "variableIds":this.checkList,
                    "beginTime":this.startDate,
                    "endTime":this.endDate,
                }).then(res=>{
                    let legendList = []
                    let seriesDataList = []
                    let xList = []
                    let chartOptionList = []

                    if(res.code === 0){
                        this.tableDataList = res.data.alarmSnapshotModels || []
                        for (let i = 0; i < this.tableDataList.length; i++) {
                            seriesDataList.push([])
                            xList.push([])
                        }
                        this.tableDataList.forEach((item,index)=>{
                            legendList.push(item.name)
                            item.modelDetails.forEach(model=>{
                                seriesDataList[index].push(Number(model.value))
                                xList[index].push(model.time)
                            })
                        })

                    }else{
                        this.tableDataList = []
                    }
                    console.log('xList',xList)
                    this.chartOption = getOption({
                        legendList:legendList,
                        seriesDataList:seriesDataList,
                        xAxisDataList:[xList[0]],
                        colors,
                    })
                    legendList.forEach((item,index)=>{
                        chartOptionList.push(getLineOption({
                            legendList:[legendList[index]],
                            seriesDataList:[seriesDataList[index]],
                            xAxisDataList:[xList[index]],
                            colors:[colors[index]],
                        }))
                    })
                    this.chartOptionList=chartOptionList
                })
            },
            tabChange(nub){
                this.tabType = nub
            },
        },
        created() {
            this.checkList = this.$route.params.checkList
            this.endDate = this.Tools.Date.getDayDistanceToToday(0);
            this.startDate = this.Tools.Date.getDayDistanceToToday(-30);
            this.initData()
        }
    }
</script>

<style lang="less" scoped>
    .uf{
        display: flex;
    }
    .jc{
        justify-content: center;
    }
    .ac{
        align-items: center;
    }
    .header{
        /deep/ .el-input__inner{
            background: none;
            font-size: 18px;
            color: #333333;
            font-weight: bold;
        }
        /deep/ .el-input .el-select__caret{
            color: #2B7FF3;
            font-size: 18px;
        }
        /deep/ .vux-header-right{
            height: 100%;
            top: 0;
        }
        .right-box{
            display: flex;
            height: 100%;
            align-items: center;
            img{
                width: 29px;
                height: 29px;
                &:nth-child(1){
                    margin-right: 12px;
                }
            }
        }
    }
    .project-page{
        height: 100%;
        overflow-y: auto;
        padding-bottom: 60px;
        .tabs_right{
            display: flex;
            justify-content: flex-end;
            margin: 20px 10px;
            .tab_style{
                height: 30px;
                width: 128px;
                background-color: rgba(222,222,224,1);
                border-radius: 15px;
                display: flex;
                flex-direction: row;
                .cycle_Color{
                    width:64px;
                    height:30px;
                    font-size: 16px;
                }
                .tabbgColor{
                    width:64px;
                    height:30px;
                    background:rgba(43,127,243,1);
                    border-radius:15px;
                    font-size: 16px;
                    color: rgba(255,255,255,0.9);
                }
                .tabbgColor1{
                    width:64px;
                    height:30px;
                    background:rgba(43,127,243,1);
                    border-radius:15px;
                    font-size: 16px;
                    color: rgba(255,255,255,0.9);
                }
            }
        }
        .baobiao{
            .all-mon{
                width: 345px;
                margin: 15px auto;
                padding: 10px;
                border-radius: 5px;
                background: #ffffff;
                box-sizing: border-box;
                .title{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 18px;
                    div{
                        &:nth-child(1){
                            font-size: 21px;
                            font-weight: bold;
                            color: #ffffff;
                        }
                        &:nth-child(2){
                            padding: 6px 13px;
                            border-radius: 13px;
                            background: rgba(255,255,255,0.2);
                            font-size: 13px;
                            color: #ffffff;
                            display: flex;
                            align-items: center;
                            padding-right: 8px;
                            .back-icon{
                                fill: #ffffff;
                            }
                        }
                    }
                }
                .chart-box{
                    height: 140px;
                    margin: 0 auto;
                    border-radius: 5px;
                    background: #ffffff;
                    box-sizing: border-box;
                    &.mb13{
                        margin-bottom: 13px;
                    }
                }
                .pillar-box{
                    height: 382px;
                    margin: 0 auto;
                    overflow: hidden;

                    .chart-box{
                        margin: 0 auto;
                    }
                }

            }
        }
        .options{
            width: 345px;
            margin: 0 auto;
            border-radius: 5px;
            background: #ffffff;
            .option-box{
                display: flex;
                align-items: center;
                height: 45px;
                border-bottom: 1px solid #F2F2F5;
                .label-name{
                    width: 107px;
                    color: #999999;
                    font-size: 14px;
                    text-align: center;
                }
                .content{
                    flex: 1;
                    font-size: 14px;
                    color: #333333;
                }
                .select-box{
                    flex: 1;
                    padding-right: 16px;
                    /deep/ .el-input__inner {
                        background: #ffffff;
                        border: none;
                        font-size: 14px;
                        color: #333333;
                    }
                }
                .content{
                    flex-grow: 1;
                    font-size: 14px;
                    color: #333333;
                    padding-left: 15px;
                }
                .sanjiao{
                    margin-right: 20px;
                    color: #2B7FF3;
                }
            }
        }
        .search-btn{
            width: 345px;
            height: 41px;
            line-height: 41px;
            text-align: center;
            background: #2B7FF3;
            color: #ffffff;
            font-size: 17px;
            margin: 15px auto;
            border-radius: 5px;
        }
        .type-tab{
            display: flex;
            align-items: center;
            height: 40px;
            background: #ffffff;
            border-radius: 5px;
            margin: 15px 15px 0 15px;
            .tab-box{
                flex: 1;
                height: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                color: #313131;
                position: relative;
                span{
                    display: block;
                    width: 100%;
                    height: 18px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .line{
                    width: 18px;
                    height: 3px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    background: #FFFFFF;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -9px;
                }
                &.active{
                    color: #2B7FF3;
                    font-weight: bold;
                    .line{
                        background: #2B7FF3;
                    }
                }
                &:first-child{
                    span{
                        border-right: 1px solid #E8E8EB;
                    }
                }
            }
        }

        .table-box{
            padding: 17px 15px 15px 15px;
            /deep/ .vux-table td:before, .vux-table th:before{
                border-bottom: none;
            }
            .table-con{
                border-radius: 5px;
                background: #ffffff;
                thead{
                    color:#999999;
                }
                tbody{
                    height: 500px;
                    overflow-y: auto;
                    tr{
                        &:nth-child(2n+1){
                            background: #F7F7FA;
                        }
                    }
                }
            }
            .table-footer{
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                height: 61px;
                line-height: 61px;
                background: #ffffff;
                font-size: 13px;
                color: #888888;
                text-align: right;
                padding: 0 27px;
                span{
                    font-size: 21px;
                    color: #2B7FF3;
                }

            }
        }
        .timer{
            display: flex;
            padding: 0 15px;
            align-items: center;
            font-size: 13px;
            color: #ABABAB;
            img{
                margin-right: 8px;
                width: 13px;
                height:13px;
            }
        }

    }

</style>
