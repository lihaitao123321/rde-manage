<template>
    <div style="height: 100%;width: 100%" id="WarnReport"></div>
</template>

<script>
    import echarts from "echarts";
    import Vue from "vue";
    Vue.prototype.$echarts = echarts;
    export default {
        props:{
            echartsList:{
                type:Array,
                default:function () {
                    return [];
                }
            }
        },
        watch:{
            echartsList(){
                if(Array.isArray(this.echartsList) && this.echartsList.length > 0){
                    this.init();
                }
            }
        },
        name: "ElectricityAnalysis",
        methods:{
          async  init(){
              let echartsNameList = [];let echartsNameObj = {};
              let echartsDataList = []; let echartsDataObj = {};
              let timeList = [];
           if(Array.isArray(this.echartsList) && this.echartsList.length > 0){
           this.echartsList[0].modelDetails.forEach(item=>{
               timeList.push(item.time);
           });
                   echartsNameList = [];
              this.echartsList.forEach(item=>{
                        echartsNameObj = {};
                        echartsNameObj.name = item.name;
                        echartsNameObj.icon = 'circle';
                        echartsNameObj.textStyle = {};
                        echartsNameList.push(echartsNameObj);
                    });
                   echartsNameList = JSON.parse(JSON.stringify(echartsNameList));
              this.echartsList.forEach(item=>{
                       echartsDataObj = {};
                       echartsDataObj.name = item.name;
                       echartsDataObj.type = 'line';
                       let dataList = [];
                       if(Array.isArray(item.modelDetails) && item.modelDetails.length > 0){
                           item.modelDetails.forEach(item1=>{
                               dataList.push(item1.value);
                           })
                       }
                       echartsDataObj.data = dataList;
                       echartsDataObj.smooth = true;
                  echartsDataList.push(echartsDataObj);
                   });
                }
                var myCharts = echarts.init(document.getElementById("WarnReport"));

               await myCharts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        align:'left',
                        width:260,
                        right:20,
                        data:echartsNameList,
                        //     [{
                        //    name: '供水温度',
                        //     icon:'circle',
                        //     textStyle:{
                        //     },
                        // },{
                        //     name: '供水流量',
                        //     icon:'circle',
                        //     textStyle:{
                        //     },
                        // },{
                        //     name: '供水压力',
                        //     icon:'circle',
                        //     textStyle:{
                        //     },
                        // }, {
                        //     name: '回水温度',
                        //     icon:'circle',
                        //     textStyle:{
                        //     },
                        // },{
                        //     name: '回水压力',
                        //     icon:'circle',
                        //     textStyle:{
                        //     },
                        // },{
                        //     name: '回水流量',
                        //     icon:'circle',
                        //     textStyle:{
                        //     },
                        // }],
                        itemWidth:9,
                        itemHeight:9,
                        fontSize:13,
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        // axisLabel:{
                        //     interval:1,
                        // },
                        // data: ['2017:07-10  13:00:00', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15'],
                        data:timeList,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    dataZoom:[
                        // {
                        //     type: 'inside',
                        //     xAxisIndex: [0],
                        //     start: 20,
                        //     end: 80
                        // },
                        {
                            fillerColor:'rgba(145,222,228,0.8)',
                            backgroundColor:'hsla(240, 9%, 94%, 1)',
                            show: true,
                            xAxisIndex: [0],
                            type: 'slider',
                            top: '85%',
                            left:20,
                            right:20,
                            start: 20,
                            end: 80
                        }
                    ],
                    series:echartsDataList,
                        // [
                    //     {
                    //         name:'供水温度',
                    //         type:'line',
                    //         data:[10, 12, 21, 32, 30, 32, 10,12,10,13,10,14,34,22,12,23],
                    //         smooth: true
                    //         // areaStyle: {}
                    //     },
                    //     {
                    //         name:'供水压力',
                    //         type:'line',
                    //         data:[12, 21, 32, 30, 32, 10,12,10,13,10,14,34,22,12,23,34],
                    //         smooth: true
                    //         // areaStyle: {}
                    //     }, {
                    //         name:'供水流量',
                    //         type:'line',
                    //         data:[21, 32, 30, 32, 10,12,10,13,10,14,34,22,12,23,34,23],
                    //         smooth: true
                    //         // areaStyle: {}
                    //     },
                    //     {
                    //         name:'回水温度',
                    //         type:'line',
                    //         data:[32, 30, 32, 10,12,10,13,10,14,34,22,12,23,34,23,35],
                    //         smooth: true
                    //         // areaStyle: {}
                    //     },
                    //     {
                    //         name:'回水压力',
                    //         type:'line',
                    //         data:[30, 32, 10,12,10,13,10,14,34,22,12,23,34,23,35,18],
                    //         smooth: true
                    //         // areaStyle: {}
                    //     },
                    //     {
                    //         name:'回水流量',
                    //         type:'line',
                    //         data:[32, 10,12,10,13,10,14,34,22,12,23,34,23,35,18,30],
                    //         smooth: true
                    //         // areaStyle: {}
                    //     }
                    // ],
                });
                window.addEventListener("resize", function() {
                    myCharts.resize();
                });
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>

</style>