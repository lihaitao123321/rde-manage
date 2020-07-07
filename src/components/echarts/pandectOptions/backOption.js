export default function (data) { // 1 series
    data = {
        rate: 10
    }

    var app = {
        currentIndex: -1,
    }

    var option = {
        // backgroundColor: '#323a5e',
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
        //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        //     }
        // },
        tooltip: {
            trigger: "axis",
            textStyle: {
                fontSize: '12',
            }
            // formatter: "{b}<br/>{a}:{c}<br/>{a1}:{c1}<br/>{a2}:{c2}<br/>{a3}:{c3}"
            //  formatter: function (params, ticket, callback) {
            //     console.log(params,ticket);
            //     let unitName='亿元'
            //     let str=''
            //     str=str+'可结转资源'+': '+'&nbsp'+params[0].value+unitName+'<br>'
            //
            //     for (var i = 0; i < params.length; i++) {
            //       array[i]
            //     }
            //     return str
            // }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '25%',
            top: '3%',
            containLabel: true
        },
        legend: {
            // data: ['1', '2', '3'],
            data: [
                {
                    name: '存量',
                    icon: 'circle'
                },
                {
                    name: '增量',
                    icon: 'circle'
                },
                {
                    name: '目标',
                    icon: 'circle'
                },
                {
                    name: '完成率',
                    icon: 'circle'
                }
            ],
            left: 'center',
            bottom: 15,
            textStyle: {
                color: "rgba(147,151,170,1)",
                fontSize: 12,
                fontFamily: 'Oswald'
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
        },
        xAxis: {
            type: 'category',
            data: ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月'],
            axisLine: {
                lineStyle: {
                    // color: 'white'
                    type: 'dashed',
                    width: 0.79,
                    color: 'rgba(255,255,255,0.3)'

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
                // interval: 0,
                // rotate: 40,
                textStyle: {
                    fontFamily: 'Microsoft YaHei'
                }
            },
        },

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
        "dataZoom": [{
            "show": true,
            "height": 12,
            "xAxisIndex": [
                0
            ],
            bottom: '18%',
            "start": 10,
            "end": 90,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#d3dee5",

            },
            textStyle: {
                color: "#fff"
            },
            borderColor: "#90979c"
        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
        }],
        series: [
            {
                name: '存量',
                type: 'bar',
                barWidth: 16,
                stack: '存量',
                itemStyle: {
                    normal: {
                        color: "rgba(67,126,255,1)"
                    }
                },
                data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
            },
            {
                name: '增量',
                type: 'bar',
                stack: '存量',
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: "rgba(253,180,52,1)"
                    }
                },
                data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
            },
            {
                name: '目标',
                type: 'line',
                stack: '目标',
                itemStyle: {
                    normal: {
                        color: '#FD3854'
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
                data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
            },
            {
                name: '完成率',
                type: 'line',
                stack: '目标',
                itemStyle: {
                    normal: {
                        color: '#5EA5FF'
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
                data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
            }
        ]
    }
    // setInterval(function() {
    //     var dataLen = option.series[0].data.length;
    //
    //     // 取消之前高亮的图形
    //     myChart.dispatchAction({
    //         type: 'downplay',
    //         seriesIndex: 0,
    //         dataIndex: app.currentIndex
    //     });
    //     app.currentIndex = (app.currentIndex + 1) % dataLen;
    //     //console.log(app.currentIndex);
    //     // 高亮当前图形
    //     myChart.dispatchAction({
    //         type: 'highlight',
    //         seriesIndex: 0,
    //         dataIndex: app.currentIndex,
    //     });
    //     // 显示 tooltip
    //     myChart.dispatchAction({
    //         type: 'showTip',
    //         seriesIndex: 0,
    //         dataIndex: app.currentIndex
    //     });
    //
    //
    // }, 1000)
    return {
        Option: option
    }
}
