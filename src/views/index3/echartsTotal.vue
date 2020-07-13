<template>
    <div style="height: 100%;width: 100%" id="echartsTotal"></div>
</template>

<script>
    import echarts from "echarts";
    import Vue from "vue";
    Vue.prototype.$echarts = echarts;
    export default {
        name: "echartsTotal",
        props:{
            detailList:{
                type:Array,
                default:function () {echartsTotal
                    return []
                }
            }
        },
        watch:{
            detailList(){
                this.init();
            }
        },
        methods:{
            init(){
                var myCharts = echarts.init(document.getElementById("echartsTotal"));
                let detailList = [];
                let detailTime = [];
                if(Array.isArray(this.detailList) && this.detailList.length > 0){
                    this.detailList.forEach(item=>{
                        detailList.push(item.level || Math.random()>0.5?1:0);
                        detailTime.push(item.date);
                    })
                }

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
                        data: detailTime
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
                            data:detailList,
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
