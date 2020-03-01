<template>
    <div style="height: 100%;width: 100%" id="WaterPressure"></div>
</template>

<script>
    import echarts from "echarts";
    import Vue from "vue";
    Vue.prototype.$echarts = echarts;
    export default {
        name: "WaterPressure",
        props:{
            echartsList:{
                type:Object,
                default:function () {
                    return {}
                }
            }
        },
        watch:{
            echartsList(){
                if(Array.isArray(this.echartsList.modelDetails) && this.echartsList.modelDetails.lenth > 0){
                    this.init();
                }
            }
        },
        methods:{
            init(){
                let dataNameList = []; let dataNameObj = {};
                let timeList = [];
                let dataList = []; let dataObj = {};
                let dataInnerList = [];
                if(Array.isArray(this.echartsList.modelDetails) && this.echartsList.modelDetails.length > 0){
                    dataNameObj = {};
                    dataNameObj.name = this.echartsList.name;
                    dataNameObj.icon = 'circle',
                        dataNameObj.textStyle = {}
                    dataNameList.push(dataNameObj);

                    this.echartsList.modelDetails.forEach(item=>{
                        timeList.push(item.time);
                    });
                    dataObj.name = this.echartsList.name;
                    dataObj.type = 'line',
                        this.echartsList.modelDetails.forEach(item=>{
                            dataInnerList.push(item.value);
                        });
                    dataObj.data = dataInnerList;
                    dataObj.smooth = true;
                    dataList.push(dataObj);
                }
                var myCharts = echarts.init(document.getElementById("WaterPressure"));
                myCharts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        align:'left',
                        top:10,
                        left:20,
                        data:dataNameList,
                        //     [{
                        //     name: '供水压力',
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
                        // name:'Pa',
                        name:this.echartsList.unit,
                        nameGap:5,
                        axisLabel:{
                            formatter(val) {
                                return (val) + "";
                            }
                        },
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
                    series: dataList,
                    //     [
                    //     {
                    //         name:'供水压力',
                    //         type:'line',
                    //         data:[12, 21, 32, 30, 32, 10,12,10,13,10,14,34,22,12,23,34],
                    //         smooth: true,
                    //         areaStyle: {}
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