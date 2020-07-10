<template>
    <div class="t_page">
        <XHeader fixed :left-options="{preventGoBack:true}" @on-click-back="$router.goBack()" title="DF002能源站系统"> </XHeader>
        <div class="project-page">
            <div class="detail">
                <div class="top">
                    <div class="line">
                        <img height="19" src="../../assets/images/index3/温度(2)@2x.png">
                        <div><span class="number">{{projectVo.temperature}}</span><span class="unit">°C</span></div>
                    </div>
                    <div class="line">
                        <img height="19" src="../../assets/images/index3/湿度@2x.png">
                        <div><span class="number">{{projectVo.humidity}}</span><span class="unit">%RH</span></div>
                    </div>
                    <!--                <div class="line">-->
                    <!--                    <img height="19" src="../../assets/images/index3/空气质量@2x.png">-->
                    <!--                    <div><span class="number">18</span><span class="unit">μg/m3</span></div>-->
                    <!--                </div>-->
                    <div class="line">
                        <img height="19" src="../../assets/images/index3/天气@2x.png">
                        <div><span class="number">{{projectVo.weather}}</span><span class="unit"></span></div>
                    </div>
                </div>

                <div class="content_item">
                    <div class="flex">
                        <div class="item_top">
                            <div class="line">
                                <div class="label">项目位置:</div>
                                <div class="value">
                                    {{projectVo.location}}
                                </div>
                            </div>
                            <div class="line">
                                <div class="label">项目类型:</div>
                                <div class="value">
                                    {{projectVo.projectType}}
                                </div>
                            </div>
                            <div class="line">
                                <div class="label">设计负荷:</div>
                                <div class="value">
                                    {{projectVo.designLoad}}
                                </div>
                            </div>
                        </div>
                        <div><i class="el-icon-arrow-right"></i></div>
                    </div>

                    <div class="item_bottom">
                        <div class="item">
                            <div class="title1"><span class="point"></span>在线</div>
                        </div>
                        <div class="item">
                            <div class="title2"><span class="R">R</span>运行</div>
                        </div>
                        <div class="item">
                            <div class="title3"><span class="F">F</span>报警</div>
                        </div>
                        <XButton>查看视频</XButton>
                    </div>
                </div>
            </div>
            <div class="redBg">
                <div class="index-page">
                    <div class="index-top">
                        <div class="index-action">
                            <div class="action-box" @click="jumpUrl('projectNumber',1)">
                                <img class="navigation-icon" src="../../assets/images/index1/navigation1.png">
                                <div class="action-name">项目数量<span>(座)</span></div>
                                <div class="action-number">{{projectVo.projectNum}}</div>
                            </div>
                            <div class="action-box" @click="jumpUrl('projectNumber',2)">
                                <img class="navigation-icon" src="../../assets/images/index1/navigation2.png">
                                <div class="action-name">设备数量<span>(套)</span></div>
                                <div class="action-number">{{projectVo.deviceNum}}</div>
                            </div>
                            <div class="action-box" @click="jumpUrl('projectNumber',3)">
                                <img class="navigation-icon" src="../../assets/images/index1/navigation3.png">
                                <div class="action-name">负荷容量<span>(KW)</span></div>
                                <div class="action-number">{{projectVo.designLoad}}</div>
                            </div>
                            <!--                        <div class="action-box">-->
                            <!--                            <img class="navigation-icon" src="../../assets/images/index1/navigation4.png">-->
                            <!--                            <div class="action-name">新能源装机容量<span>(KW)</span></div>-->
                            <!--                            <div class="action-number">500</div>-->
                            <!--                        </div>-->
                            <div class="action-box" @click="jumpUrl('projectNumber',4)">
                                <img class="navigation-icon" src="../../assets/images/index1/navigation5.png">
                                <div class="action-name">实用用电功率<span>(KW)</span></div>
                                <div class="action-number">{{projectVo.realPower}}</div>
                            </div>
                            <!--                        <div class="action-box">-->
                            <!--                            <img class="navigation-icon" src="../../assets/images/index1/navigation6.png">-->
                            <!--                            <div class="action-name">新能源发电功率<span>(KW)</span></div>-->
                            <!--                            <div class="action-number">35</div>-->
                            <!--                        </div>-->
                        </div>
                        <div class="all-mon">
                            <div class="title">
                                <div>总体监控预览</div>
                                <div @click="jumpUrl('jiankongbaobiao')"><span>进入监控</span>
                                    <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                                </div>
                            </div>
                            <div class="chart-box mb13">

                            </div>
                        </div>
                        <div class="all-mon">
                            <div class="title">
                                <div>报警动态</div>
                                <div @click="jumpUrl('baojingbaobiao')"><span>进入报警</span>
                                    <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                                </div>
                            </div>
                            <div class="pillar-box">
                                <v-chart class="chart-box" :width="340" ref="demo3" :data="data3">
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
                                <div @click="jumpUrl('shiyonggonglvbaobiao')"><span>详情</span>
                                    <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                                </div>
                            </div>
                            <div class="pillar-box">
                                <v-chart :data="data5" class="chart-box" ref="dome5" :width="340">
                                    <v-scale x type="timeCat" />
                                    <v-scale y :min="0" alias="KW" />
                                    <v-point :style="{
                                        stroke: '#fff',
                                        lineWidth: 1
                                        }" shape="smooth" />
                                    <v-line shape="smooth" />
                                </v-chart>
                            </div>
                        </div>
                        <div class="all-mon">
                            <div class="title">
                                <div>新能源发电功率</div>
                                <div @click="jumpUrl('fadianbaobiao')"><span>详情</span>
                                    <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                                </div>
                            </div>
                            <div class="pillar-box">
                                <v-chart :data="data5" class="chart-box" :width="340">
                                    <v-scale x type="timeCat" />
                                    <v-scale y :min="0" alias="%" />
                                    <v-point :style="{
                                        stroke: '#fff',
                                        lineWidth: 1
                                        }" shape="smooth" />
                                    <v-line shape="smooth"/>
                                </v-chart>
                            </div>
                        </div>
                        <div class="all-mon">
                            <div class="title">
                                <div>绿色能源实时占比</div>
                                <div @click="jumpUrl('shishinengyuanbaobiao')"><span>详情</span>
                                    <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                                </div>
                            </div>
                            <div class="pillar-box">
                                <v-chart class="chart-box" :width="340" :data="data6" :padding="[20, 'auto']">
                                    <v-tooltip disabled />
                                    <v-scale y :options="yOptions" />
                                    <v-pie :radius="0.6" :inner-radius="0.6" series-field="name"
                                           :colors="['#FE5D4D','#3BA4FF','#737DDE']" />
                                    <v-legend :options="legendOptions" />
                                    <v-guide type="html" :options="htmlOptions" />
                                </v-chart>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>


