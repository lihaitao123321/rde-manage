<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div class="notice-box" v-for="(item,index) in list" :key="index">
              <div class="notice-con">
                {{item.eventMsg}}
              </div>
              <div class="notice-time">{{item.time}}</div>
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
                    method: "/cloud/api/app/my/getPushMsg",
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
    .notice-box{
        padding: 15px 14px;
        margin-bottom: 15px;
        background: #ffffff;
        border-radius: 5px;
        .notice-con{
            color: #333333;
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .notice-time{
            color: #BBBBBB;
            font-size: 13px;
            margin-top: 10px;
        }
    }
</style>
