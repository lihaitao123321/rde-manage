import images from '../../../assets/images'
import thousandsFormat from '../../../filters/thousandsFormat.js'

export default function (data) { // 1 series
    let max
    let maxArr = []
    if (!data) {
        data = {
            Ydata: [],
            valueData: [],
            markData: [],
            title: [],
            unit: [],
            max: ''
        }
    }

    // 最大值
    max = data.max

    // 图标数据
    let imagesArr = [
        images.lightBlueCircle,
        images.chartWarn
    ]


    let option = {
        grid: {
            left: '2%',
            right: '10%',
            bottom: '3%',
            top: '40',
            containLabel: true
        },
        legend: {
            data: [
                {
                    name: data.title[0],
                    icon: 'image://' + imagesArr[0]
                },
                {
                    name: data.title[1],
                    icon: 'image://' + imagesArr[1]
                }
            ],
            left: 0,
            top: 5,
            textStyle: {
                color: "rgba(147,151,170,1)",
                fontSize: 12,
                padding: 0,
                fontFamily: 'oswaldfont-regular'
            },
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 4,
            selectedMode: false
        },
        xAxis: {
            type: 'value',
            position: "top",
            min: 0, //最小值
            max: max, //最大值
            interval: Math.ceil(max / 5), //  平均分为5份
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: 'rgba(255,255,255,0.09)'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(255,255,255,.88)',
                    fontSize: '14',
                    fontFamily: 'oswaldfont-regular'
                },
                formatter: "{value}%"
            }
        },
        yAxis: {
            type: 'category',
            data: data.Ydata,
            min: 'dataMin', //最小值
            max: 'dataMax', //最大值
            triggerEvent: true,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: 'rgba(255,255,255,0.09)'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(255,255,255,.88)',
                    fontSize: '14',
                    fontFamily: 'oswaldfont-regular'
                }
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.09)'
                }
            }
        },
        series: [
            {
                name: data.title[0],
                type: 'bar',
                barWidth: 15,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        color: 'rgba(255,255,255,.88)',
                        formatter: function (params) {
                            var str = ''

                            if (parseFloat(params.value) < parseFloat(params.data.target)) {
                                str = '{a|}{red|' + params.value + '%}'
                            } else if (parseFloat(params.value) === parseFloat(params.data.target)) {
                                str = '{a|' + params.value + '%}'
                            } else {
                                str = '{a|' + params.value + '%}'
                            }

                            return str
                        },
                        rich: {
                            a: {
                                fontSize: 12,
                                color: "#ffffff",
                                align: 'left',
                                fontFamily: 'oswaldfont-regular'
                            },
                            red: {
                                fontSize: 12,
                                color: "#FD3854",
                                align: 'left',
                                fontFamily: 'oswaldfont-regular'
                            },
                            green: {
                                fontSize: 12,
                                color: "#32CF83",
                                align: 'left',
                                fontFamily: 'oswaldfont-regular'
                            },
                            white: {
                                fontSize: 12,
                                color: "rgba(255,255,255,0.88)",
                                align: 'left',
                                fontFamily: 'oswaldfont-regular'
                            },
                            rate: {
                                fontSize: 20,
                                color: "#1ab4b8",
                                align: 'left',
                                fontFamily: 'oswaldfont-regular'
                            }
                        }
                    }
                },
                markPoint: {
                    symbolSize: '14',
                    symbol: 'image://' + imagesArr[1],
                    label: {
                        normal: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '16',
                            }
                        }
                    },
                    data: data.markData
                },
                itemStyle: {
                    normal: {
                        color: "#5ea5ff"
                    }
                },
                data: data.valueData
            },
            {
                name: data.title[1],
                type: 'line',
                data: []
            }
        ]
    }
    return {
        Option: option
    }
}
