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
                <SearchOptions v-model="rightOptions" @search="refresh()"></SearchOptions>
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
                            style="height: 100%"
                            height="-50">
                        <div>
                            <div class="content_item" v-for="(item,index) in projectList" @click="openDetail(item)">
                                <div class="item_top">
                                    <div class="line">
                                        <div class="label">项目名称:</div>
                                        <div class="value">
                                            {{item.projectName}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">项目位置:</div>
                                        <div class="value">
                                            {{item.address}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">项目类型:</div>
                                        <div class="value">
                                            {{item.type}}
                                        </div>
                                    </div>
                                    <div class="line">
                                        <div class="label">设计负荷:</div>
                                        <div class="value">
                                            {{item.designLoad}}
                                        </div>
                                    </div>
                                </div>
                                <div class="item_bottom">
                                    <div class="item">
                                        <div class="title">在线率:</div>
                                        <div class="one">
                                            {{`${Number(item.onlineRate) * 1}`}}%
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="title">运行率:</div>
                                        <div class="two">
                                            {{`${Number(item.runningRate)  * 1}`}}%
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="title">报警率:</div>
                                        <div class="three">
                                            {{`${Number(item.alarmRate) * 1}`}}%
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
    import SearchOptions from "@/views/index1/components/searchOptions";
    export default {
        components: {
            Drawer,
            Scroller,
            SearchOptions
        },
        name: "xiangMuList",
        data() {
            return {
                projectList:[],
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
            this.getProListFun();
        },
        methods: {
            showDrawer() {
                this.drawerVisibility = !this.drawerVisibility;
            },
            openSearchPage() {
                this.$router.push("/xiangMuSearch");
            },
            openDetail(item){
                // this.$store.commit('projectListFun', item);
                this.$router.push('/xiangMuDetail/' + item.id)
            },
            getProListFun(){
                warn.getProList().then(respont=>{
                    if (respont.code === 0 && Array.isArray(respont.data.data) && respont.data.data.length > 0 || true) {
                        if (this.pageNum === 1) {
                            this.projectList = respont.data.data;
                            this.total = respont.data.total
                        } else {
                            this.projectList = this.projectList.concat(respont.data.data);
                        }
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset();
                        });
                        if (this.total < this.pageSize * this.pageNum) {
                            this.$refs.scrollerBottom.disablePullup();
                            this.$vux.toast.text('没有更多数据了')
                        } else {
                            this.$refs.scrollerBottom.enablePullup();
                        }
                    }
                }).catch()
            },
            async loadMore() {
                if (this.total < this.pageSize * this.pageNum) {
                    return false;
                }
                this.$vux.loading.show("加载数据中");
                this.pageNum++;
                await   this.getProListFun();
                this.$refs.scrollerBottom.donePullup();
                this.$vux.loading.hide();
            },
            async refresh() {
                this.drawerVisibility=false;
                this.$vux.loading.show("刷新数据中");
                this.pageNum = 1;
                await   this.getProListFun();
                this.$refs.scrollerBottom.enablePullup();
                this.$refs.scrollerBottom.donePulldown();
                this.$vux.loading.hide();
            },
        },

    }
</script>

<style lang="less" scoped>
    .main_content {
        width: 100%;
        height: 170px;
        background: linear-gradient(
                27deg,
                rgba(39, 61, 220, 1),
                rgba(56, 141, 239, 1)
        );
        /*background:linear-gradient(27deg,rgba(180,23,54,1),rgba(226,47,73,1));*/

        .header {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;

            .left {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;

                i {
                    font-size: 22px;
                    font-weight: bold;
                    color: white;
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
                    color: white;
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
                    background: rgba(255, 255, 255, 0.3);
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
                            color: white;
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
                            color: rgba(255, 255, 255, 0.7);
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
                    margin-left: 10px;
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
