<template>
    <div style="height: 100%;width: 100%" id="test"></div>
</template>

<script>
    import echarts from "echarts";
    import Vue from "vue";
    Vue.prototype.$echarts = echarts;
    export default {
        name: "ElectricityAnalysis",
        props:{
            chartsList:{
                type:Array,
                default:function () {
                    return []
                }
            }
        },
        methods:{
            init(){
                var myCharts = echarts.init(document.getElementById("test"));
                let chartsList = [];
                let chartsTimeList = [];
                this.chartsList.forEach(item=>{
                    chartsList.push(item.level);
                    chartsTimeList.push(item.date);
                });

                myCharts.setOption({
                    tooltip: {
                        trigger: 'axis'
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
                        data: chartsTimeList
                    },
                    yAxis: {
                        type: 'value'
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
                    series: [
                        {
                            name:'测试',
                            type:'line',
                            step: 'middle',
                            data:chartsList,
                            areaStyle: {}
                        }
                    ],
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