export default function (data) {
    let max

    function getSeries(val) {
        let series = []
        if (val.length !== 0) {
            val.forEach((el, index) => {
                let item = {
                    name: el.name,
                    type: el.type,
                    symbol: 'circle',
                    lineStyle: {
                        color: el.color,
                        width: 0.7
                    },
                    itemStyle: {
                        color: el.color
                    },
                    data: data.seriesData[index]
                }
                series.push(item)
            })
        }
        return series
    }

    function getLegend(val) {
        let data = []
        if (val.length !== 0) {
            val.forEach((el) => {
                let item = {
                    name: el.name,
                    show: el.isshow,
                    icon: 'image://' + el.icon
                }
                data.push(item)
            })
        }
        return data
    }

    function iscolor(val, unit) {
        if (Number(val) > 0) {
            return `<span style="color: #e33550">${val}${unit}</span>`
        } else {
            return `<span style="color: #2fb375">${val}${unit}</span>`
        }
    }

    if (!data) {
        data = {
            xdata: [],
            xdata2: [],
            yearsBasic: [],
            titleL: '',
            isSecondX: false,
            legendData: [],
            seriesData: [],
            unit: '%'
        }
    } else {
        max = Math.max(...data.seriesData[0])
    }
    let option = {
        title: {
            text: data.title,
            textStyle: {
                color: '#9397AA',
                fontSize: 12
            },
            padding: [15, 0, 20, 15]
        },
        tooltip: {
            trigger: 'axis',
            extraCssText: 'width:200px',
            backgroundColor: '#20202a',
            textStyle: {
                fontFamily: 'oswaldfont-regular'
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    color: '#747891',
                    width: 1,
                }
            },
            position(pointer) {
                if (pointer[0] > 150) {
                    return [pointer[0] - 150, '1%']
                }
                return [pointer[0], '1%']
            },
            formatter: function (params) {
                let str = `<div style="text-align:center;background: #20202a">${data.yearsBasic[params[0].dataIndex] + params[0].name}</div>`

                // 刻度展示数据
                if (params[0].value) {
                    str += `<div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                            <div>
                                <img style="width: 10px; height: 10px" src="${data.legendData[0].icon}" alt="" />
                                ${data.legendData[0].tip}
                            </div>
                            <div>${data.toolData[0][params[0].dataIndex]}${data.unit}</div>
                          </div>
                          <div style="display: flex; justify-content: space-between; align-items: center">
                            <div></div>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 65%; font-size: 12px;">
                              <span style="color: #9397AA">${data.legendData[0].tipBottom}</span>
                              ${iscolor(data.toolData[1][params[0].dataIndex], data.unit)}
                            </div>
                          </div>`
                    str += `<div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                            <div>
                                <img style="width: 10px; height: 10px; opacity: 0" alt="" />
                                ${data.legendData[1].tip}
                            </div>
                            <div>
                              ${data.toolValue[0][params[0].dataIndex]}${data.unit}
                            </div>
                          </div>
                          <div style="display: flex; justify-content: space-between; align-items: center">
                            <div></div>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 65%; font-size: 12px;">
                              <span style="color: #9397AA">${data.legendData[1].tipBottom}</span>
                              ${iscolor(data.toolValue[1][params[0].dataIndex], data.unit)}
                            </div>
                          </div>`
                }
                return str
            }
        },
        grid: {
            top: '15%',
            bottom: '35%',
            left: '14%',
            right: '14%'
        },
        legend: {
            bottom: '5%',
            selectedMode: false,
            textStyle: {
                color: '#9397AA',
                fontSize: 12
            },
            itemWidth: 12,
            itemHeight: 10,
            data: getLegend(data.legendData),
        },
        xAxis: [
            {
                type: 'category',
                data: data.xdata,
                axisTick: {
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: '#8e92a4'
                    },
                    alignWithLabel: true
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: '#61616a'
                    }
                },
                axisLabel: {
                    fontFamily: 'oswaldfont-regular',
                    color: '#8e92a4'
                }
            },
            {
                show: data.isSecondX,
                type: 'category',
                axisPointer: {
                    type: 'none' // 设置多个x轴时，隐藏第二条刻度线
                },
                splitLine: {
                    show: false
                },
                data: data.xdata2,
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
                name: data.titleL,
                // splitNumber: 3,
                interval: Math.ceil(max / 5), //  平均分为5份
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
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: '#61616a'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: '#5e5d64'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#707078',
                        fontSize: '12',
                        fontFamily: 'oswaldfont-regular'
                    }
                }
            },
        ],
        series: getSeries(data.legendData)
    }
    return {
        Option: option
    }
}
