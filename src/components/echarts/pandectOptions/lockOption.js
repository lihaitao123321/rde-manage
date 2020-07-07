export default function (data) { // 1 series
    data = {
        rate: 10
    }

    var app = {
        currentIndex: -1,
    }

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '25%',
            top: '3%',
            containLabel: true
        },
        legend: {
            data: [{
                name: '目标',
                icon: 'circle'
            }, {
                name: '实际',
                icon: 'circle'
            }, {
                name: '完成率'
            }],
            left: 'center',
            bottom: 10,
            textStyle: {
                color: "rgba(147,151,170,1)",
                fontSize: 12,
                fontFamily: 'Oswald'
            },
            itemWidth: 12,
            itemHeight: 10,
            selectedMode: false
            // itemGap: 35
        },
        xAxis: [
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                data: ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月'],
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)',
                        width: 1,
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                position: 'bottom',
            }, {
                type: 'category',
                splitLine: {
                    show: false
                },
                data: ['2018年', '2018年', '2018年', '2019年', '2019年', '2019年', '2019年', '2019年'],
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)',
                        width: 1,
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                position: 'bottom',
                offset: 30
            }],

        yAxis: {
            type: 'value',
            max: '1200',
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#000',
                    fontSize: '14'
                }
            },
            axisTick: {
                show: false
            }
        },
        dataZoom: [
            {
                type: 'slider',
                show: false,
                xAxisIndex: [0, 1],
                start: 50,
                end: 100,
                zoomLock: true,
            },
            {
                type: 'inside',
                show: false,
                xAxisIndex: [0, 1],
                start: 0,
                end: 100,
                zoomLock: true,
            }
        ],
        series: [{
            name: '目标',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                normal: {
                    color: "rgba(67,126,255,1)"
                }
            },
            data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
        },
            {
                name: '实际',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: "rgba(253,180,52,1)"
                    }
                },
                data: [400, 400, 300, 300, 300, 400, 400, 400, 600]
            },
            {
                name: '完成率',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#FD3854FF',
                        width: 20
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#FD3854FF',
                        width: 1
                    }
                },
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: [400, 500, 500, 500, 500, 400, 1000, 1000, 1000]
            }
        ]
    }
    return {
        Option: option
    }
}
