<template>
    <div class="t_page">
        <XHeader :left-options="{preventGoBack:true, backText: ''}"
            @on-click-back="$router.goBack()"
            title="x009循环水泵">
        </XHeader>
        <div class="shebei-content">
            <div class="content_item">
                <div class="item_top" @click="jumpUrl('shebeishuxingDetail')">
                    <div class="line">
                        <div class="label">设备名称:</div>
                        <div class="value">
                            F009 循环水泵
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">所属系统:</div>
                        <div class="value">NYGL01 1号楼能源管理系统</div>
                    </div>
                    <div class="line">
                        <div class="label">所属项目:</div>
                        <div class="value">镇江出版大厦</div>
                    </div>
                </div>
                <div class="item_bottom">
                    <div class="icons">
                        <div class="item1">
                            <div class="online"></div>在线
                        </div>
                        <div class="item2">
                            R 运行
                        </div>
                        <div class="item3">
                            F 报警
                        </div>
                        <div class="item4">
                            查看视频
                        </div>
                    </div>
                </div>
            </div>
            <div class="all-mon">
                <div class="title">
                    <div>模式状态</div>
                    <div @click="jumpUrl('moshizhuangtaiDetail')"><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                </div>
                <div class="pillar-box">
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">1</span>
                            <span class="names">AA1</span>
                            <span class="titles">工作状态</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">运行</span>
                            <img class="icon-image" src="../../assets/images/index3/fresh.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">2</span>
                            <span class="names">AA1</span>
                            <span class="titles">运行模式</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">制冷</span>
                            <img class="icon-image" src="../../assets/images/index3/leng.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">3</span>
                            <span class="names">AA1</span>
                            <span class="titles">节能模式</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">节能启用</span>
                            <img class="icon-image" src="../../assets/images/index3/go.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">4</span>
                            <span class="names">AA1</span>
                            <span class="titles">故障状态</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">正常</span>
                            <img class="icon-image" src="../../assets/images/index3/zhengchang.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">5</span>
                            <span class="names">AA1</span>
                            <span class="titles">风速</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">中速</span>
                            <img class="icon-image" src="../../assets/images/index3/zhongsu.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">6</span>
                            <span class="names">AA1</span>
                            <span class="titles">温控器模式</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">远程</span>
                            <img class="icon-image" src="../../assets/images/index3/yuancheng.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="all-mon">
                <div class="title">
                    <div>参数显示</div>
                    <div @click="jumpUrl('canshuDetail')"><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                </div>
                <div class="pillar-box">
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">1</span>
                            <span class="names">AA1</span>
                            <span class="titles">累计运行时间</span>
                        </div>
                        <div class="rights">
                            <span class="state-name blue">1450</span>
                            <span class="units">H</span>
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">2</span>
                            <span class="names">AA1</span>
                            <span class="titles">实时功率</span>
                        </div>
                        <div class="rights">
                            <span class="state-name blue">26</span>
                            <span class="units">KW</span>
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">3</span>
                            <span class="names">AA1</span>
                            <span class="titles">供水温度</span>
                        </div>
                        <div class="rights">
                            <span class="state-name blue">15</span>
                            <span class="units"> ℃</span>
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">4</span>
                            <span class="names">AA1</span>
                            <span class="titles">回水温度</span>
                        </div>
                        <div class="rights">
                            <span class="state-name blue">7.5</span>
                            <span class="units"> ℃</span>
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">5</span>
                            <span class="names">AA1</span>
                            <span class="titles">冷凝器低压压力</span>
                        </div>
                        <div class="rights">
                            <span class="state-name blue">0.67</span>
                            <span class="units">Bar</span>
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">6</span>
                            <span class="names">AA1</span>
                            <span class="titles">温控器模式</span>
                        </div>
                        <div class="rights">
                            <span class="state-name blue">0.15</span>
                            <span class="units">Bar</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="all-mon">
                <div class="title">
                    <div>报警</div>
                    <div class="rights">
                        <div @click="jumpUrl('baojingbianliangDetail')"><span>报警变量</span></div>
                        <div><span>进入报警</span></div>
                    </div>
                    
                </div>
                <div class="pillar-box">
                    <v-chart
                        class="chart-box"
                        :width= "340"
                        ref="demo3"
                        style="height: auto;"
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
        <div class="footer">
            <div>流程图监控</div>
            <div>模型图监控</div>
            <div @click="jumpUrl('caozuo')">操作</div>
        </div>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Tabbar, TabbarItem, Group, Cell,XInput,XButton, 
      VChart, VLine, VArea, VTooltip, VLegend, VPie, VGuide, VBar, VScale, VPoint } from 'vux'
    export default {
        name: "sheBeiDetail",
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
        data(){
            return{
                data3: [
                    { name: '电站设备', title: '故障', nub: 18.9 },
                    { name: '电站设备', title: '报警', nub: 28.8 },
                    { name: '电站设备', title: '警告', nub: 39.3 },
                    { name: '电站设备', title: '离线', nub: 81.4 }
                ],
            }
        },
        methods:{
            jumpUrl(url){
                this.$router.push(url)
            },
        }
    }
