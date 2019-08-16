<template>
    <div>
        <div class="content_item" v-for="item in 10">
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
                    <div class="value">B001逆变器</div>
                </div>
                <div class="line">
                    <div class="label">所属电站:</div>
                    <div class="value">瑞德恩屋顶电站</div>
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
    </div>
</template>

<script>
    export default {
        name: "baoJingList"
    }
</script>

<style lang="less" scoped>
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
</style>