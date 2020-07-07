import images from '../../../assets/images'
import thousandsFormat from '../../../filters/thousandsFormat.js'

export default function (data) { // 1 series
    let max, max1, max2, max3
    if (!data) {
        data = {
            titleL: '',
            titleR: '',
            Xdata1: [],
            Xdata2: [],
            Ybar1: [],
            Ybar2: [],
            Yline: [],
            title1: '',
            title2: '',
            title3: '',
            unit: [],
            SubXdata: []
        }
        max = 0
        max3 = 0
    } else {
        max1 = Math.max(...data.Ybar1)
        max2 = Math.max(...data.Ybar2)
        max3 = Math.max(...data.Yline)
        max = Math.max(...[max1, max2])
    }
    // 图标数据
    let imagesArr = [
        images.blueCircle,
        images.yellowCircle,
        images.redLine
    ]

    // 渲染区域起点
    let start

    start = data.Xdata1.length > 12 ? parseInt((data.Xdata1.length - 12) / data.Xdata1.length * 100) : 0

    let option = {
        // backgroundColor: '#323a5e',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(31,31,40,0.8)',
            extraCssText: 'width:152px',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(216,216,216,.1)',
                    type: 'dashed',
                    width: 1,
                }
            },
            position(pointer, obj, dom) {
                if (pointer[0] > 200) {
                    return [pointer[0] - 150, '1%']
                }
                return [pointer[0], '1%']
            },
            formatter: function (params, ticket, callback) {
                let yearStr = ''

                if (data.SubXdata.length > 0) {

                    yearStr = data.SubXdata[params[0].dataIndex] + '年'

                }

                let str = '<div style="text-align:center">' + yearStr + params[0].name + '</div>'

                let unit1 = data.unit.length > 0 ? data.unit[0] : ''
                let unit2 = data.unit.length > 1 ? data.unit[1] : ''

                params.forEach((val, index) => {

                    let value = thousandsFormat(val.value)

                    if (index === 2) {
                        value = value + ' ' + '<small>' + unit2 + '</small>'
                    } else {
                        value = value + ' ' + '<small>' + unit1 + '</small>'
                    }

                    let iconColor = '<img src="' + imagesArr[index] + '" alt="" />'

                    str += '<div class="tooltip-box">' + '<span class="tooltip-left">' +
                        iconColor +
                        val.seriesName + '</span>' + '<span class="tooltip-right">' + value + '</span>' + '</div>'
                })

                return str
            }
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '25%',
            top: '13%',
            containLabel: true
        },
        legend: {
            data: [{
                name: data.title1,
                icon: 'image://' + imagesArr[0]
            }, {
                name: data.title2,
                icon: 'image://' + imagesArr[1]
            }, {
                name: data.title3,
                icon: 'image://' + imagesArr[2]
            }],
            left: 'center',
            bottom: 10,
            textStyle: {
                color: "rgba(147,151,170,1)",
                fontSize: 12,
                fontFamily: 'oswaldfont-regular'
            },
            itemWidth: 10,
            itemHeight: 10,
            selectedMode: false
        },
        xAxis: [{
            type: 'category',
            splitLine: {
                show: false
            },
            data: data.Xdata1,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(233,233,233,0.3)',
                    width: 1
                }
            },
            axisLabel: {
                fontFamily: 'oswaldfont-regular',
            },
            axisTick: {
                show: false,
                alignWithLabel: true,
            },
            position: 'bottom',
        },
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(233,233,233,0.3)',
                        width: 1
                    }
                },
                axisLabel: {
                    fontFamily: 'oswaldfont-regular'
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                },
                position: 'bottom',
            },
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                data: data.Xdata2,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(233,233,233,0.3)',
                        width: 1
                    },
                    offset: 30
                },
                axisLabel: {
                    fontFamily: 'oswaldfont-regular',
                    color: 'rgba(255,255,255,.88)'
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    interval: 2
                },
                position: 'bottom',
                offset: 30
            }],

        yAxis: [{
            type: 'value',
            show: true,
            name: data.titleL,
            // max: max, // 计算最大值
            //interval: Math.ceil(max / 5), //  平均分为5份
            min: function (value) {
                let number = 0
                value.min > 0 ? number = 0 : number = value.min

                return number
            },
            max: function (value) {
                let number = 0
                value.max < 0 ? number = 0 : number = value.max
                return number
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#52525b'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: 'rgba(233,233,233,0.3)'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#e8e7ee',
                    fontSize: '12',
                    fontFamily: 'oswaldfont-regular'
                },
                formatter: function (value, index) {
                    if (data.unit[0] && data.unit[0] === '亿') {
                        return value.toFixed(2)
                    }
                    if (data.unit[0] && data.unit[0] === '万') {
                        return value.toFixed(0)
                    }
                }
            },
            axisTick: {
                show: false
            }
        },
            {
                type: 'value',
                show: true,
                name: data.titleR,
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#52525b'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: 'rgba(255,255,255,0.3)'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#e8e7ee',
                        fontSize: '12',
                        fontFamily: 'oswaldfont-regular'
                    }
                },
                axisTick: {
                    show: false
                }
            }
        ],
        dataZoom: [{
            type: 'slider',
            show: false,
            xAxisIndex: [0, 2],
            start: start,
            end: 100,
            zoomLock: true,
        },
            {
                type: 'inside',
                show: false,
                xAxisIndex: [0, 2],
                start: 0,
                end: 100,
                zoomLock: true,
            }
        ],
        series: [{
            name: data.title1,
            type: 'bar',
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: "rgba(67,126,255,1)",
                    fontFamily: 'oswaldfont-regular'
                }
            },
            data: data.Ybar1
        },
            {
                name: data.title2,
                type: 'bar',
                barWidth: 5,
                itemStyle: {
                    normal: {
                        color: "rgba(253,180,52,1)",
                        fontFamily: 'oswaldfont-regular'
                    }
                },
                data: data.Ybar2
            },
            {
                name: data.title3,
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#FD3854',
                        width: 20,
                        fontFamily: 'oswaldfont-regular'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#FD3854',
                        width: 1
                    }
                },
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: data.Yline
            }
        ]
    }
    return {
        Option: option
    }
}
