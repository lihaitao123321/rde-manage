<template>
    <div class="t_page">
        <drawer
                :show.sync="drawerVisibility"
                show-mode="push"
                placement="right"
                :drawer-style="{'background-color':'white', width: '330px'}"
        >
            <!-- drawer content -->
            <div slot="drawer" style="height: 100%;">
                <CaoZuoDrawer v-model="rightOptions" @search="onSearch()"></CaoZuoDrawer>
            </div>
            <!-- main content -->
            <div class="main_content">
                <div class="header">
                    <div class="left">
                        <i class="el-icon-arrow-left" @click="$router.goBack()"></i>
                    </div>
                    <div class="search">
                        <div class="input_warp">
                            <div class="left_search_icon">
                                <i class="el-icon-search"></i>
                            </div>
                            <div class="search_content">
                                <input placeholder="请输入搜索内容">
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <i class="fa fa-filter" @click="showDrawer"></i>
                    </div>
                </div>
                <div class="content">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                        <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                @load="onLoad"
                        >
                            <div class="content_item" v-for="(item,index) in dataList">
                                <div class="item_top">
                                    <div class="line">
                                        <div class="label">操作内容:</div>
                                        <div class="value">
                                            {{item.operate}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">操作对象:</div>
                                        <div class="value">
                                            {{item.name}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">所属系统:</div>
                                        <div class="value">
                                            {{item.subProjectName}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">所属项目:</div>
                                        <div class="value">{{item.projectName}}</div>
                                    </div>
                                </div>
                                <div class="item_bottom">
                                    <div class="icons">
                                        <div class="item1" v-if="Number(item.online) === 0">
                                            <div class="online"></div>
                                            在线
                                        </div>
                                        <div class="item11" v-else-if="Number(item.online) === 1">
                                            <div class="online1"></div>
                                            不在线
                                        </div>
                                        <div class="item2" v-if="Number(item.status) === 1">
                                            R 运行中
                                        </div>
                                        <div class="item21" v-else-if="Number(item.status) === 2">
                                            S 停止中
                                        </div>
                                        <div class="item22" v-else-if="Number(item.status) === 3">
                                            L 离线
                                        </div>
                                        <div class="item23" v-else-if="Number(item.status) === 4">
                                            --
                                        </div>
                                        <div class="item31" v-if="Number(item.alarmLevel) === 0">
                                            W 警告
                                        </div>
                                        <div class="item3" v-else-if="Number(item.alarmLevel) === 1">
                                            F 报警
                                        </div>
                                        <div class="item32" v-else-if="Number(item.alarmLevel) === 2">
                                            M 故障
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </div>
        </drawer>
    </div>
</template>
<script>
    import warn from '../Warn/warn.js'
    import { Drawer } from "vux";
    import CaoZuoDrawer from "./components/CaoZuoDrawer";
    export default {
        components: {
            Drawer,
            CaoZuoDrawer
        },
        name: "caoZuoList",
        data(){
            return{
                loading: false,
                finished: false,
                refreshing: false,
                pageNum:0,
                pageSize:10,
                total:0,
                dataList:[],
                drawerVisibility: false,
                rightOptions: {
                    rangeTime:[],
                    deviceTypeId: '',
                    deviceModelId: '',
                    deviceSystemId: '',
                    deviceProjectId:'',
                    deviceCommStatusId:[],
                    deviceWorkStatusId:[],
                    deviceAlarmStatusId:[],
                    handleType:[],
                    userId:'',
                }
            }
        },
        methods:{
            onLoad() {
                this.pageNum ++;
                this.getWarnFun();
            },
            onRefresh() {
                this.pageNum = 1
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.refreshing = true;
                this.getWarnFun();
            },
            onSearch(){
                this.drawerVisibility = false
                this.onRefresh()
            },
            getWarnFun(){
                warn.operationRecords({
                    ...this.rightOptions,
                    "pageSize":this.pageSize,
                    "pageNum":this.pageNum
                }).then(res=>{
                    if (this.refreshing) {
                        this.dataList = [];
                        this.refreshing = false;
                    }
                    this.dataList = this.dataList.concat(res.data.data)
                    this.total = res.data.total
                    this.loading = false;
                    if(this.dataList.length < (this.pageNum-1)*this.pageSize){
                        this.finished = true;
                    }
                })
            },
            openSearchPage() {
                this.$router.push("/caoZuoSearch");
            },
            toDetail(param){
                sessionStorage.setItem('thingId',param.thingId);
                sessionStorage.setItem('abbreviate',param.abbreviate)
                this.$router.push({path:'/CycleWaterWarn'});
            },
            showDrawer() {
                this.drawerVisibility = !this.drawerVisibility;
            }
        }
    }
</script>
<style lang="less" scoped>
    .main_content {
        width: 100%;
        height: 170px;
        .header {
            display: flex;
            position: absolute;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background-color: white;
            .left {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                i {
                    font-size: 22px;
                    font-weight: bold;
                    color: #333333;
                }
            }
            .right {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                i {
                    font-size: 20px;
                    color: #343434;
                }
            }
            .search {
                display: flex;
                align-items: center;
                flex-grow: 1;
                height: 50px;
                .input_warp {
                    display: flex;
                    width: 100%;
                    height: 30px;
                    background: rgba(222, 222, 224, 0.3);
                    border-radius: 30px;
                    .left_search_icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 100%;
                        border-radius: 30px;
                        i {
                            font-size: 18px;
                            color: #999999;
                        }
                    }
                    .search_content {
                        flex-grow: 1;
                        input {
                            width: 100%;
                            height: 100%;
                            background: none;
                            border: none;
                            outline: none;
                            color: #666666;
                        }
                        input::placeholder {
                            font-size: 14px;
                            color: #999999;
                        }
                    }
                }
            }
        }

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
        }
    }
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
                .item11{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                    .online1{
                        width:7px;
                        height:7px;
                        background:rgba(128,128,128,1);
                        border-radius:50%;
                        margin-right: 5px;
                    }
                }
                .item2 {
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
                    /*width: 74px;*/
                    /*height: 26px;*/
                    /*line-height: 26px;*/
                    /*text-align: center;*/
                    /*font-size: 13px;*/
                    /*ackground:rgba(26,204,131,0.1);*/
                    /*border-radius:13px;*/

                    /*font-family:PingFang-SC-Bold;*/
                    /*font-weight:bold;*/
                    /*background:rgba(26,204,131,1);*/
                    .run {
                        /*width:7px;*/
                        /*height:7px;*/
                        /*background:rgba(26,204,131,1);*/
                        /*border-radius:50%;*/
                        /*margin-right: 5px;*/
                    }
                }
                .item21{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                }
                .item22{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                }
                .item23{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background:rgba(128,128,128,0.1);
                    border-radius: 13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(128,128,128,1);
                }
                .item3 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(255,165,35,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(255,165,35,1);
                }
                .item31 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(255,94,57,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(255,94,57,1);
                }
                .item32{
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
                .item33{
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background:rgba(26,204,131,0.1);
                    border-radius:13px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(26,204,131,1);
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
