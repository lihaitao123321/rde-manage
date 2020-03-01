<template>
    <div class="t_page">
        <x-header
                title="解除报警"
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
        >
        </x-header>
        <div class="pageContent">
            <div class="uf dc box_warn_reason">
                <div class="warn_reason uf ac">报警原因</div>
                <div class="Temperature_limit uf ac">CPU工作温度越上限报警</div>
            </div>
            <div class="group_style">
                <group>
                    <x-input disabled :placeholder="$t('原因分析')"></x-input>
                    <x-textarea :max="200" v-model="reasonAnalysis" :show-counter="false" name="description" :placeholder="$t('请输入报警原因分析...')"></x-textarea>
                </group>
            </div>
            <div class="group_style">
                <group>
                    <x-input disabled :placeholder="$t('修复方案')"></x-input>
                    <x-textarea :max="200" v-model="repairPlan" :show-counter="false" name="description" :placeholder="$t('请输入修复方案...')"></x-textarea>
                </group>
            </div>
        </div>
        <div class="bottom_buttton">
            <x-button @click.native="cancelAlarm">提交</x-button>
        </div>
    </div>
</template>

<script>
    import warn from '../Warn/warn.js'
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
        name: "CancelAlarm",
        data(){
            return{
                reasonAnalysis:'',
                repairPlan:'',
            }
        },
        created(){

        },
        methods:{
            cancelAlarm(){
                warn.cancelAlarmFun(this.reasonAnalysis,this.repairPlan).then(respont=>{
                    console.log('天之蓝',respont);
                }).catch(res=>{})
            }
        }
    }
</script>

<style lang="less" scoped>
    .pageContent {
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow-x: scroll;
    }
    .bottom_buttton{
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height:60px;
        background:rgba(255,255,255,1);
        display: flex;
        align-items: center;
       padding: 0px 15px;
        /deep/.weui-btn_default{
            background-color: rgba(43,127,243,1);
            color: rgba(255,255,255,1);
        }
        /deep/.weui-btn{
            border-radius: 20px;
        }
    }
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
    .group_style{
        width: calc(100% - 20px);
        margin: 0px 10px 0px 10px;
        height:160px;
        background:rgba(255,255,255,1);
        border-radius:5px;
        /deep/.vux-x-input.disabled .weui-input{
            -webkit-text-fill-color: rgba(52,52,52,1);
            text-fill-color: rgba(52,52,52,1);
            opacity: 1;
        }
        /deep/.weui-textarea{
            font-size:13px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(52,52,52,1);
        }
        /deep/ .weui-input{
            font-size:18px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(52,52,52,1)!important;
        }
    }
    .box_warn_reason{
        width: calc(100% - 20);
        height:95px;
        margin: 10px 10px;
        background:linear-gradient(0deg,rgba(15,121,233,1),rgba(78,159,244,1));
        border-radius:5px;
        .warn_reason{
            height: 50%;
            padding-left: 17px;
            font-size:18px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(255,255,255,1);
            border-bottom: 1px solid rgba(200,200,200,0.5);
        }
        .Temperature_limit{
            height: 50%;
            padding-left: 17px;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:260;
            color:rgba(255,255,255,1);
        }
    }
</style>