</script>

<style lang="less" scoped>
.t_page{
    overflow-y: scroll;
}
.shebei-content{
    padding: 15px;
    padding-bottom: 70px;
    overflow-y: scroll;
    .all-mon{
        width: 345px;
        margin: 15px auto;
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 18px;
            div{
                &:nth-child(1){
                    font-size: 21px;
                    font-weight: bold;
                }
                &:nth-child(2){
                    padding: 6px 13px;
                    border-radius: 13px;
                    background: #ffffff;
                    font-size: 13px;
                    color: #2B7FF3;
                    display: flex;
                    align-items: center;
                    padding-right: 8px;
                    .back-icon{
                        fill: #2B7FF3;
                    }
                }
                &.rights{
                    padding: 0;
                    border-radius: 0;
                    background: none;

                    div{
                        padding: 6px 16px;
                        border-radius: 13px;
                        background: #ffffff;
                        font-size: 13px;
                        color: #2B7FF3;
                        display: flex;
                        align-items: center;
                        &:nth-child(2){
                            background: #2B7FF3;
                            color: #ffffff;
                            margin-left: 22px;
                        }
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
            margin: 0 auto;
            overflow: hidden;
            border-radius: 5px;
            background: #ffffff;
            box-sizing: border-box;
            font-size: 15px;
            color: #666666;
            .item-con{
                border-bottom: 1px solid #D6D6D6;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 55px;
                padding-left: 19px;
                padding-right: 28px; 
                &:last-child{
                    border-bottom: none;
                }
                .lefts{
                    span{
                        margin-right: 15px;
                    }
                }
                .rights{
                    display: flex;
                    align-items: center;
                    color: #333333;
                    .blue{
                        color: #2B7FF3;
                        font-size: 16px;
                    }
                    .icon-image{
                        margin-left: 5px;
                        width: 18px;
                        height: 15px;
                    }
                    .units{
                        margin-left: 5px;
                    }
                }
            }
        }

    }
}
.footer{
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    div{
       width: 107px;
       height: 38px;
       border: 1px solid #2B7FF3;
       line-height: 38px;
       color: #2B7FF3; 
       text-align: center;
       border-radius: 19px;
       &:nth-child(1){
           background: #2B7FF3;
           color: #ffffff;
       }
       &:nth-child(3){
           background: #1ACC83;
           border: 1px solid #1ACC83;
           color: #ffffff;
       }
    }
}
    .content_item {
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
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
                justify-content: space-between;
                flex-grow: 1;

                .item1 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(26,204,131,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(26,204,131,1);
                    .online {
                        width:7px;
                        height:7px;
                        background:rgba(26,204,131,1);
                        border-radius:50%;
                        margin-right: 5px;
                    }
                }

                .item2 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(43,127,243,0.1);
                    border-radius:13px;

                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(43,127,243,1);
                }
                .item3 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(210,38,66,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:#D22642;
                }
                .item4{
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:#2B7FF3;
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    color:#ffffff;
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
</style>