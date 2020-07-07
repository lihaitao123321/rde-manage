import images from '../../../assets/images'
import thousandsFormat from '../../../filters/thousandsFormat.js'

let overValue = 7

export default function (data) { // 1 series
    if (!data) {
        data = {
            // 辅助
            detailData1: [],
            // 蓝色
            detailData2: [],
            // 淡蓝
            detailData3: [],
            // 黄色
            detailData4: [],
            unit: [],
            max: ''
        }
    }

    // 图标数据
    let imagesArr = [
        images.blueCircle,
        images.lightBlueCircle,
        images.yellowCircle
    ]

    return {
        Option: {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(31,31,40,0.8)',
                //extraCssText: 'width:180px',
                axisPointer: {
                    lineStyle: {
                        color: 'rgba(216,216,216,.1)',
                        type: 'dashed',
                        width: 1,
                    }
                },
                position(pointer, obj, dom) {
                    if (pointer[0] > 140 && pointer[0] < 300) {
                        return [pointer[0] - 170, '1%']
                    } else if (pointer[0] > 300) {
                        return [pointer[0] - 220, '1%']
                    }
                    return [pointer[0], '1%']
                },
                formatter: function (params) {
                    // debugger
                    let str = '<div style="text-align:center">' + '资金余额' + '</div>'

                    let unit1 = data.unit.length > 0 ? data.unit[0] : ''

                    params.forEach((val, index) => {
                        if (val.data.value != '-' && index > 0) {
                            let iconColor = '<img src="' + imagesArr[index - 1] + '" alt="" />'
                            let value = thousandsFormat(val.value)

                            str += '<div class="tooltip-box">' +
                                '<span class="tooltip-left">' + iconColor + val.data.name + '</span>' +
                                '<span class="tooltip-right">' + value + ' <small>' + unit1 + '</small></span>' +
                                '</div>'
                        }
                    })

                    return str
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                top: "18%",
                bottom: '18%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#BFBFBF',
                        type: 'dashed',
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
                data: [
                    {value: "现金", textStyle: {color: 'rgba(255,255,255,0)'}},
                    {value: "全资公司可动用资金", textStyle: {color: 'rgba(255,255,255,0)'}},
                    {value: "受监督资金", textStyle: {color: 'rgba(255,255,255,0)'}},
                    {value: "非动用资金", textStyle: {color: 'rgba(255,255,255,0)'}},
                    {value: "受限制资金", textStyle: {color: 'rgba(255,255,255,0)'}},
                    {value: "总计", textStyle: {color: 'rgba(255,255,255,0)'}}
                ]
            },
            yAxis: {
                type: 'value',
                max: data.max,
                interval: Math.ceil(data.max / 4), //  平均分为4份
                min: function (value) {
                    let number = 0
                    value.min > 0 ? number = 0 : number = value.min

                    return number
                },
                axisLine: {
                    show: false,
                    onZero: false,
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: 'rgba(255,255,255,0.1)'
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
            series: [
                {
                    name: '辅助',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    // data: [0, 0, 678, 789, 888, 0]
                    data: data.detailData1
                },
                {
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(67,126,255,1)'
                        }
                    },
                    label: {
                        normal: {
                            color: 'rgba(255,255,255,.88)',
                            show: true,
                            formatter: function (params) {
                                let str = ''
                                if (params.data.name && Number(params.data.value) !== 0) {

                                    if (params.data.name.length > overValue) {
                                        let name1 = params.data.name.slice(0, overValue)
                                        let name2 = params.data.name.slice(overValue, params.data.name.length)

                                        str = name1 + '\n' + name2
                                    } else {
                                        str = params.data.name
                                    }
                                }
                                return str
                            },
                            position: 'bottom'
                        }
                    },
                    data: data.detailData2
                    // data: [
                    // 	{value:900,name:'a'},
                    // 	{value:300,name:'a'},
                    // 	{value:'-',name:'a'},
                    // 	{value:'-',name:'a'},
                    // 	{value:'-',name:'a'},
                    // 	{value:900,name:'a'}
                    // ]
                },
                {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(145,179,255,1)'
                        }
                    },
                    label: {
                        normal: {
                            color: 'rgba(255,255,255,.88)',
                            show: true,
                            formatter: function (params) {
                                let str = ''
                                if (params.data.name && Number(params.data.value) !== 0) {

                                    if (params.data.name.length > overValue) {
                                        let name1 = params.data.name.slice(0, overValue)
                                        let name2 = params.data.name.slice(overValue, params.data.name.length)

                                        str = name1 + '\n' + name2
                                    } else {
                                        str = params.data.name
                                    }
                                }
                                return str
                            },
                            position: 'top',
                        }
                    },
                    data: data.detailData3
                    // data: [
                    // 	{value:120,name:'b'},
                    // 	{value:230,name:'b'},
                    // 	{value:'-',name:'b'},
                    // 	{value:'-',name:'b'},
                    // 	{value:'-',name:'b'},
                    // 	{value:'-',name:'b'}
                    // ]
                },
                {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(253,180,52,1)'
                        }
                    },
                    label: {
                        normal: {
                            color: 'rgba(255,255,255,.88)',
                            show: true,
                            offset: [-8, 0],
                            formatter: function (params) {
                                let str = ''
                                if (params.data.name && Number(params.data.value) !== 0) {
                                    if (params.data.name.length > overValue) {
                                        let name1 = params.data.name.slice(0, overValue)
                                        let name2 = params.data.name.slice(overValue, params.data.name.length)

                                        str = name1 + '\n' + name2
                                    } else {
                                        str = params.data.name
                                    }
                                }
                                return str
                            },
                            position: 'top',
                            distance: 25
                        }
                    },
                    data: data.detailData4
                    // data: [
                    // 	{value:'-',name:'c'},
                    // 	{value:'-',name:'c'},
                    // 	{value:203,name:'c'},
                    // 	{value:342,name:'c'},
                    // 	{value:134,name:'c'},
                    // 	{value:'-',name:'c'}
                    // ]
                }
            ]
        }
    }
}
