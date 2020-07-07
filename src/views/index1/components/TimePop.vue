<template>
    <div>
        <div class="little_title">开始时间：</div>
        <div class="uf uf-ac picker" @click="clickStart">
            <div class="uf-f1 placeholder">{{placeholder1}}</div>
            <i class="el-icon-caret-bottom sanjiao"></i>
        </div>
        <div class="little_title">结束时间：</div>
        <div class="uf uf-ac picker" @click="clickEnd">
            <div class="uf-f1 placeholder">{{placeholder2}}</div>
            <i class="el-icon-caret-bottom sanjiao"></i>
        </div>
        <datetime
                format="YYYY-MM-DD HH:mm"
                v-show="false"
                ref="startDate"
                v-model="startDate"
                :show="showStart"
                @on-confirm="onStartConfirm"
                @on-cancel="startDate=false"
        ></datetime>
        <datetime
                format="YYYY-MM-DD HH:mm"
                v-show="false"
                ref="endDate"
                v-model="endDate"
                :show="showEnd"
                @on-confirm="onEndConfirm"
                @on-cancel="endDate =false"
        ></datetime>
    </div>
</template>
<script>
    import { Picker, Popup, PopupHeader, Datetime } from "vux";
    export default {
        name: "searchOptions",
        components: {
            Picker,
            Popup,
            PopupHeader,
            Datetime
        },
        props: {
            value: {
                type: [Array],
                default() {
                    return ['',''];
                }
            }
        },
        data() {
            return {
                startDate:'',
                endDate:'',
                showStart:false,
                showEnd:false,
                placeholder1: this.value[0],
                placeholder2: this.value[1],
                select: [this.value],
                options: [],
                demo4:''
            };
        },
        methods: {
            clickStart(){
                this.showStart = true
            },
            clickEnd(){
                this.showEnd = true
            },
            onStartConfirm(value){
                this.showStart = false
                this.placeholder1 = value
                this.$emit('input',[this.startDate,this.endDate])
            },
            onEndConfirm(value){
                this.showEnd = false
                this.placeholder2 = value
                this.$emit('input',[this.startDate,this.endDate])
            },
        },
        watch: {
            value() {
                if(this.value.length>0){
                    this.placeholder1 = this.value[0]
                    this.placeholder2 = this.value[1]
                }else{
                    this.placeholder1 = ''
                    this.placeholder2 = ''
                }
            }
        }
    };
</script>
<style lang="less" scoped>

    .rightWarp {
        position: relative;
        height: 100%;
        .header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 46px;
            padding: 0 10px;
            line-height: 46px;
            font-size: 17px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 70px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            .reset {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 93px;
                height: 41px;
                background: rgba(242, 242, 245, 1);
                border-radius: 5px;
                font-size: 16px;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(102, 102, 102, 1);
                margin-right: 18px;
            }
            .ok {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 188px;
                height: 41px;
                background: rgba(43, 127, 243, 1);
                border-radius: 5px;
                font-size: 16px;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
        }
        .little_title {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            font-family: PingFangSCMedium;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            margin-top: 10px;
            margin-bottom: 5px;
        }
        .list {
            position: absolute;
            bottom: 70px;
            left: 0;
            top: 46px;
            right: 0;
            padding: 0 10px;
            color: #e3e3e6;
            overflow-y: auto;
            .picker {
                width:196px;
                height: 34px;
                padding: 10px;
                background: rgba(242, 242, 245, 1);
                border-radius: 3px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                .sanjiao {
                    color: #2b7ff3;
                }
                .placeholder {
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                }
            }
            .line{
                width:12px;
                height:2px;
                margin: 0 8px;
                background:rgba(227,227,230,1);
                border-radius:1px;
            }
            .inputClass {
                width: 100px;
                height: 34px;
                background: rgba(242, 242, 245, 1);
                border-radius: 3px;
                border: none;
                outline: none;
                padding-left: 8px;
                margin-right: 9px;
            }
            .KW {
                font-size: 14px;
                font-family: PingFangSCMedium;
                font-weight: 500;
                color: rgba(33, 33, 33, 1);
            }
            .hr {
                color: #f2f2f5;
                width: 12px;
                opacity: 0.3;
            }
        }
    }
</style>
