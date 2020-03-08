<template>
    <div class="t_page">
        <x-header
                :title="actTitle"
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
        >
        </x-header>
        <div class="pageContent">
            <div class="padding_lrt15px">
                <div class="t_tabs uf dr js jc ac">
                    <div class="uf  jc ac dc"  @click="tabColor" v-bind:class="{activefont1:isActive}">分析</div>
                    <div class="uf  jc ac" @click="tabColor1" v-bind:class="{activefont2:isTab}">报表</div>
                    <div class="uf t_ridus"  v-bind:class="{activeColor1:isActive}"></div>
                    <div class="uf t_ridus" v-bind:class="{activeColor2:isTab}"></div>
                </div>
            </div>
            <div  v-if="isActive"  class="tabs_right">
                <div class="tab_style">
                    <div class="uf jc ac cycle_Color" @click="tabColorFun()" :class="{tabbgColor:tabsActive}">合图</div>
                    <div class="uf jc ac cycle_Color"  @click="tabColorFun1()" :class="{tabbgColor1:tabsActive1}">分图</div>
                </div>
            </div>
            <div  v-if="isActive">
                <div  v-if="tabsActive" class="ReportEcharts">
                <WarnReport :echartsList="echartsList"></WarnReport>
                </div>
                <div   v-if="!tabsActive && echartsList.length > 0" class="ReportEcharts">
                <WaterTem :echartsList="echartsList[0]"></WaterTem>
                </div>
                <div  v-if="!tabsActive && echartsList.length > 1" class="ReportEcharts">
                <WaterPre :echartsList="echartsList[1]"></WaterPre>
                </div>
                <div   v-if="!tabsActive && echartsList.length > 2" class="ReportEcharts">
                <WaterTra :echartsList="echartsList[2]"></WaterTra>
                </div>
                <div   v-if="!tabsActive && echartsList.length > 3" class="ReportEcharts">
                <BackwaterTem :echartsList="echartsList[3]"></BackwaterTem>
                </div>
                <div   v-if="!tabsActive && echartsList.length > 4" class="ReportEcharts">
                <BackwaterPre :echartsList="echartsList[4]"></BackwaterPre>
                </div>
                <div   v-if="!tabsActive && echartsList.length > 5" class="ReportEcharts">
                <BackwaterTra :echartsList="echartsList[5]"></BackwaterTra>
                </div>
                <Group v-if="isActive"  class="data_width">
                    <div class="t_position">
                        <div class="data_bottom">
                            <datetime v-model="minuteListValue1" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="$t('EchartsReport.startTime')"></datetime>
                        </div>
                        <div>
                            <datetime v-model="minuteListValue2" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="$t('EchartsReport.endTime')"></datetime>
                        </div>
                    </div>
                </Group >
                <div v-if="isActive" style="padding:15px;margin-bottom: 25px">
                    <x-button type="primary" @click.native="AnalysisFun">分析</x-button>
                </div>
            </div>

            <ReportAnalysis v-if="!isActive" ></ReportAnalysis>
        </div>
    </div>
</template>

<script>
    import {
        XHeader,
        Group,
        XButton,
        Datetime,
        Cell,
        CellFormPreview,
        ButtonTab,
        ButtonTabItem
    } from 'vux'
    import WarnReport from './WarnPhotoAnaLysis';
    import WaterTem from './PointsIcon/WaterTemperature';
    import WaterTra from './PointsIcon/WaterPressure';
    import WaterPre from './PointsIcon/WaterTraffic';
    import BackwaterTem from './PointsIcon/BackwaterTemperature';
    import BackwaterPre from './PointsIcon/BackwaterPressure';
    import BackwaterTra from './PointsIcon/BackwaterTraffic';
    import ReportAnalysis from './ReportPhotoAnalysis'
    import  warns  from '../Warn/warn.js'
    // 组件内使用
    export default {
        name: "WarnPhotoReport",
        components: {
            ReportAnalysis,
            WaterTem,
            WaterPre,
            WaterTra,
            BackwaterTem,
            BackwaterPre,
            BackwaterTra,
            XHeader,
            WarnReport,
            Group,
            Cell,
            XButton,
            Datetime,
            CellFormPreview,
            ButtonTab,
            ButtonTabItem
        },
        data() {
            return {
                isActive:true,
                isTab:false,
                itemColor:false,
                tabsActive:true,
                tabsActive1:false,
                echartsList:[],
                value1: '',
                value2:'',
                hColor:'',
                minuteListValue1:'2017-06-12 09:00',
                minuteListValue2:'2017-06-12 09:00',
                minuteListValue:'05',
                actTitle:'报警快照分析',

            }
        },
        created(){
            this.getRepontAnalysisFun();
        },
        methods: {
            getRepontAnalysisFun(){
                this.echartsList = [];
                warns.warnAnalysisFun(this.$store.state.checkList,this.minuteListValue1,this.minuteListValue2).then(respont=>{
                   if(respont.code === 0 && Array.isArray(respont.data.alarmSnapshotModels) && respont.data.alarmSnapshotModels.length > 0){
                       this.echartsList = respont.data.alarmSnapshotModels;
                   }
                }).catch(res=>{})
            },
            consoleIndex() {

            },
            tabColor(){
                this.isActive = true;
                this.isTab = false;
                this.actTitle='报警快照分析'
                this.getRepontAnalysisFun();
            },
            tabColor1(){
                this.isActive = false;
                this.isTab = true;
                this.actTitle='报警折线图'
            },
            AnalysisFun(){
                if(!this.isTab){
                    this.getRepontAnalysisFun();
                }else {}
            },
            tabColorFun(){
                this.tabsActive = true;
                this.tabsActive1 = false;
            },
            tabColorFun1(){
                this.tabsActive = false;
                this.tabsActive1 = true;
            },
            change (value) {
                console.log('change', value)
            },
        }
    }
