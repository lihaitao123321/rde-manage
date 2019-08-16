<template>
    <div>
        <div class="content_item" v-for="item in 10">
            <div class="item_top">
                <div class="line">
                    <div class="label">设备名称:</div>
                    <div class="value">
                        F009 循环水泵
                    </div>
                </div>
                <div class="line">
                    <div class="label">设备型号:</div>
                    <div class="value">
                        QSB001
                    </div>
                </div>
                <div class="line">
                    <div class="label">设备类别:</div>
                    <div class="value">
                        水泵
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