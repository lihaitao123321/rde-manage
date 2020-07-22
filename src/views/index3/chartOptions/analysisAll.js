export function getOption({legendList,seriesDataList,xAxisDataList, colors} = {legendList:[],seriesDataList:[],xAxisDataList:[],colors:[]}){
    let options = {
        grid: {
            height: '70%',
            top: '17%',
            left: '0',
            right: '0',
            bottom: '10%',
            containLabel: true
        },
        legend: {
            align:'left',
            width:260,
            right:20,
            data:[{
               name: '供水温度',
                icon:'circle',
                textStyle:{
                },
            },{
                name: '供水流量',
                icon:'circle',
                textStyle:{
                },
            },{
                name: '供水压力',
                icon:'circle',
                textStyle:{
                },
            }, {
                name: '回水温度',
                icon:'circle',
                textStyle:{
                },
            },{
                name: '回水压力',
                icon:'circle',
                textStyle:{
                },
            },{
                name: '回水流量',
                icon:'circle',
                textStyle:{
                },
            }],
            itemWidth:9,
            itemHeight:9,
            fontSize:13,
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
                name: '',
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
                data: [1,2,3,4,5,6,7,3,9,1],
            },
        ],
        dataZoom: [
            {
                fillerColor:'rgba(43,127,243,0.3)',
                backgroundColor:'#F7F7FA',
                handleStyle:{
                    color:'rgba(43,127,243,1)'
                },
                show: true,
                xAxisIndex: [0],
                type: 'slider',
                top: '90%',
                left:20,
                right:20,
                start: 0,
                end: 100
            }
        ],
    }
    let series = []
    seriesDataList.forEach((list,index) =>{
        series.push({
            name: legendList[index],
            type: 'line',
            barGap: 1,
            smooth: true,
            symbolSize:0,
            itemStyle: {
                color:colors[index],
            },
            lineStyle:{
                lineWidth:3,
                type:'solid'
            },
            data: list
        })
    })
    options.series=series
    let legends = []
    legendList.forEach(item=>{
        legends.push({
            name: item,
            icon:'circle',
        })
    })
    options.legend.data = legends
    xAxisDataList.forEach((item,index)=>{
        options.xAxis[index].data = item
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
