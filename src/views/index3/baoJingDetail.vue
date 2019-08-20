<template>
    <div class="t_page">
        <XHeader :left-options="{preventGoBack:true}"
                 @on-click-back="$router.goBack()"
                 title="B001 循环水报警">
        </XHeader>
        <div class="content">
            <div class="content_item">
                <div class="item_top">
                    <div class="line">
                        <div class="label">报警描述:</div>
                        <div class="value">越上限报警</div>
                    </div>
                    <div class="line">
                        <div class="label">报警变量:</div>
                        <div class="value">X001 CPU工作温度</div>
                    </div>
                    <div class="line">
                        <div class="label">报警对象:</div>
                        <div class="value">B001 循环水泵</div>
                    </div>
                    <div class="line">
                        <div class="label">所属系统:</div>
                        <div class="value">NYGL01 1号楼能源管理</div>
                    </div>
                    <div class="line">
                        <div class="label">所属项目:</div>
                        <div class="value">镇江出版大厦</div>
                    </div>
                    <div class="line">
                        <div class="label">解除时间:</div>
                        <div class="value">2019-03-17 19:22:00</div>
                    </div>
                    <div class="line">
                        <div class="label">恢复时间:</div>
                        <div class="value">2019-03-18 19:22:00</div>
                    </div>
                </div>
                <div class="item_bottom">
                    <div class="icons">
                        <div class="item1">
                            <img src="../../assets/images/index3/warning@2x.png">故障
                        </div>
                        <div class="item2">
                            报警中
                        </div>
                    </div>
                    <div class="time">
                        2019-08-12 15:00
                    </div>
                </div>
            </div>
            <div class="all-mon">
                <div class="title">
                    <div>报警折线图</div>
                    <div @click="jumpUrl('fadianbaobiao')"><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                </div>
                <div class="pillar-box" id="mountNode">
<!--                    <v-chart-->
<!--                            class="chart-box"-->
<!--                            :data="chartData"-->
<!--                            prevent-default>-->
<!--                        <v-scale x :tick-count="3" />-->
<!--                        <v-tooltip :show-item-marker="false" show-x-value />-->
<!--                        <v-line />-->
<!--                    </v-chart>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        XHeader,
        Drawer,
        VChart,
        VScale,
        VTooltip,
        VLine

    } from 'vux'
    import baoJingDrawer from './baoJingDrawer';
    import baoJingList from './baoJingList';

    export default {
        components: {
            XHeader,
            Drawer,
            VChart,
            VScale,
            VTooltip,
            VLine,
            baoJingDrawer,
            baoJingList
        },
        data() {
            return {
                drawerVisibility: false,
                showModeValue: 'push',
            }
        },
        created(){

        },
        mounted(){
            this.init();
        },
        methods: {
            init(){

            },
            showDrawer() {
                this.drawerVisibility = !this.drawerVisibility;
            }
        },

    }
</script>

<style lang="less" scoped>
    .content {
        position: absolute;
        z-index: 1;
        top: 50px;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow-y: auto;
        padding: 0 15px;

        .content_item {
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
            margin-top: 15px;
            .item_top {
                padding: 0 17px 8px 17px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);

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
                        font-family: PingFangSCMedium;
                        color: #212121;
                        padding-left: 10px;
                    }
                }
            }

            .item_bottom {
                display: flex;
                align-items: center;
                height: 47px;
                padding: 0 17px;

                .icons {
                    display: flex;
                    flex-grow: 1;

                    .item1 {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 74px;
                        height: 26px;
                        background: rgba(248, 146, 0, 0.1);
                        border-radius: 13px;
                        margin-right: 16px;
                        color: #F89200;

                        img {
                            width: 14px;
                            height: 12px;
                            margin-right: 6px;
                        }
                    }

                    .item2 {
                        width: 74px;
                        height: 26px;
                        line-height: 26px;
                        text-align: center;
                        background: rgba(210, 38, 66, 0.1);
                        border-radius: 13px;
                        color: #D22642;
                        font-size: 13px;
                    }
                }

                .time {
                    font-size: 13px;
                    font-family: PingFangSCMedium;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                }
            }
        }
        .all-mon{
            margin-top: 20px;
            .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 18px;
                div{
                    &:nth-child(1){
                        font-size: 21px;
                        font-weight: bold;
                        color: #212121;
                    }
                    &:nth-child(2){
                        padding: 6px 13px;
                        border-radius: 13px;
                        background: rgba(255,255,255,1);
                        font-size: 13px;
                        color: #2B7FF3;
                        display: flex;
                        align-items: center;
                        padding-right: 8px;
                        .back-icon{
                            fill: #2B7FF3;
                        }
                    }
                }
            }
            .chart-box{
                height: 140px;
                margin: 0 auto;
                border-radius: 5px;
                background: #ffffff;
                box-sizing: border-box;
                &.mb13{
                    margin-bottom: 13px;
                }
            }
            .pillar-box{
                height: 295px;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 5px;
                background: #ffffff;
                box-sizing: border-box;
                .chart-box{
                    margin: 0 auto;
                }
            }

        }
    }

</style>