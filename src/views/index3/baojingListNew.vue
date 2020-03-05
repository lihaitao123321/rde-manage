<template>
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
</template>

<script>
    import warn from '../Warn/warn.js'
    import { Scroller } from 'vux'
    export default {
        components: {
            Scroller
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
            }
        },
        created(){
            this.getWarnFun();
        },
        methods:{
            getWarnFun(){
                this.warnList = [];
                warn.warnReportFun(this.pageNum,this.pageSize).then(respont=>{

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
                            this.$vux.toast.text('没有更多数据了')
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
            }
        }
    }
</script>

<style lang="less" scoped>
    .content{
        background-color: red;
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