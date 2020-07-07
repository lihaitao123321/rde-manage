import images from '../../../assets/images'

export default function (data) { // 1 series

    if (!data) {
        data = {
            valueData: [],
            total: ''
        }
    }
    // 图标数据
    let imagesArr = [
        images.lightBlueCircle,
        images.blueCircle,
        images.greenCircle,
        images.orangeCircle
    ]

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
                    radius: ['35%', '65%'],
                    center: ['50%', '55%'],
                    avoidLabelOverlap: false,
                    silent: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'outter',
                            formatter: function (params) {
                                var str = ''
                                switch (params.name) {
                                    case '人工成本':
                                        str = '{a|}{nameStyle| 人工成本}\n' + '{f|}{rate|' + params.value + '%}'
                                        break
                                    case '部门费用':
                                        str = '{b|}{nameStyle| 部门费用}\n' + '{f|}{rate|' + params.value + '%}'
                                        break
                                    case '行政费用':
                                        str = '{c|}{nameStyle| 行政费用}\n' + '{f|}{rate|' + params.value + '%}'
                                        break
                                    case '资产采购及安全':
                                        str = '{d|}{nameStyle| 资产采购及安全}\n' + '{f|}{rate|' + params.value + '%}'
                                        break
                                }
                                return str
                            },
                            rich: {
                                a: {
                                    width: 12,
                                    height: 12,
                                    lineHeight: 12,
                                    backgroundColor: {
                                        image: imagesArr[0]
                                    },
                                    align: 'left'
                                },
                                b: {
                                    width: 12,
                                    height: 12,
                                    lineHeight: 12,
                                    backgroundColor: {
                                        image: imagesArr[1]
                                    },
                                    align: 'left'
                                },
                                c: {
                                    width: 12,
                                    height: 12,
                                    lineHeight: 12,
                                    backgroundColor: {
                                        image: imagesArr[2]
                                    },
                                    align: 'left'
                                },
                                d: {
                                    width: 12,
                                    height: 12,
                                    lineHeight: 12,
                                    backgroundColor: {
                                        image: imagesArr[3]
                                    },
                                    align: 'left'
                                },
                                e: {
                                    width: 12,
                                    height: 12,
                                    lineHeight: 12,
                                    backgroundColor: {
                                        image: imagesArr[4]
                                    },
                                    align: 'left'
                                },
                                f: {
                                    width: 14,
                                    height: 20,
                                    align: 'left'
                                },
                                nameStyle: {
                                    fontSize: 12,
                                    color: "rgba(255,255,255,1)",
                                    align: 'left'
                                },
                                rate: {
                                    fontSize: 12,
                                    color: "rgba(255,255,255,1)",
                                    align: 'left',
                                    left: 10
                                }
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 20,
                            length2: 0,
                            smooth: true,
                        }
                    },

                    itemStyle: {
                        normal: {
                            color: function (params) {
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: true,
//	                            position:'inside',
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
                                    // return "{a|"+"单据合计}\n"+"{b|"+data.total+"}";
                                    return ""
                                }
                            },
                            // borderColor: '#413d6e',
                            // borderWidth: 2,
                        },
                        // labelLine :{show:true}
                    },
                    data: [
                        {value: 52.03, name: '人工成本'},
                        {value: 25.68, name: '部门费用'},
                        {value: 14.06, name: '行政费用'},
                        {value: 6.53, name: '资产采购及安全'}
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
