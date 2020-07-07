export default function (data) { // 1 series
    data = {
        rate: 10
    }
    return {
        Option: {
            title: {
                text: data.rate + "%",
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: 'white',
                    fontSize: '12'
                }
            },
            color: ['rgba(176, 212, 251, 1)'],
            legend: {
                show: true,
                itemGap: 12,
                data: ['01', '02']
            },
            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['70%', '95%'],
                center: ['50%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: data.rate > 100 ? 100 : data.rate,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: '#FFFFFF',// 完成的圆环的颜色,
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }, {
                    name: '',
                    itemStyle: {
                        normal: {
                            color: '#9BBBFE'
                        }
                    },
                    value: 100 - data.rate < 0 ? 0 : 100 - data.rate,
                }]
            }]
        }
    }
}