<script>
    import {
        XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Tabbar, TabbarItem, Group, Cell, XInput, XButton,
        VChart, VLine, VArea, VTooltip, VLegend, VPie, VGuide, VBar, VScale, VPoint
    } from 'vux'
    import warn from '../Warn/warn.js'
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
        name: "xiangMuDetail",
        components: {
            XHeader,
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
        data() {
            return {
                projectVo:{

                },
                map,
                htmlOptions: {
                    position: ['50%', '50%'],
                    html: `
                    <div style="width: 250px;height: 40px;text-align: center;">
                        <div style="font-size: 24px; color:#212121;">49999</div>
                        <div style="font-size: 13px; color:#999999;">总数</div>
                    </div>`
                },
                legendOptions: {
                    position: 'bottom',
                    itemFormatter(val) {
                        return val + '  ' + map[val]
                    }
                },
                yOptions: {
                    formatter(val) {
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
                        type: 1,
                        checklist: [],
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
                    }, {
                        key: 2,
                        value: '报警级别',
                        type: 2,
                        checklist: [],
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
                    }, {
                        key: 3,
                        value: '报警状态',
                        type: 3,
                        checklist: [],
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: '',
                            children: [{
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
                            children: [{
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
        mounted(){
            this.getProjectDetailFun();
        },
        methods: {
          async  getProjectDetailFun(){
             await   warn.getProjectDetailFun(this.$route.params.id).then(res=>{
                    if(res.code === 0){
                        this.projectVo = res.data.projectVo;
                        if(Array.isArray(res.data.userCablePower) && res.data.userCablePower.length > 0){
                            let userPowerObj = {};let userPowerList = [];
                            res.data.userCablePower.forEach(item=>{
                                userPowerObj = {};
                                userPowerObj.time = item.workHour;
                                userPowerObj.tem = item.kwh;
                                userPowerList.push(userPowerObj);
                            });
                            this.data5 = userPowerList;
                        };
                    }
                }).catch()
            },
            jumpUrl(url,serialNum) {
                // this.$router.push('/' + url);
                this.$router.push({ name: url, params: { serialNum }})
            },
            toNoticeCenter() {
                this.$router.push('notice')
            },
            onCheckListChange(list, index) {
                this.options[index].checklist = list;
            },
            seachDetail() {
                this.$router.push('search')
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../../css/index';

    /deep/ .weui-btn {
        margin-left: 10px;
        margin-right: 0;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 14px;
        border-radius: 100px;
        width: 90px;
        height: 30px;
        background-color: #2B7FF3FF;
    }

    .t_page {
        overflow-y: auto;
        .project-page {
            height: 100%;
            overflow-y: auto;
            padding-bottom: 60px;
            .detail {
                margin: 20px 15px 10px;

                .top {
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    background-color: #FFFFFF;
                    border-radius: 6px;

                    .line {
                        display: flex;
                        align-items: center;

                        img {
                            margin-right: 5px;
                        }
                    }

                    .number {
                        font-size: 20px;
                        color: #333333FF;
                        font-weight: 600;
                    }

                    .unit {
                        font-size: 12px;
                        color: #999999FF;
                    }
                }

                .content_item {
                    background: rgba(255, 255, 255, 1);
                    border-radius: 10px;
                    margin-top: 15px;

                    .flex {
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    }

                    .item_top {
                        padding: 0 17px 8px 17px;
                        margin-right: 60px;

                        .line {
                            display: flex;
                            padding-top: 8px;

                            .label {
                                font-size: 14px;
                                font-family: PingFangSCMedium;
                                font-weight: 500;
                                color: rgba(153, 153, 153, 1);
                            }

                            .value {
                                font-size: 14px;
                                font-weight: 500;
                                font-family: PingFangSCMedium;
                                color: #212121;
                                padding-left: 10px;
                            }
                        }
                    }

                    .el-icon-arrow-right {
                        font-size: 20px;
                        color: #D9D9DBFF;
                    }

                    .item_bottom {
                        display: flex;
                        align-items: center;
                        height: 47px;
                        padding: 0 17px;
                        justify-content: space-around;

                        .item {
                            width: 75px;
                            height: 28px;
                            text-align: center;
                            line-height: 28px;

                            span {
                                margin-right: 7px;
                            }

                            .point {
                                display: inline-block;
                                width: 8px;
                                height: 8px;
                                background-color: #1ACC83FF;
                                vertical-align: middle;
                                border-radius: 8px;
                            }

                            .title1 {
                                color: #1ACC83FF;
                                background-color: #E4FDF3;
                                border-radius: 120px;
                                font-weight: 500;
                            }

                            .title2 {
                                color: #2B7FF3FF;
                                background-color: #E9F0FE;
                                border-radius: 120px;
                                font-weight: 500;
                            }

                            .title3 {
                                color: #D22642FF;
                                background-color: #FEE8EC;
                                border-radius: 120px;
                                font-weight: 500;
                            }
                        }
                    }
                }
            }

            .index-page {
                .index-top {
                    padding: 0 15px;
                    padding-bottom: 20px;
                    background: #EFEFEF;

                    .index-action {
                        margin-top: 15px;

                        .action-box {
                            width: 48%;
                        }
                    }

                    .all-mon {
                        margin-top: 10px;

                        .title {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-bottom: 18px;

                            div {
                                &:nth-child(1) {
                                    font-size: 21px;
                                    font-weight: bold;
                                    color: #212121;
                                }

                                &:nth-child(2) {
                                    padding: 6px 13px;
                                    border-radius: 13px;
                                    background: #FFFFFF;
                                    font-size: 13px;
                                    color: #2B7FF2FF;
                                    display: flex;
                                    align-items: center;
                                    padding-right: 8px;

                                    .back-icon {
                                        fill: #2B7FF2FF;
                                    }
                                }
                            }
                        }
                    }
                }

                .index-bottom {
                    padding: 0 15px;
                    padding-bottom: 20px;

                    .all-mon {
                        margin-top: 20px;

                        .title {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-bottom: 18px;

                            div {
                                &:nth-child(1) {
                                    font-size: 21px;
                                    font-weight: bold;
                                    color: #212121;
                                }

                                &:nth-child(2) {
                                    padding: 6px 13px;
                                    border-radius: 13px;
                                    background: rgba(255, 255, 255, 1);
                                    font-size: 13px;
                                    color: #2B7FF2FF;
                                    display: flex;
                                    align-items: center;
                                    padding-right: 8px;

                                    .back-icon {
                                        fill: #2B7FF2FF;
                                    }
                                }
                            }
                        }

                        .chart-box {
                            height: 140px;
                            margin: 0 auto;
                            border-radius: 5px;
                            background: #ffffff;
                            box-sizing: border-box;

                            &.mb13 {
                                margin-bottom: 13px;
                            }
                        }

                        .pillar-box {
                            height: 295px;
                            margin: 0 auto;
                            overflow: hidden;
                            border-radius: 5px;
                            background: #ffffff;
                            box-sizing: border-box;

                            .chart-box {
                                margin: 0 auto;
                            }
                        }

                    }
                }

            }
        }

    }
</style>
