<template>
    <div class="ehcart" ref="echart"></div>
</template>
<style media="screen">
    .ehcart {
        height: 100%;
    }
</style>
<script>
    // 引入 数据流方法
    let echarts = require('echarts')
    export default {
        name: 'echart',
        data: function () {
            return {
                tableHeight: '',
                isChart: false,
                linOption: true,
                NOMAPOPTION: []
            }
        },
        props: {
            options: {
                type: Object
            },
            chartType: {}
        },
        watch: {
            options: function (newOptions) {
                this.myChart.setOption(newOptions)

                this.resize()

                var that = this

                window.addEventListener("resize", () => {
                    that.resize()
                })
            }
        },
        mounted() {

            this.myChart = echarts.init(this.$refs.echart)
            if (this.options !== null) {
                this.myChart.setOption(this.options)
                var that = this

                window.addEventListener("resize", () => {
                    that.resize()
                })
            }
        },
        methods: {
            resize() {
                this.myChart.resize()
            },
        }
    }
</script>
