<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div class="system-box" v-for="(item,index) in list" :key="index">
              <div class="system-con" >
                <p>{{item.content}}</p>
<!--                <div class="award">一等奖：<span>江小鱼</span></div>-->
<!--                <div class="award">二等奖：<span>江小鱼</span></div>-->
<!--                <div class="award">三等奖：<span>江小鱼</span></div>-->
              </div>
              <div class="system-footer">
                <div class="btn">查看详情</div>
                <div class="time">{{item.time}}</div>
              </div>
            </div>
        </van-list>
    </van-pull-refresh>
</template>

<script>
    import { List, PullRefresh, Cell } from 'vant';
    export default {
        components:{
            [List.name]:List,
            [PullRefresh.name]:PullRefresh,
            [Cell.name]:Cell,
        },
        data() {
            return {
                pageNum: 1,
                pageSize: 20,
                total:0,
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
            };
        },
        mounted() {
        },
        methods: {
            initData(){
                this.Tools.ajax({
                    method: "/cloud/api/app/my/getSysMsg",
                    data: {
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    if (this.refreshing) {
                        this.list = [];
                        this.refreshing = false;
                    }
                    this.list = this.list.concat(res.data.content)
                    this.total = res.data.totalElements
                    this.loading = false;
                    if(this.list.length < (this.pageNum-1)*this.pageSize){
                        this.finished = true;
                    }

                })
            },
            onLoad() {
                this.pageNum ++;
                this.initData();
            },
            onRefresh() {
                this.pageNum = 1
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.initData();
            },
        },
    };
</script>

<style scoped lang="less">
    .van-pull-refresh {
        height: 100%;
        overflow-y: auto;
    }
    .van-list{
        padding: 15px 15px 0 15px;
    }
        .system-box{
            padding: 12px 0;
            margin-bottom: 15px;
            background: #ffffff;
            border-radius: 5px;

            .system-con{
                padding: 0 17px;
                padding-bottom: 10px;
                border-bottom: 1px solid #E6E6E6;
                p{
                    color: #212121;
                    font-size: 16px;
                    margin: 0;
                    padding: 0;
                }
                .award{
                    margin-top: 10px;
                    font-size: 14px;
                    color: #888888;
                    span{
                        color: #212121;
                    }
                }
            }

            .system-footer{
                padding: 0 17px;
                padding-top: 11px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .btn{
                    width: 74px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    border-radius: 13px;
                    color: #ffffff;
                    font-size: 13px;
                    background: #2B7FF3;
                }
                .time{
                    font-size: 13px;
                    color: #BBBBBB;
                }
            }
        }
</style>
