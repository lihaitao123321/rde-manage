<template>
    <div class="t-page">
        <div class="redBg">
            <div class="index-page">
                <div class="index-top">
                    <div class="index-header">
                        <x-icon class="more-icon white-x-icon" type="ios-ionic-outline" size="25"></x-icon>
                        <div class="search-box" @click.stop="seachDetail">
                            <x-icon class="white-x-icon" type="ios-search" size="25"></x-icon>
                            <group>
                                <x-input class="search-con" readonly placeholder="从容智能运维云服务系统"></x-input>
                            </group>
                        </div>
                        <x-icon class="white-x-icon" type="ios-ionic-outline" size="25"></x-icon>
                    </div>
                    <div class="index-action">
                        <div class="action-box">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation1.png" >
                            <div class="action-name">项目数量<span>(座)</span></div>
                            <div class="action-number">1</div>
                        </div>
                        <div class="action-box">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation2.png" >
                            <div class="action-name">设备数量<span>(套)</span></div>
                            <div class="action-number">268</div>
                        </div>
                        <div class="action-box">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation3.png" >
                            <div class="action-name">负荷容量<span>(KW)</span></div>
                            <div class="action-number">1000</div>
                        </div>
                        <div class="action-box">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation4.png" >
                            <div class="action-name">新能源装机容量<span>(KW)</span></div>
                            <div class="action-number">500</div>
                        </div>
                        <div class="action-box">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation5.png" >
                            <div class="action-name">实用用电功率<span>(KW)</span></div>
                            <div class="action-number">56</div>
                        </div>
                        <div class="action-box">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation6.png" >
                            <div class="action-name">新能源发电功率<span>(KW)</span></div>
                            <div class="action-number">35</div>
                        </div>
                    </div>
                    <div class="all-mon">
                        <div class="title">
                            <div>总体监控预览</div>
                            <div><span>进入监控</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                        </div>
                        <div class="chart-box mb13">

                        </div>
                        <div class="chart-box">

                        </div>
                    </div>
                    <div class="all-mon">
                        <div class="title">
                            <div>报警动态</div>
                            <div><span>进入报警</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                        </div>
                        <div class="pillar-box">
                            <v-chart
                                class="chart-box"
                                :width= "340"
                                ref="demo3"
                                :data="data3">
                            <v-scale x field="title" />
                            <v-scale y field="nub" />
                            <v-bar series-field="name" :adjust="{
                                type: 'dodge',
                                marginRatio: 0.05 // 设置分组间柱子的间距
                            }" />
                            <v-tooltip show-value-in-legend />
                            </v-chart>
                        </div>
                        
                    </div>



                </div>
                <div class="index-bottom">
                    <div class="all-mon">
                        <div class="title">
                            <div>实际用电功率</div>
                            <div><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                        </div>
                        <div class="pillar-box">
                            <v-chart 
                                :data="data5" 
                                class="chart-box"
                                :width= "340">
                                <v-scale x type="timeCat"  />
                                <v-scale y :min="0" alias="KW"  />
                                <v-point
                                    :style="{
                                    stroke: '#fff',
                                    lineWidth: 1
                                    }"
                                    shape="smooth" />
                                <v-line shape="smooth" />
                            </v-chart>
                        </div>
                    </div>
                    <div class="all-mon">
                        <div class="title">
                            <div>新能源发电功率</div>
                            <div><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                        </div>
                        <div class="pillar-box">
                            <v-chart 
                                :data="data5" 
                                class="chart-box"
                                :width= "340">
                                <v-scale x type="timeCat" />
                                <v-scale y :min="0" alias="%" />
                                <v-point
                                    :style="{
                                    stroke: '#fff',
                                    lineWidth: 1
                                    }"
                                    shape="smooth" />
                                <v-line shape="smooth" />
                            </v-chart>
                        </div>
                    </div>
                    <div class="all-mon">
                        <div class="title">
                            <div>绿色能源实时占比</div>
                            <div><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                        </div>
                        <div class="pillar-box">
                            <v-chart
                                class="chart-box"
                                :width= "340"
                                :data="data6"
                                :padding="[20, 'auto']">
                                <v-tooltip disabled />
                                <v-scale y :options="yOptions" />
                                <v-pie :radius="0.6" :inner-radius="0.6" series-field="name" :colors="['#FE5D4D','#3BA4FF','#737DDE']" />
                                <v-legend :options="legendOptions" />
                                <v-guide type="html" :options="htmlOptions" />
                            </v-chart>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Tabbar, TabbarItem, Group, Cell,XInput,XButton, 
      VChart, VLine, VArea, VTooltip, VLegend, VPie, VGuide, VBar, VScale, VPoint } from 'vux'

    const data6 = [
        { name: '清扫机器人', percent: 83.59, a: '1' },
        { name: '接驳车机器人', percent: 2.17, a: '1' },
        { name: '补给机器人', percent: 14.24, a: '1' }
    ]

    const map = {}
    data6.map(obj => {
        map[obj.name] = obj.percent + '%'
    })

    export default {
        components: {
            Group,
            XInput,
            VChart,
            VLine,
            VArea,
            VTooltip,
            VLegend,
            VBar,
            XButton,
            VGuide,
            VPie,
            VScale,
            VPoint
        },
        data () {
            return {
                map,
                htmlOptions: {
                    position: [ '50%', '50%' ],
                    html: `
                    <div style="width: 250px;height: 40px;text-align: center;">
                        <div style="font-size: 24px; color:#212121;">49999</div>
                        <div style="font-size: 13px; color:#999999;">总数</div>
                    </div>`
                },
                legendOptions: {
                    position: 'bottom',
                    itemFormatter (val) {
                        return val + '  ' + map[val]
                    }
                },
                yOptions: {
                    formatter (val) {
                        return val * 100 + '%'
                    }
                },
                data6,
                //双柱型
                data3: [
                    { name: '电站设备', title: '故障', nub: 18.9 },
                    { name: '电站设备', title: '报警', nub: 28.8 },
                    { name: '电站设备', title: '警告', nub: 39.3 },
                    { name: '电站设备', title: '离线', nub: 81.4 },
                    { name: '运维设备', title: '故障', nub: 12.4 },
                    { name: '运维设备', title: '报警', nub: 23.2 },
                    { name: '运维设备', title: '警告', nub: 34.5 },
                    { name: '运维设备', title: '离线', nub: 99.7 }
                ],
                data5: [
                    { time: '2016-08-08 00:00:00', tem: 10 },
                    { time: '2016-08-08 00:10:00', tem: 22 },
                    { time: '2016-08-08 00:30:00', tem: 20 },
                    { time: '2016-08-09 00:35:00', tem: 26 },
                    { time: '2016-08-09 01:00:00', tem: 20 },
                    { time: '2016-08-09 01:20:00', tem: 26 },
                    { time: '2016-08-10 01:40:00', tem: 28 },
                    { time: '2016-08-10 02:00:00', tem: 20 },
                    { time: '2016-08-10 02:20:00', tem: 18 }
                ],
                options: [
                    {
                        key: 1,
                        value: '设备型号',
                        //弹框显示的内容和类型
                        type:1,
                        checklist:[],
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: ''
                        }, {
                            key: 'value2',
                            value: '故障',
                            inlineDesc: ''
                        }, {
                            key: 'value3',
                            value: '报警',
                            inlineDesc: ''
                        }, {
                            key: 'value4',
                            value: '警告',
                            inlineDesc: ''
                        }]
                    },{
                        key: 2,
                        value: '报警级别',
                        type:2,
                        checklist:[],
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: ''
                        }, {
                            key: 'value2',
                            value: '故障',
                            inlineDesc: ''
                        }, {
                            key: 'value3',
                            value: '报警',
                            inlineDesc: ''
                        }, {
                            key: 'value4',
                            value: '警告',
                            inlineDesc: ''
                        }]
                    },{
                        key: 3,
                        value: '报警状态',
                        type:3,
                        checklist:[],
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: '',
                            children:[{
                                key: 'value1',
                                value: '全部',
                                inlineDesc: ''
                            }, {
                                key: 'value2',
                                value: '故障',
                                inlineDesc: ''
                            }, {
                                key: 'value3',
                                value: '报警',
                                inlineDesc: ''
                            }, {
                                key: 'value4',
                                value: '警告',
                                inlineDesc: ''
                            }]
                        }, {
                            key: 'value2',
                            value: '故障',
                            inlineDesc: '',
                            children:[{
                                key: 'value1',
                                value: '666',
                                inlineDesc: ''
                            }, {
                                key: 'value2',
                                value: '888',
                                inlineDesc: ''
                            }]
                        }, {
                            key: 'value3',
                            value: '报警',
                            inlineDesc: ''
                        }, {
                            key: 'value4',
                            value: '警告',
                            inlineDesc: ''
                        }]
                    }
                ]
            }
        },
        methods:{
            onCheckListChange(list,index){
                console.log(list)
                this.options[index].checklist=list;
            },
            seachDetail(){
                this.$router.push('search')
            }
        }
    }
</script>
<style lang="less" scoped>
@import '../../css/index';
</style>


