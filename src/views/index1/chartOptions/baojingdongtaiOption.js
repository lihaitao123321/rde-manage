export function getOption({seriesDataList,xAxisDataList, colors} = {seriesDataList:[],xAxisDataList:[],colors:[]}){
    let options = {
        tooltip: {
            trigger: 'axis',
            extraCssText: 'width:200px;z-index:2',
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: ['20%', '40%'],
            axisPointer: {
                lineStyle: {
                    color: 'rgba(216,216,216,.1)',
                    type: 'dashed',
                    width: 1,
                }
            },
            formatter(params){
                let str = `<div class="tooltip-title" style="text-align:center">${ params[0].axisValue }</div>`
                return str
            }
        },
        grid: {
            height:'90%',
            top: '10%',
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                name: '',
                axisTick: {
                    lineStyle: {
                        type: 'dashed',
                        width: 0.5,
                        color: '#8e92a4'
                    },
                    alignWithLabel: true
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        width: 0.5,
                        color: '#EFEEEE',
                    }
                },
                axisLabel: {
                    fontFamily: 'oswaldfont-regular',
                    color: '#8e92a4',
                    fontSize: 10,
                    formatter(params) {
                        return params.replace(' ','\n');
                    }
                },
                data: ['故障','报警','警告','离线']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '个数',
                position: 'left',
                nameTextStyle:{
                    color:'#999999',
                },
                splitNumber: 3,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        width: 0.5,
                        color: '#EFEEEE',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                        type: 'solid',
                        width: 0.5,
                        color: '#EFEEEE',
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#999999',
                        fontSize: '12',
                        fontFamily: 'oswaldfont-regular'
                    },
                    splitNumber: 4,
                    // formatter(params) {
                    //     return filters.numberUnitFormat2(params)
                    // }
                },
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barGap: 0,
                barWidth:14,
                itemStyle: {
                    barBorderRadius: [7, 7, 0, 0] //（顺时针左上，右上，右下，左下）
                },
                label:{
                    show:true,
                    position:'top',
                    distance:5,
                    color:'#2B7FF2',
                    fontSize:13,
                    fontWeight:500
                },
                data: [{
                    name:'',
                    value:0,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#5794FF' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#6B5FFE' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        barBorderRadius: [7, 7, 0, 0] //（顺时针左上，右上，右下，左下）
                    },
                },{
                    name:'',
                    value:0,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#FF5E39' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#FF2553' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        barBorderRadius: [7, 7, 0, 0] //（顺时针左上，右上，右下，左下）
                    },
                },{
                    name:'',
                    value:0,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#FFA523' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#F89200' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        barBorderRadius: [7, 7, 0, 0] //（顺时针左上，右上，右下，左下）
                    },
                },{
                    name:'',
                    value:1,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#D4D4D6' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#D4D4D6' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        barBorderRadius: [7, 7, 0, 0] //（顺时针左上，右上，右下，左下）
                    },
                }],
            },
        ],
    }
    seriesDataList.forEach((item,index) =>{
            options.series[0].data[index].value = item
    })
    return options
}
