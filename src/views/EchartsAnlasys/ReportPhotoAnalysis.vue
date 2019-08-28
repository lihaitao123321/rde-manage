<template>
    <div>
        <Group  class="analysis_width">
            <div class="total_num">
                <div class="total_left">
                    <div class="total_font uf js ac">{{$t('EchartsReport.serial')}}</div>
                </div>
                <div class="total_content_left">
                    <div class="total_font uf f1 jc ac">{{$t('EchartsReport.time')}}</div>
                </div>
                <div class="total_content">
                    <div class="total_font uf f1 jc ac">{{$t('EchartsReport.timeKW')}}</div>
                </div>
                <div class="total_content_right">
                    <div total_font uf f1 jc ac>{{$t('EchartsReport.dataTwo')}}</div>
                </div>
                <div class="total_right">
                    <div class="total_font uf f1 jf ac">{{$t('EchartsReport.dataThree')}}</div>
                </div>
            </div>
            <div class="total_num" v-for="(item,index) in list" :class="funColor(index)">
                <div class="total_left">{{item.label}}</div>
                <div class="total_content_left">{{item.time}}</div>
                <div class="total_content">{{item.timeKW}}</div>
                <div class="total_content_right">{{item.dataTwo}}</div>
                <div class="total_right">{{item.dataThree}}</div>
            </div>
        </Group>
        <Group  class="data_width1">
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
        <div  style="padding:15px;margin-bottom: 25px">
            <x-button type="primary" @click="">{{$t('EchartsReport.seach')}}</x-button>
        </div>
    </div>
</template>

<script>
    import {
        Group,
        XButton,
        Datetime,
        Cell,
        CellFormPreview,
        ButtonTab,
        ButtonTabItem
    } from 'vux'
    export default {
        components:{
            Group,
            XButton,
            Datetime,
        },
        name: "ReportPhotoAnalysis",
        data(){
            return{
                hColor:'',
                list: [{
                    label: 1,
                    time:'2019-02-21 00:00:00',
                    timeKW:'350',
                    dataTwo:'350',
                    dataThree: '350',
                }, {
                    label: 2,
                    time:'2019-02-21 00:00:00',
                    timeKW:'310',
                    dataTwo:'310',
                    dataThree: '310',
                }, {
                    label: 3,
                    time:'2019-02-21 00:00:00',
                    timeKW:'290',
                    dataTwo:'290',
                    dataThree: '290',
                }],
                minuteListValue1:'2017-06-12 09:00',
                minuteListValue2:'2017-06-12 09:00',
                minuteListValue:'05',
            }
        },
        methods:{
            funColor(val){
                if(val%2 === 0){
                    return 'hColor';
                }else{
                    return '';
                }
            },
            change (value) {
                console.log('change', value)
            },
        },
    }
</script>

<style lang="less" scoped>
.uf{
    display: flex;
}
    .ac{
        align-items: center;
    }
    .jc{
        justify-content: center;
    }
    .f1{
        flex: 1;
    }
    .dr{
        flex-direction: row;
    }
    .dc{
        flex-direction: column;
    }
    .jf{
        justify-content: flex-end;
    }
    .js{
        justify-content: flex-start;
    }
.analysis_width{
    width: clac(100% - 30px);
    margin: 0px 10px;
    background-color: white;
    border-radius: 5px;
}
.total_num{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 42px;
}
.total_font{
    padding: 10px 10px;
    font-size: 13px;
    color: hsla(0, 0%, 60%, 1);
}
.total_left{
    display: flex;
    width: 70px;
    justify-content: center;
    justify-items: center;
    padding: 10px 10px;
    font-size: 13px;
    color: hsla(0, 0%, 60%, 1);
}
.total_content_left{
    display: flex;
    flex:1;
    justify-content: center;
    justify-items: center;
    padding: 10px 10px;
    font-size: 13px;
    color: hsla(0, 0%, 60%, 1);
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
.total_content_right{
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
    justify-content: center;
    justify-items: center;
    padding: 10px 10px;
    font-size: 13px;
    color: hsla(0, 0%, 60%, 1);
}
.data_width1{
    width: clac(100% - 30px);
    margin: 0px 10px;
    height: 150px;
    background-color: white;
    border-radius: 5px;
}
.hColor{
    background:rgba(247,247,250,1);
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
</style>