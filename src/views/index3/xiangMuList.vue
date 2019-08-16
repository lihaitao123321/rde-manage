<template>
    <div>
        <div class="content_item" v-for="item in 10">
            <div class="item_top">
                <div class="line">
                    <div class="label">项目名称:</div>
                    <div class="value">
                        DF002 鼓楼医院综合楼
                    </div>
                </div>
                <div class="line">
                    <div class="label">项目位置:</div>
                    <div class="value">
                        江苏省南京中山路北路10号
                    </div>
                </div>
                <div class="line">
                    <div class="label">项目类型:</div>
                    <div class="value">
                        医院
                    </div>
                </div>
                <div class="line">
                    <div class="label">设计负荷:</div>
                    <div class="value">
                        3600KW
                    </div>
                </div>
            </div>
            <div class="item_bottom">
                <div class="item">
                    <div class="title">在线率:</div>
                    <div class="one">
                        35%
                    </div>
                </div>
                <div class="item">
                    <div class="title">运行率:</div>
                    <div class="two">
                        96%
                    </div>
                </div>
                <div class="item">
                    <div class="title">报警率:</div>
                    <div class="three">
                        2%
                    </div>
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
            .item{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-grow: 1;
                width: 100%;
                .title{
                    color: #999999;
                    margin-right: 5px;
                }
                .one{
                    color:#1ACC83;
                }
                .two{
                    color:#2B7FF3;
                }
                .three{
                    color:#D42843;
                }
            }
        }
    }
</style>