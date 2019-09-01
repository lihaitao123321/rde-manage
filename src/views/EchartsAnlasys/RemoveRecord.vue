<template>
    <div class="t_page">
        <x-header
                title="解除记录"
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
        >
        </x-header>
        <div class="pageContent">
            <div class="bgImg_position">
                <div class="bgColor_position uf dc" v-for="(item,index) in removeList" :class="RemoveFun(index)">
                    <div class="warn_reason uf dc">
                        <div>{{item.warn_reason}}</div>
                        <div>{{item.warn_describe}}</div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        XHeader,
        XTextarea,
        Group,
        XInput,
        XButton
    } from 'vux'
    export default {
        components: {
            XHeader,
            XTextarea,
            Group,
            XInput,
            XButton
        },
        name: "RemoveRecord",
        data(){
            return{
                removeList:[{
                    warn_reason:'报警原因',
                    warn_describe:'机器人异常加速',
                },{
                    warn_reason:'原因分析',
                    warn_describe:'机器人限速程序出现异常',
                },{
                    warn_reason:'修复方案',
                    warn_describe:'已更新限速程序',
                },{
                    warn_reason:'操作人',
                    warn_describe:'擎天柱',
                },{
                    warn_reason:'处理时间',
                    warn_describe:'2018-04-20 17:45:00',
                },
                ],
                margin_top:'',
            }
        },
        methods:{
            RemoveFun(val){
               if(val == 0){
                   return 'margin_top'
               }else {
                   return'';
               }
            }
        }
    }
</script>

<style lang="less" scoped>
    .uf{
        display: flex;
    }
    .dr{
        flex-direction: row;
    }
    .dc{
        flex-direction: column;
    }
    .ac{
        align-items: center;
    }
    .jc{
        justify-content: center;
    }
    .margin_top{
        margin-top: 20px !important;
    }
    .pageContent {
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow-x: scroll;
        .bgImg_position {
            background-image: url("../../assets/images/index1/removeRecord2x.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin: 0px 5px 0px 5px;
        .bgColor_position {
            padding: 0px 17px;
            .warn_reason {
                width: 100%;

                div:nth-child(1) {
                    font-size: 18px;
                    margin: 24px 0px 15px 0px;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(33, 33, 33, 1);
                }

                div:nth-child(2) {
                    font-size: 16px;
                    font-family: PingFang SC;
                    font-weight: 200;
                    color: rgba(102, 102, 102, 1);
                }

                div:nth-child(3) {
                    width: 100%;
                    height: 24px;
                    border-bottom: 1px solid rgba(230, 230, 230, 1);
                }
            }
        }
    }
    }
</style>