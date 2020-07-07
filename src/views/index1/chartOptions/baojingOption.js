export function getOption({seriesDataList,xAxisDataList, colors} = {seriesDataList:[],xAxisDataList:[],colors:[]}){
    let options = {
        tooltip: {
            trigger: 'axis',
            extraCssText: 'width:200px;z-index:2',
            backgroundColor: 'rgba(31,31,40,.8)',
            position: ['20%', '40%'],
            axisPointer: {
                lineStyle: {
                    color: 'rgba(216,216,216,.1)',
                    type: 'dashed',
                    width: 1,
                }
            },
            formatter(params){
                let str = `<div class="tooltip-title" style="text-align:center">${ params[0].axisValue + '&nbsp;&nbsp;&nbsp;&nbsp;' + params[0].value}个</div>`
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
                axisLabel: {
                    fontFamily: 'oswaldfont-regular',
                    color: '#8e92a4',
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
                        width: 0.79,
                        color: '#61616a'
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
                itemStyle: {
                    color:'rgba(67, 126, 255, 1)'
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
                start: 20,
                end: 80
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
    return options
}
