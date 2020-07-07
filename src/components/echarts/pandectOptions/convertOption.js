import images from '../../../assets/images'
import thousandsFormat from '../../../filters/thousandsFormat.js'

export default function (data) { // 1 series

    if (!data) {
        data = {
            Xdata1: [],
            Xdata2: [],
            Ybar1: [],
            Ybar2: [],
            Yline: [],
            title1: '',
            title2: '',
            title3: '',
            unit: ['万'],
            SubXdata: ['2018', '2018', '2018', '2019', '2019', '2019', '2019', '2019']
        }
    }

    // 图标数据
    let imagesArr = [
        images.blueLine,
        images.orangeLine,
        images.yellowLine
    ]

    // 渲染区域起点
    let start

    // start = data.Xdata1.length > 12 ? parseInt((data.Xdata1.length - 12) / data.Xdata1.length * 100) : 0

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
            formatter: function (params, ticket, callback) {
                // console.log(params);
                let yearStr = ''

                if (data.SubXdata.length > 0) {
                    yearStr = data.SubXdata[params[0].dataIndex] + '年'
                }
                let str = '<div style="text-align:center">' + yearStr + params[0].name + '</div>'

                let unit1 = data.unit.length > 0 ? data.unit[0] : ''

                params.forEach((val, index) => {

                    let iconColor = '<img src="' + imagesArr[index] + '" alt="" />'

                    let value = thousandsFormat(val.value)

                    str += '<div class="tooltip-box">' + '<span class="tooltip-left">' +
                        iconColor +
                        val.seriesName + '</span>' + '<span class="tooltip-right">' + value + ' ' + '<small>' + unit1 + '</small></span>' + '</div>'
                })

                return str
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '18%',
            top: '3%',
            containLabel: true
        },
        legend: {
            data: [{
                name: '到访率',
                icon: 'image://' + imagesArr[0]
            }, {
                name: '成交率',
                icon: 'image://' + imagesArr[1]
            }, {
                name: '转签率',
                icon: 'image://' + imagesArr[2]
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
                        type: 'dashed',
                        width: 0.79,
                        color: 'rgba(233,233,233,0.3)'
                    }
                },
                axisLabel: {
                    fontFamily: 'oswaldfont-regular'
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
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
                name: '到访率',
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
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: [400, 500, 500, 500, 500, 400, 1000, 1000, 1000]
            },
            {
                name: '成交率',
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
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: [200, 100, 200, 200, 300, 600, 500, 600, 70]
            },
            {
                name: '转签率',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#FAAD13',
                        width: 20
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#FAAD13',
                        width: 1
                    }
                },
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                data: [300, 600, 700, 200, 300, 500, 700, 700, 900]
            }
        ]
    }
    return {
        Option: option
    }
}
