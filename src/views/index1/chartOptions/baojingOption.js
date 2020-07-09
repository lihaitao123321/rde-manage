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
            height: '70%',
            top: '10%',
            left: '0',
            right: '0',
            bottom: '20%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                name: '',
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
                        type: 'solid',
                        width: 0.5,
                        color: '#999999'
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
                data: ['2013','2012','2012','2012','2012','2012','2012','2012','2012','2012']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '个数',
                position: 'left',
                nameTextStyle:{
                    padding:[0,0,0,10]
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
                        color: '#999999'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        width: 0.79,
                        color: '#5e5d64'
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
                name: '投资版',
                type: 'line',
                barGap: 1,
                smooth: true,
                itemStyle: {
                    color:'rgba(67, 126, 255, 1)',
                },
                lineStyle:{
                    lineWidth:3,
                    type:'solid'
                },
                emphasis:{
                    label:{
                        show:true,
                        color:'#000000',
                        fontSize:20,
                        fontWeight:500
                    },
                    itemStyle:{
                        color:'#FFFFFF',
                        borderWidth:2,
                        borderColor:'#F89200'
                    }
                },
                areaStyle:{
                    opacity:0.3,
                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#57B6FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#FFFFFF' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                data: [1,2,3,4,5,6,7,3,9,1],
            },
        ],
        dataZoom: [
            {
                fillerColor:'rgba(145,222,228,0.8)',
                backgroundColor:'hsla(240, 9%, 94%, 1)',
                show: true,
                xAxisIndex: [0],
                type: 'slider',
                top: '85%',
                left:20,
                right:20,
                start: 0,
                end: 100
            }
        ],
    }
    seriesDataList.forEach((item,index) =>{
        if(item){
            options.series[index].data = item
            options.series[index].itemStyle.color = colors[index]
        }
    })
    options.xAxis.forEach((item,index) =>{
        item.data = xAxisDataList[index]
    })
    if(seriesDataList.length>0){
        let dataLength = seriesDataList[0].length
        if(dataLength>5){
            options.dataZoom[0].end = parseInt(100*4/dataLength)
        }else{
            options.dataZoom[0].end = 100
        }
    }

    return options
}
