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
</template>

<script>
    import warn from '../Warn/warn.js'
    import { Scroller } from 'vux'
    export default {
        components: {
            Scroller
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
            }
        },
        created(){
            this.getProListFun();
        },
        methods: {
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