</script>
<style lang="less" scoped>
    .js{
        justify-content: flex-start;
    }
    .je{
        justify-content: flex-end;
    }
    .tabs_right{
        display: flex;
        justify-content: flex-end;
        margin: 20px 10px;
    }
    .tab_style{
        height: 30px;
        width: 128px;
        background-color: rgba(222,222,224,1);
        border-radius: 15px;
        display: flex;
        flex-direction: row;
    }
    .pageContent{
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow-x: scroll;
    }
    /deep/.weui-btn_primary{
        background-color: rgba(43, 127, 243, 1) !important;
        border-radius: 7px !important;
        height: 44px;
    }
    .t_page /deep/ .el-date-editor.el-input, .t_page .el-date-editor /deep/.el-input__inner{
        width: 100%;
        text-align: center;
    }
    .el-input--mini /deep/.el-input__inner{
        height: 45px;
        line-height: 45px;
        border-radius: 0px;
        border: 0px;
    }
    .t_page /deep/ .el-input__inner{
        background-color: transparent;
    }
    /deep/ .vux-header-title span {
        color: black;
    }
    @button-tab-border-radius: 3px;
    .activefont1{
        color: rgba(43, 127, 243, 1);
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
    .cycle_Color{
        width:64px;
        height:30px;
        font-size: 16px;
    }
    .t_position{
        position: relative;
        height: 66px;
        border: 0px !important;
        background-color: white !important;
        border-radius: 0px !important;
    }
    .data_bottom{
        height: clac(45px - 1px);
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .padding_lrt15px {
        padding: 15px 0px 0 0px;
        margin: 0px 10px;
    }
    .data_width{
        width: clac(100% - 30px);
        margin: 0px 10px;
        height: 100px;
        background-color: white;
        border-radius: 5px;
    }
    .ReportEcharts{
        width: clac(100% - 40px);
        margin: 10px 10px;
        padding: 10px 0px;
        background-color: white;
        height: 300px;
        border-radius: 5px;
    }
    .activefont2{
        color: rgba(43, 127, 243, 1);
    }
    .activeColor1{
        position: absolute;
        bottom: 0px;
        width: 18px;
        height: 3px;
        left: calc(25% - 13px);
        background-color: rgba(43, 127, 243, 1);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .activeColor2{
        position: absolute;
        bottom: 0px;
        width: 18px;
        height: 3px;
        left: calc(75% - 13px);
        background-color: rgba(43, 127, 243, 1);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .uf{
        display: flex;
    }
    .jf{
        justify-content: center;
    }
    .dr{
        flex-direction: row;
    }
    .t_tabs{
        width: 100%;
        height: 40px;
        background-color: white;
        position: relative;
        border-radius: 5px;
    }
    /deep/.weui-cells:after{
        border-bottom: 0px;
    }
    /deep/.weui-cells{
        height: 100%;
        font-size: 14px;
    }
    /deep/.weui-cell{
        height: 30px;
    }
    /deep/.vux-datetime{
        color: hsla(0, 0%, 60%, 1);;
    }
    .t_tabs :nth-child(1){
        border: 0px;
        height: 70%;
        border-right:1px solid rgba(0,0,0,0.1);
        width: calc(50% - 1px);
        position: relative;
    }
    .t_margin_icon{
        margin-right: 22px;
        color: rgba(43, 127, 243, 1);
    }
    .t_tabs :nth-child(2){
        border: 0px;
        width: 50%;
        height: 70%;
    }
    .f1{
        flex: 1;
    }
    .ac{
        align-items: center;
    }
    .jc{
        justify-content: center;
    }
    .active {
        background-color: rgba(0, 0, 0, 0.1);
    }
    .dc{
        flex-direction: column;
    }
</style>