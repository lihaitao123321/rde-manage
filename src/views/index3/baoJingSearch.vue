<template>
    <div class="t_page">
        <drawer
                :show.sync="drawerVisibility"
                :show-mode="showModeValue"
                placement="right"
                :drawer-style="{'background-color':'white', width: '330px'}"
        >
            <!-- drawer content -->
            <div slot="drawer" style="height: 100%;">
                <BaojingDrawer v-model="rightOptions" @search="refresh()"></BaojingDrawer>
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
                                <input placeholder="请输入搜索内容" readonly @click="openSearchPage">
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <i class="fa fa-filter" @click="showDrawer"></i>
                    </div>
                </div>
                <div class="content">
                    <Scroller
                            use-pullup
                            :pullup-config="pullupDefaultConfig"
                            @on-pullup-loading="loadMore"
                            use-pulldown
                            :pulldown-config="pulldownDefaultConfig"
                            @on-pulldown-loading="refresh"
                            lock-x
                            ref="scrollerBottom"
                            height="-95"
                            style="height:100%;">
                        <div class="">
                            <div class="content_item" v-for="(item, index) in warnList" :key="index" @click="toDetail(item)">
                                <div class="item_top">
                                    <div class="line">
                                        <div class="label">报警描述:</div>
                                        <div class="value">
                                            {{item.cause}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">报警变量:</div>
                                        <div class="value">
                                            {{item.name}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">报警对象:</div>
                                        <div class="value">
                                            {{item.deviceName}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">所属系统:</div>
                                        <div class="value">{{item.subProjectName}}</div>
                                    </div>
                                    <div class="line">
                                        <div class="label">所属项目:</div>
                                        <div class="value">{{item.projectName}}</div>
                                    </div>
                                </div>
                                <div class="item_bottom">
                                    <div class="icons">
                                        <div class="item1" v-if="Number(item.onLine) === 0">
                                            <div class="online"></div>在线
                                        </div>
                                        <div class="item11" v-else>
                                            <div class="online1"></div>不在线
                                        </div>
                                        <div class="item2" v-if="Number(item.status) === 1">
                                            <div class="run"> </div>R 运行
                                        </div>
                                        <div class="item21" v-else-if="Number(item.status) === 2">
                                            <div class="run1"> </div>S 停止
                                        </div>
                                        <div class="item22" v-else-if="Number(item.status) === 3">
                                            <div class="run2"> </div>L 离线
                                        </div>
                                        <div class="item23" v-else>
                                            <div class="run"> </div>—
                                        </div>
                                        <div class="item3" v-if="Number(item.alarmLevel) === 0">
                                            W 警告
                                        </div>
                                        <div class="item31" v-else-if="Number(item.alarmLevel) === 1">
                                            F 报警
                                        </div>
                                        <div class="item32" v-else-if="Number(item.alarmLevel) === 2">
                                            F 故障
                                        </div>
                                        <div class="item33" v-else>
                                            N 正常
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Scroller>
                </div>
            </div>
        </drawer>
    </div>
</template>
<script>
    import warn from '../Warn/warn.js'
    import { Scroller, Drawer } from "vux";
    import BaojingDrawer from "./components/BaojingDrawer";
    export default {
        components: {
            Drawer,
            Scroller,
            BaojingDrawer
        },
        mounted(){

        },
        name: "baoJingListNew",
        data(){
            return{
                warnList:[],
                total:0,
                pullupDefaultConfig: {
                    content: "上拉加载更多",
                    pullUpHeight: 10,
                    height: 10,
                    autoRefresh: false,
                    downContent: "释放后加载",
                    upContent: "上拉加载更多",
                    loadingContent: "加载中...",
                    clsPrefix: "xs-plugin-pullup-"
                },
                pulldownDefaultConfig: {
                    content: "下拉刷新",
                    height: 40,
                    autoRefresh: false,
                    downContent: "下拉刷新",
                    upContent: "释放后刷新",
                    loadingContent: "正在刷新...",
                    clsPrefix: "xs-plugin-pulldown-"
                },
                pageNum:1,
                pageSize:10,
                showModeValue: "push",
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
                }
            }
        },
        created(){
            this.getWarnFun();
        },
        methods:{
            openSearchPage() {
                this.$router.push("/sheBeiSearch");
            },
            getWarnFun(){
                warn.warnReportFun({
                    ...this.rightOptions,
                    "pageSize":this.pageSize,
                    "pageNum":this.pageNum
                }).then(respont=>{
                    if (respont.code === 0 && Array.isArray(respont.data.data) && respont.data.data.length > 0 || true) {
                        if (this.pageNum === 1) {
                            this.warnList = respont.data.data;
                            this.total = respont.data.total
                        } else {
                            this.warnList = this.warnList.concat(respont.data.data);
                        }
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset();
                        });
                        if (this.total < this.pageSize * this.pageNum) {
                            this.$refs.scrollerBottom.disablePullup();
                        } else {
                            this.$refs.scrollerBottom.enablePullup();
                        }
                    }

                }).catch()
            },

            async loadMore() {
                console.log("是否调用",this.total,this.pageSize * this.pageNum);
                if (this.total < this.pageSize * this.pageNum) {
                    return false;
                }
                this.$vux.loading.show("加载数据中");
                this.pageNum++;
                await   this.getWarnFun();
                this.$refs.scrollerBottom.donePullup();
                this.$vux.loading.hide();
            },
            async refresh() {
                this.drawerVisibility = false;
                console.log(this.$refs.scrollerBottom,'狗崽子');
                console.log("刷新",this.total,this.pageSize * this.pageNum);
                this.$vux.loading.show("刷新数据中");
                this.pageNum = 1;
                await   this.getWarnFun();
                this.$refs.scrollerBottom.enablePullup();
                this.$refs.scrollerBottom.donePulldown();
                this.$vux.loading.hide();
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
                            color: white;
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
                    background: rgba(26, 204, 131, 0.1);
                    border-radius: 13px;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(26, 204, 131, 1);
                    .online {
                        width: 7px;
                        height: 7px;
                        background: rgba(26, 204, 131, 1);
                        border-radius: 50%;
                        margin-right: 5px;
                    }
                }
                .item1_black {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    height: 26px;
                    background: rgba(128, 128, 128, 0.1);
                    border-radius: 13px;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: #808080;
                    .outline {
                        width: 7px;
                        height: 7px;
                        background: rgba(128, 128, 128, 1);
                        border-radius: 50%;
                        margin-right: 5px;
                    }
                }

                .item2 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background: rgba(43, 127, 243, 0.1);
                    border-radius: 13px;

                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(43, 127, 243, 1);
                }
                .item3 {
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    background: rgba(210, 38, 66, 0.1);
                    border-radius: 13px;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: #d22642;
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
