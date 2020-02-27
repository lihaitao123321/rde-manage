<template>
    <div class="t_page">
        <x-header
                title="报警折线图"
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
            <div  v-if="isActive"  class="ReportEcharts">
                <ReportAna></ReportAna>
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
                <x-button type="primary" @click="">{{$t('EchartsReport.Analysis')}}</x-button>
            </div>
            <Group v-if="!isActive"  class="analysis_width">
                <div class="total_num">
                    <div class="total_font uf f1 js ac">{{$t('EchartsReport.serial')}}</div>
                    <div class="total_font uf f1 jc ac">{{$t('EchartsReport.time')}}</div>
                    <div class="total_font uf f1 je ac">{{$t('EchartsReport.status')}}</div>
                </div>
                <div class="total_num" v-for="(item,index) in list" :class="funColor(index)">
                    <div class="total_left">{{item.label}}</div>
                    <div class="total_content">{{item.time}}</div>
                    <div class="total_right">{{item.value}}</div>
                </div>
            </Group>
            <Group v-if="!isActive"  class="data_width1">
                <div class="t_position">
                    <div class="data_bottom">
                        <datetime v-model="minuteListValue" format="mm" :minute-list="['05', '10', '15']" @on-change="change" :title="$t('EchartsReport.acqCycle')"></datetime>
            </div>
                    <div class="data_bottom">
                        <datetime v-model="minuteListValue1" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="$t('EchartsReport.startTime')"></datetime>
                    </div>
                    <div>
                        <datetime v-model="minuteListValue2" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="$t('EchartsReport.endTime')"></datetime>
                    </div>
                </div>
            </Group >
            <div v-if="!isActive" style="padding:15px;margin-bottom: 25px">
                <x-button type="primary" @click="">{{$t('EchartsReport.seach')}}</x-button>
            </div>
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
    } from 'vux'
    import ReportAna from './ElectricityAnalysis';
    // 组件内使用
    export default {

        components: {
            XHeader,
            ReportAna,
            Group,
            Cell,
            XButton,
            Datetime,
            CellFormPreview
        },
        data() {
            return {
                isActive:true,
                isTab:false,
                itemColor:false,
                value1: '',
                value2:'',
                hColor:'',
                minuteListValue1:'2017-06-12 09:00',
                minuteListValue2:'2017-06-12 09:00',
                minuteListValue:'05',
                list: [{
                    label: 'Apple',
                    time:'2019-02-21 00:00:00',
                    value: '3.29'
                }, {
                    label: 'Banana',
                    time:'2019-02-21 00:00:00',
                    value: '1.04'
                }, {
                    label: 'Fish',
                    time:'2019-02-21 00:00:00',
                    value: '8.00'
                }],
            }
        },
        methods: {
            consoleIndex() {

            },
            tabColor(){
                this.isActive = true;
                this.isTab = false;
            },
            tabColor1(){
                this.isActive = false;
                this.isTab = true;
            },
            change (value) {
                console.log('change', value)
            },
            funColor(val){
               if(val%2 === 0){
                   return 'hColor';
               }else{
                   return '';
               }
            }
        }
    }
</script>
<style lang="less" scoped>
    .total_num{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 42px;
    }
    .total_left{
        display: flex;
        width: 20%;
        justify-content: flex-start;
        justify-items: center;
        padding: 10px 10px;
        font-size: 13px;
        color: hsla(0, 0%, 60%, 1);
    }
    .total_font{
        padding: 10px 10px;
        font-size: 13px;
        color: hsla(0, 0%, 60%, 1);
    }
    .js{
        justify-content: flex-start;
    }
    .je{
        justify-content: flex-end;
    }
    .hColor{
        background:rgba(247,247,250,1);
    }
    .total_content{
        display: flex;
        flex:1;
        justify-content: center;
        justify-items: center;
        padding: 10px 10px;
        font-size: 13px;
        color: hsla(0, 0%, 60%, 1);
    }
    .total_right{
        display: flex;
        width: 20%;
        justify-content: flex-end;
        justify-items: center;
        padding: 10px 10px;
        font-size: 13px;
        color: hsla(0, 0%, 60%, 1);
    }
    .pageContent{
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow-y: auto;
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
    .data_width1{
        width: clac(100% - 30px);
        margin: 0px 10px;
        height: 150px;
        background-color: white;
        border-radius: 5px;
    }
    .analysis_width{
        width: clac(100% - 30px);
        margin: 0px 10px;
        background-color: white;
        border-radius: 5px;
    }
    .ReportEcharts{
        width: clac(100% - 30px);
        margin: 10px 10px;
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