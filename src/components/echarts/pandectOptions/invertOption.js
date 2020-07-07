import images from '../../../assets/images'
import thousandsFormat from '../../../filters/thousandsFormat.js'


export default function (data) {
    if (!data) {
        data = {
            bottom: '20%',
            isrow: true,
            isSecondX: true,
            yearBasic: [],
            xData1: [],
            xData2: [],
            seriesData1: [],
            seriesData2: [],
            seriesData3: [],
            seriesData4: [],
            seriesTitle2: '',
            seriesTitle3: '',
            Ybar1: [],
            Ybar2: [],
            Yline: [],
            title: '',
            unit: ['万']
        }
    }

    function average() {
        let arr = []
        let arr1 = []
        let arr2 = []
        let sum1 = 0
        let sum2 = 0
        data.seriesData1.map((el) => {
            sum1 += el
        })
        data.seriesData2.map((el) => {
            if (typeof (el) === 'object') {
                sum2 += el.value
            } else {
                sum2 += el
            }
        })
        data.seriesData1.map(() => {
            arr1.push(sum1 / data.seriesData1.length)
        })
        data.seriesData2.map(() => {
            arr2.push(sum2 / data.seriesData2.length)
        })
        arr[0] = arr1
        arr[1] = arr2
        return arr
    }

    // 图标图片
    let imagesArr = [
        images.blueLine,
        images.orangeLine,
        images.yellowLine
    ]
    let option = {
        title: {
            text: data.title,
            padding: [15, 15, 0, 15],
            textStyle: {
                color: '#848799',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis',
            extraCssText: 'width:152px',
            axisPointer: {
                lineStyle: {
                    color: '#747891',
                    type: 'dashed',
                    width: 1,
                }
            },
            position(pointer) {
                if (pointer[0] > 200) {
                    return [pointer[0] - 150, '1%']
                }
                return [pointer[0], '1%']
            },
            formatter: function (params) {
                let year = ''
                if (data.isSecondX) {
                    year = data.yearBasic[params[0].dataIndex] + '年'
                } else {
                    year = ''
                }
                let str = '<div style="text-align:center">' + year + params[0].name + '</div>'

                let unit1 = data.unit.length > 0 ? data.unit[0] : ''

                params.forEach((val, index) => {
                    if (index > 1) {
                        return false
                    }
                    let iconColor = '<img src="' + imagesArr[index] + '" alt="" />'

                    let value = thousandsFormat(val.value)

                    str += '<div class="tooltip-box">' + '<span class="tooltip-left">' +
                        iconColor +
                        val.seriesName + '</span>' + '<span class="tooltip-right">' + value + ' ' + '<small>' + unit1 + '</small></span>' + '</div>'
                })

                return str
            }
        },
        legend: {
            data: [{
                name: '成交率',
                icon: 'image://' + imagesArr[0]
            }, {
                name: '转签率',
                icon: 'image://' + imagesArr[1]
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
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: data.bottom,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: data.xData1,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: 'rgba(233,233,233,0.3)'
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        width: 1
                    },
                    alignWithLabel: true,
                    interval: 0
                },
                position: 'bottom',
                axisLabel: {
                    color: '#e0e0e2',
                    fontFamily: 'oswaldfont-regular',
                    lineHeight: 16,
                    formatter: (value) => {
                        if (data.isrow) {
                            return value
                        } else {
                            return value.split("").join("\n")
                        }
                    }
                }
            }, {
                show: data.isSecondX,
                type: 'category',
                axisPointer: {
                    type: 'none' // 设置多个x轴时，隐藏第二条刻度线
                },
                splitLine: {
                    show: false
                },
                data: data.xData2,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)',
                        width: 1,
                    }
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
                offset: 35
            }
        ],
        yAxis: [
            {
                type: 'value',
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
        dataZoom: [
            {
                type: 'slider',
                show: false,
                xAxisIndex: [0, 1],
                start: 0,
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
        series: [
            {
                name: '成交率',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#437FFD',
                        width: 20
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#437FFD',
                        width: 1
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'top',
                        color: '#7c7045',
                    }
                },
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: data.seriesData1,
            },
            {
                name: '转签率',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#FE7A2C',
                        width: 20
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#FE7A2C',
                        width: 1
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'top',
                        color: '#7c7045',
                    }
                },
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: data.seriesData2
            },
            {
                name: '平均转签率',
                type: 'line',
                symbolSize: 0.1,
                smooth: false,
                data: data.isshow ? average()[1] : '',
                lineStyle: {
                    normal: {
                        color: '#7f7346',
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#7f7346',
                        lineStyle: {
                            color: '#7f7346',
                            width: 0.5,
                            type: 'dotted'  //'dotted'虚线 'solid'实线
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color: '#7f7346',
                        formatter: (params) => {
                            if (average()[1].length < 6) {
                                if (params.dataIndex === average()[1].length - 1) {
                                    return params.seriesName + ' ' + params.value.toFixed(2) + '%'
                                } else {
                                    return ''
                                }
                            } else {
                                if (params.dataIndex === average()[1].length - 3) {
                                    return params.seriesName + ' ' + params.value.toFixed(2) + '%'
                                } else {
                                    return ''
                                }
                            }
                        }
                    }
                }
            },
            {
                name: '平均成交率',
                show: false,
                type: 'line',
                symbolSize: 0.1,
                smooth: false,
                data: data.isshow ? average()[0] : '',
                lineStyle: {
                    normal: {
                        color: '#7f7346',
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#7f7346',
                        lineStyle: {
                            color: '#7f7346',
                            width: 0.5,
                            type: 'dotted'  //'dotted'虚线 'solid'实线
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color: '#7f7346',
                        formatter: (params) => {
                            if (average()[0].length < 10) {
                                if (average()[0].length > 2 && params.dataIndex === average()[0].length - (average()[0].length - 1)) {
                                    return params.seriesName + ' ' + params.value.toFixed(2) + '%'
                                } else if (average()[0].length === 2 && params.dataIndex === 0) {
                                    return params.seriesName + ' ' + params.value.toFixed(2) + '%'
                                } else {
                                    return ''
                                }
                            } else {
                                if (params.dataIndex === average()[0].length - (average()[0].length - 3)) {
                                    return params.seriesName + ' ' + params.value.toFixed(2) + '%'
                                } else {
                                    return ''
                                }
                            }
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
