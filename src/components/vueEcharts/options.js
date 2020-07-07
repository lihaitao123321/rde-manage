const axisColor = '#9297aa'
const splitLineColor = 'rgba(216,216,216,.1)'
const backgroundColor = 'rgba(31,31,40,.8)'

export default {
    title: {
        show: false,
        text: "",
        textStyle: {
            color: 'rgba(147, 151, 170, .88)',
            fontSize: '12px',
        },
    },
    grid: {
        show: false,
        left: '0',
        right: '3%',
        top: '13%',
        bottom: '18%',
        containLabel: true,
    },
    legend: {
        bottom: 10,
        selected: false,
        itemWidth: 12,
        itemHeight: 12,
    },
    tooltip: {
        trigger: 'axis',
        extraCssText: 'width:180px;z-index:2',
        position(pointer, obj, dom) {
            let limitVal = 180
            if ((dom.clientWidth > limitVal)) {
                limitVal = window.innerWidth - dom.clientWidth
            }

            let screenWidth = document.body.clientWidth

            if (screenWidth - pointer[0] < (dom.clientWidth / 2 + 10)) {
                return [pointer[0] - limitVal, '10%']
            } else if (pointer[0] > (dom.clientWidth / 2 + 10)) {
                return [pointer[0] - limitVal / 2, '10%']
            } else {
                return [pointer[0], '10%']
            }
        },
        backgroundColor: backgroundColor,
        axisPointer: {
            lineStyle: {
                color: splitLineColor,
                type: 'dashed',
                width: 1,
            }
        },
    },
    xAxis: [{
        type: 'category',
        splitLine: {show: false},
        data: [],
        axisLine: {
            lineStyle: {
                color: axisColor,
                width: 1,
                opacity: 0.1
            },
        },
        axisTick: {
            alignWithLabel: true,
            show: false,
        },
        axisLabel: {
            fontFamily: 'oswaldfont-regular',
            fontSize: 12,
            color: '#e4e4e5',
        },
        position: 'bottom',
        offset: 5
    }, {
        type: 'category',
        splitLine: {show: false},
        data: [],
        axisLine: {
            lineStyle: {
                color: axisColor,
                width: 1,
                opacity: 0.1
            }
        },
        axisTick: {
            alignWithLabel: true,
            show: false,
        },
        axisLabel: {
            fontFamily: 'oswaldfont-regular',
            fontSize: 12,
            color: '#e4e4e5',
            interval: 3,
        },
        position: 'bottom',
        offset: 30,
        fontSize: 12,
    }],
    yAxis: [{
        type: 'value',
        name: '',
        axisLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                color: '#52525b'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#e8e7ee',
                fontSize: '12',
                fontFamily: 'oswaldfont-regular'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: splitLineColor,
                type: 'dashed'
            }
        },
        splitNumber: 3,
    }],
    dataZoom: [
        {
            type: 'slider',
            show: false,
            xAxisIndex: [0, 1],
            start: 0,
            end: 100,
            filterMode: 'empty',
            zoomLock: false,
            bottom: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
                color: '#9397AA',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            },
        },
        {
            type: 'inside',
            show: true,
            filterMode: 'empty',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100,
            zoomLock: true,
        }
    ],
    series: [

    ]
}
