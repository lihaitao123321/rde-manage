<template>
    <div style="height: 100%;width: 100%" id="WaterTemperature"></div>
</template>

<script>
    import echarts from "echarts";
    import Vue from "vue";
    Vue.prototype.$echarts = echarts;
    export default {
        name: "WaterTemperature",
        methods:{
            init(){
                var myCharts = echarts.init(document.getElementById("WaterTemperature"));
                myCharts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        align:'left',
                        top:10,
                        left:20,
                        data:[{
                            name: '供水温度',
                            icon:'circle',
                            textStyle:{
                            },
                        }],
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
                        data: ['2017:07-10  13:00:00', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15'],
                    },
                    yAxis: {
                        type: 'value',
                        name:'℃',
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
                    series: [
                        {
                            name:'供水温度',
                            type:'line',
                            data:[10, 12, 21, 32, 30, 32, 10,12,10,13,10,14,34,22,12,23],
                            smooth: true,
                            areaStyle: {}
                        },
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