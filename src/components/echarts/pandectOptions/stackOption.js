import images from '../../../assets/images'
import thousandsFormat from '../../../filters/thousandsFormat.js'

export default function (data) { // 1 series
    let max, max1, max2, max3, max4, max5
    if (!data) {
        data = {
            titleL: '',
            titleR: '',
            isshow: true,
            Xdata1: [],
            Xdata2: [],
            Ybar1: [],
            Ybar2: [],
            Yline1: [],
            Yline2: [],
            Yline3: [],
            title: {},
            unit: [],
            SubXdata: []
        }
    } else {
        max1 = Math.max(...data.Yline1)
        max = Math.max(...[max1])

    }

    // 图标数据
    let imagesArr = [
        images.blueYellowCircle,
        images.blueCircle,
        images.yellowCircle,
        images.blueLine,
        images.redLine
    ]

    // 渲染区域起点
    let start

    start = data.Xdata1.length > 12 ? parseInt((data.Xdata1.length - 12) / data.Xdata1.length * 100) : 0

    let option = {
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
            formatter: function (params) {
                let yearStr = ''

                if (data.SubXdata.length > 0) {
                    yearStr = data.SubXdata[params[0].dataIndex] + '年'
                }
                let str = '<div style="text-align:center">' + yearStr + params[0].name + '</div>'

                let unit1 = data.unit.length > 0 ? data.unit[0] : ''
                let unit2 = data.unit.length > 1 ? data.unit[1] : ''

                let unit = ''

                let len = params.length

                params.forEach((val, index) => {
                    if (len === 5 || len === 3) {
                        let mainValue = thousandsFormat(val.value)

                        index === 4 ? unit = ' ' + unit2 : unit = ' ' + unit1

                        if (!data.hide) {
                            let iconColor = '<img src="' + imagesArr[index] + '" alt="" />'

                            str += '<div class="tooltip-box">' +
                                '<span class="tooltip-left">' + iconColor + val.seriesName + '</span>' +
                                '<span class="tooltip-right">' + mainValue + '<small>' + unit + '</small></span>' +
                                '</div>'

                            if (index === 1) {
                                let value = ''
                                if (parseFloat(val.value) === 0) {
                                    value = 100
                                } else {
                                    value = ((val.value / params[0].value) * 100).toFixed(2)
                                    value = thousandsFormat(value)
                                }

                                str += '<div class="tooltip-box">' +
                                    '<span class="tooltip-right">' +
                                    '<span class="tooltip-subTitle">' + '占比' + '</span>' +
                                    value + ' <small>%</small>' + '</span>' + '</div>'
                            }

                            if (!data.hide && index === 2) {
                                let value = ''
                                if (parseFloat(val.value) === 0) {
                                    value = 100
                                } else {
                                    value = ((val.value / params[0].value) * 100).toFixed(2)
                                    value = thousandsFormat(value)
                                }

                                str += '<div class="tooltip-box">' +
                                    '<span class="tooltip-right">' +
                                    '<span class="tooltip-subTitle">' + '占比' + '</span>' +
                                    value + ' <small>%</small>' + '</span>' + '</div>'
                            }
                        }
                    } else if (len === 2) {
                        let mainValue = thousandsFormat(val.value)
                        index === 4 ? unit = ' ' + unit2 : unit = ' ' + unit1

                        let iconColor = ''
                        if (val.color === '#FDB434') {
                            iconColor = '<img src="' + imagesArr[index + 1] + '" alt="" />'
                        } else {
                            iconColor = '<img src="' + imagesArr[index] + '" alt="" />'
                        }

                        str += '<div class="tooltip-box">' +
                            '<span class="tooltip-left">' + iconColor + val.seriesName + '</span>' +
                            '<span class="tooltip-right">' + mainValue + '<small>' + unit + '</small></span>' +
                            '</div>'

                        if (index === 1) {
                            let value = ''
                            if (parseFloat(val.value) === 0) {
                                value = 100
                            } else {
                                value = ((val.value / params[0].value) * 100).toFixed(2)
                                value = thousandsFormat(value)
                            }

                            str += '<div class="tooltip-box">' +
                                '<span class="tooltip-right">' +
                                '<span class="tooltip-subTitle">' + '占比' + '</span>' +
                                value + ' <small>%</small>' + '</span>' + '</div>'
                        }
                    }
                })

                return str
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '20%',
            top: '25%',
            containLabel: true
        },
        legend: {
            data: [{
                name: data.title.title1,
                icon: 'image://' + imagesArr[0]
            }, {
                name: data.title.title2,
                // icon: 'circle'
                icon: 'image://' + imagesArr[1]
            }, {
                name: data.title.title3,
                // icon: 'circle'
                icon: 'image://' + imagesArr[2]
            }, {
                name: data.title.title4,
                icon: 'image://' + imagesArr[3]
            }, {
                name: data.title.title5,
                icon: 'image://' + imagesArr[4]
            }
            ],
            left: 'center',
            bottom: 10,
            textStyle: {
                color: "rgba(147,151,170,1)",
                fontSize: 12,
                fontFamily: 'Oswald'
            },
            itemWidth: 12,
            itemHeight: 12,
            selectedMode: false
            // itemGap: 35
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
                    // color: '#E9E9E9',
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
            // offset: 10
        },
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                // data: data.Xdata1,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(233,233,233,0.3)',
                        // color: '#E9E9E9',
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
                // offset: 10
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
                        // color: '#E9E9E9',
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

        yAxis: [
            {
                type: 'value',
                show: true,
                name: data.titleL || '',
                // min:'dataMin', //最小值
                // max:'dataMax', //最大值
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
                name: data.titleR || '',
                show: data.isshow,
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
        series: [
            {
                name: data.title.title1,
                type: 'line',
                show: false,
                yAxisIndex: 0,
                itemStyle: {
                    show: false,
                    normal: {
                        color: 'rgba(1,1,1,0)',
                        width: 20,
                        fontFamily: 'oswaldfont-regular'
                    }
                },
                lineStyle: {
                    show: false,
                    normal: {
                        color: 'rgba(1,1,1,0)',
                        width: 1
                    }
                },
                showAllSymbol: false,
                symbol: 'circle',
                symbolSize: 5,
                data: data.Yline1.length > 0 ? data.Yline1 : []
            },
            {
                name: data.title.title2,
                type: 'bar',
                stack: "a",
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: "#437EFF",
                        fontFamily: 'oswaldfont-regular'
                    }
                },
                data: data.Ybar1
            },
            {
                name: data.title.title3,
                type: 'bar',
                barWidth: 10,
                stack: "a",
                itemStyle: {
                    normal: {
                        color: "#FDB434",
                        fontFamily: 'oswaldfont-regular'
                    }
                },
                data: data.Ybar2
            },
            {
                name: data.title.title4,
                type: 'line',
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color: '#5EA5FF',
                        width: 20,
                        fontFamily: 'oswaldfont-regular'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#5EA5FF',
                        width: 1
                    }
                },
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: data.Yline2
            },
            {
                name: data.title.title5,
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
                data: data.Yline3
            }
        ]
    }
    return {
        Option: option
    }
}
