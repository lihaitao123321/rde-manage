<template>
    <div class="rightWarp">
        <div class="header">
            项目
        </div>
        <div class="footer">
            <div class="reset">重置</div>
            <div class="ok">确认</div>
        </div>
        <div class="list">
            <div class="little_title">项目位置:</div>
            <el-select v-model="value" placeholder="国家" style="width: 90px;">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            
            <el-select v-model="value" placeholder="省份" style="width: 90px;">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value" placeholder="城市" style="width: 90px;">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div class="little_title">项目类型：</div>
            <el-select v-model="value" placeholder="项目类型" style="width: 185px;">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div class="little_title">设计负荷：</div>
           <el-input v-model='value' style="width:100px"></el-input><span class="KW">KW</span>一
           <el-input v-model='value' style="width:100px"></el-input><span class="KW">KW</span>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: "xiangMuDrawer",
        components: {
            
        },
        data(){
            return {
                select:'',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                checkedButtonDics1:[{
                    value:'1',
                    label:'在线'
                },{
                    value:'2',
                    label:'离线'
                }],
                checkedButtonDics2:[{
                    value:'1',
                    label:'运行'
                },{
                    value:'2',
                    label:'停止'
                }],
                checkedButtonDics3:[{
                    value:'1',
                    label:'正常'
                },{
                    value:'2',
                    label:'故障'
                },{
                    value:'3',
                    label:'报警'
                },{
                    value:'4',
                    label:'警告'
                }],
                checkedList1:[],
                checkedList2:[],
                checkedList3:[],
                value:''
            }
        }
    }
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
        .footer{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height:70px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            .reset{
                display: flex;
                align-items: center;
                justify-content: center;
                width:93px;
                height:41px;
                background:rgba(242,242,245,1);
                border-radius:5px;
                font-size:16px;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                color:rgba(102,102,102,1);
                margin-right: 18px;
            }
            .ok{
                display: flex;
                align-items: center;
                justify-content: center;
                width:188px;
                height:41px;
                background:rgba(43,127,243,1);
                border-radius:5px;
                font-size:16px;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
        }
        .little_title{
            height:20px;
            line-height: 20px;
            font-size:12px;
            font-family:PingFangSCMedium;
            font-weight:500;
            color:rgba(153,153,153,1);
            margin-top: 10px;
            margin-bottom: 5px;
        }
        .list{
            position: absolute;
            bottom: 70px;
            left: 0;
            top: 46px;
            right: 0;
            padding: 0 10px;
            color: #E3E3E6;
            overflow-y: auto;
            
            .KW{
                font-size:14px;
                font-family:PingFangSCMedium;
                font-weight:500;
                color:rgba(33,33,33,1);
                margin-left:5px;
            }
            
        }
    }
</style>