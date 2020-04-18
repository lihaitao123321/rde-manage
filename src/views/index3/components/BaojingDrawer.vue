<template>
    <div class="rightWarp">
        <div class="header">报警</div>
        <div class="footer">
            <div class="reset" @click="searchReset">重置</div>
            <div class="ok" @click="searchOk">确认</div>
        </div>
        <div class="list" v-if="showOptions">
            <DatePicker v-model="defaultData.rangeTime"></DatePicker>
            <DeviceTypePicker v-model="defaultData.deviceTypeId"></DeviceTypePicker>
            <DeviceModelPicker v-model="defaultData.deviceModelId"></DeviceModelPicker>
            <DeviceSystemPicker v-model="defaultData.deviceSystemId"></DeviceSystemPicker>
            <DeviceProjectPicker v-model="defaultData.deviceProjectId"></DeviceProjectPicker>
            <div class="little_title">通讯状态：</div>
            <CheckButtonList :data="checkedButtonDics1" v-model="defaultData.deviceCommStatusId"></CheckButtonList>
            <div class="little_title">工作状态：</div>
            <CheckButtonList :data="checkedButtonDics2" v-model="defaultData.deviceWorkStatusId"></CheckButtonList>
            <div class="little_title">报警状态：</div>
            <CheckButtonList :data="checkedButtonDics3" v-model="defaultData.deviceAlarmStatusId"></CheckButtonList>
        </div>
    </div>
</template>
<script>
    import DeviceTypePicker from "@/components/searchPicker/DeviceTypePicker";
    import DeviceModelPicker from "@/components/searchPicker/DeviceModelPicker";
    import DeviceSystemPicker from "@/components/searchPicker/DeviceSystemPicker";
    import DeviceProjectPicker from "@/components/searchPicker/DeviceProjectPicker";
    import DatePicker from "@/components/searchPicker/DatePicker";
    import CheckButtonList from "@/components/checkButtonList";

    export default {
        name: "searchOptions",
        components: {
            DeviceTypePicker,
            DeviceModelPicker,
            DeviceSystemPicker,
            DeviceProjectPicker,
            DatePicker,
            CheckButtonList,
        },
        props: {
            value: {
                type: Object,
                default() {
                    return {
                        rangeTime: ['',''],
                        deviceTypeId: '',
                        deviceModelId: '',
                        deviceSystemId: '',
                        deviceProjectId:'',
                        deviceCommStatusId:[],
                        deviceWorkStatusId:[],
                        deviceAlarmStatusId:[],
                    };
                }
            }
        },
        data() {
            return {
                showOptions:false,//防止子组件多次请求接口
                defaultData: JSON.parse(JSON.stringify(this.value)),
                checkedButtonDics1:[],
                checkedButtonDics2:[],
                checkedButtonDics3:[],
            };
        },
        methods: {
            async initData(){
                //初次加载数据
                await this.$store.dispatch("enumeration/getDeviceTypeList");
                this.showOptions = true
                this.checkedButtonDics1 = await this.$store.dispatch("enumeration/getDeviceCommStatusList");
                this.checkedButtonDics2 = await this.$store.dispatch("enumeration/getDeviceWorkStatusList");
                this.checkedButtonDics3 = await this.$store.dispatch("enumeration/getDeviceAlarmStatusList");
            },
            searchReset() {
                this.defaultData.rangeTime = ['','']
                this.defaultData.deviceTypeId = ""
                this.defaultData.deviceModelId = ""
                this.defaultData.deviceSystemId = ""
                this.defaultData.deviceProjectId = ""
                this.defaultData.deviceCommStatusId = []
                this.defaultData.deviceWorkStatusId = []
                this.defaultData.deviceAlarmStatusId = []
                this.searchOk();
            },
            searchOk() {
                this.$emit("input", JSON.parse(JSON.stringify(this.defaultData)));
                this.$emit("search");
            }
        },
        created(){
            this.initData()
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
                width: 196px;
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
