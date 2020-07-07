export default function (data) {
    if (!data) {
        data = {
            xdata: [],
            ydata: [],
            legendData: [],
            seriesData: []
        }
    }
    let option = {
        tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            bottom: 6,
            itemWidth: 10,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: '#9397aa',
                fontSize: 12
            },
            data: data.legendData
        },
        grid: {
            left: '0px',
            right: '0px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.xdata,
            axisLabel: {
                fontFamily: 'oswaldfont-regular',
                color: '#e4e4e6'
            },
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#737379',
                    width: 0.79
                }
            },
            axisTick: {
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: '#737379'
                },
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value',
            // data: data.ydata,
            axisLine: {
                show: false,
            },
            axisLabel: {
                fontFamily: 'oswaldfont-regular',
                show: true,
                color: '#e4e4e6'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: '#5e5d64'
                }
            }
        },
        series: [
            {
                name: '目标',
                type: 'bar',
                barWidth: '60%',
                data: data.seriesData,
                itemStyle: {
                    normal: {
                        label: {
                            fontFamily: 'oswaldfont-regular',
                            show: true,
                            position: 'top',
                            color: '#e4e4e6',
                            fontSize: 12
                        },
                        color: (params) => {
                            return data.legendData[params.seriesIndex].color
                        }
                    }
                }
            }
        ]
    }

    return {
        Option: option
    }
}
