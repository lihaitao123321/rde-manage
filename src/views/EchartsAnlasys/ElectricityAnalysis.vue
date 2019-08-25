<template>
    <div style="height: 100%;width: 100%" id="test"></div>
</template>

<script>
    import echarts from "echarts";
    import Vue from "vue";
    Vue.prototype.$echarts = echarts;
    export default {
        name: "ElectricityAnalysis",
        methods:{
            init(){
                var myCharts = echarts.init(document.getElementById("test"));


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
                        data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15']
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
                            data:[10, 132, 10, 132, 10, 132, 10,132,10,132,10,132,10,132,10,132],
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