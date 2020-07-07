export default function (data) { // 1 series

    if (!data) {
        data = {
            valueData: [],
            total: ''
        }
    }
    var colorList = ['#2994FF', '#5E6FFF', '#32CF83', '#FD6934', '#2FC25B', '#13C2C2', '#1890FF', '#8543E0', '#FFADD2']
    return {
        Option: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: true,
                                rich: {
                                    a: {
                                        color: 'rgba(255,255,255,0.2)',
                                        align: 'center',
                                        fontSize: 10,
                                        height: 20
                                    },
                                    b: {
                                        color: 'rgba(255,255,255,0.85)',
                                        align: 'center',
                                        fontSize: 12
                                    }
                                },
                                formatter: function (params) {
                                    return ""
                                }
                            }
                        },
                    },
                    data: [
                        {value: 335, name: '员工逾期'},
                        {value: 310, name: '供应商逾期'},
                        {value: 234, name: '关系户逾期'},
                        {value: 135, name: '其他逾期'}
                    ]
                }
            ],
            animationDelay: function (idx) {
                return idx * 100
            },
            animationDuration: function (idx) {
                return 3000
            },
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 100
            }
        }
    }
}
