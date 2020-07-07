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
            title1: '现房库存',
            title2: '',
            title3: '',
            unit: ['宗'],
            SubXdata: ['2018', '2018', '2018', '2019', '2019', '2019', '2019', '2019']
        }
    }

    // 图标数据
    let imagesArr = [
        images.blueCircle,
        images.yellowCircle,
        images.redLine
    ]


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

                let str = '<div style="text-align:center">' + params[0].name + '</div>'

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
            bottom: '5%',
            top: '8%',
            containLabel: true
        },
        legend: {
            data: [{
                name: data.title1,
                icon: 'image://' + imagesArr[0]
            }],
            left: 0,
            top: 10,
            textStyle: {
                color: "rgba(147,151,170,1)",
                fontSize: 12,
                fontFamily: 'oswaldfont-regular'
            },
            itemWidth: 10,
            itemHeight: 10,
            selectedMode: false
        },
        xAxis: {
            type: 'value',
            position: "top",
            splitNumber: 3,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: 'rgba(255,255,255,0.09)'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(255,255,255,.88)',
                    fontSize: '14',
                    fontFamily: 'oswaldfont-regular'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['浙江', '上海', '江苏', '重贵', '皖赣', '北京', '太原', '东北', '武汉'],
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed',
                    width: 0.79,
                    color: 'rgba(255,255,255,0.09)'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(255,255,255,.88)',
                    fontSize: '14',
                    fontFamily: 'oswaldfont-regular'
                }
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.09)'
                }
            }
        },
        series: [
            {
                name: data.title1,
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: "#437EFF"
                    }
                },
                data: [100, 200, 300, 350, 400, 500, 600, 700, 800]
            }
        ]
    }
    return {
        Option: option
    }
}
