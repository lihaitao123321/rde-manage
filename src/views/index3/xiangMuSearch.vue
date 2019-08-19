
<template>
    <div class="t_page">
        <drawer
                :show.sync="drawerVisibility"
                :show-mode="showModeValue"
                placement="right"
                :drawer-style="{'background-color':'white', width: '330px'}">
            <!-- drawer content -->
            <div slot="drawer" style="height: 100%;">
                <xiangMuDrawer></xiangMuDrawer>
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
                                <input placeholder="请输入搜索内容"/>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <i class="fa fa-filter" @click="showDrawer"></i>
                    </div>
                </div>
                <div class="content">
                    <xiangMuList></xiangMuList>
                </div>

            </div>
        </drawer>
    </div>
</template>

<script>

    import {
        Drawer
    } from 'vux'
    import xiangMuDrawer from './xiangMuDrawer';
    import xiangMuList from './xiangMuList';
    export default {
        components: {
            Drawer,
            xiangMuDrawer,
            xiangMuList
        },
        data() {
            return {
                drawerVisibility: false,
                showModeValue: 'push',
            }
        },
        methods: {
            showDrawer() {
                this.drawerVisibility = !this.drawerVisibility;
            }
        },

    }
</script>

<style lang="less" scoped>
    /deep/.weui-tabbar__item{
        text-decoration:none;
    }
    /deep/.weui-tabbar__icon{
        width:17px;
        height:19px;
    }
    .tabbar_image{
        width:17px;
        height:19px;
    }
    .tabbar_label{
        font-size:10px;
        font-family:PingFangSCMedium;
        font-weight:500;
        line-height:12px;

    }
    .rightWarp {
        padding: 0 15px;
        .header {
            height: 46px;
            line-height: 46px;
            font-size: 17px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .little_title{
            height:20px;
            line-height: 20px;
            font-size:12px;
            font-family:PingFangSCMedium;
            font-weight:500;
            color:rgba(153,153,153,1);
            margin-top: 15px;
            margin-bottom: 5px;
        }
        .list{
            color: #E3E3E6;
        }
    }
    .main_content{
        width: 100%;
        height: 170px;
        .header{
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background-color: white;
            .left{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                i{
                    font-size: 22px;
                    font-weight: bold;
                    color: #333333;
                }
            }
            .right{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                i{
                    font-size: 20px;
                    color: #343434;
                }
            }
            .search{
                display: flex;
                align-items: center;
                flex-grow: 1;
                height: 50px;
                .input_warp{
                    display: flex;
                    width: 100%;
                    height:30px;
                    background:rgba(222,222,224,0.3);
                    border-radius:30px;
                    .left_search_icon{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 100%;
                        border-radius:30px;
                        i{
                            font-size: 18px;
                            color: #999999;
                        }
                    }
                    .search_content{
                        flex-grow: 1;
                        input{
                            width: 100%;
                            height: 100%;
                            background: none;
                            border: none;
                            outline: none;
                            color: white;
                        }
                        input::placeholder{
                            font-size: 14px;
                            color:#999999;
                        }
                    }
                }
            }


        }
        .content{
            position: absolute;
            z-index: 1;
            top: 50px;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow-y: auto;
            padding: 0 15px;
            .content_item{
                height:176px;
                background:rgba(255,255,255,1);
                border-radius:10px;
                margin-top: 15px;
                .item_top{
                    height: 128px;
                    padding: 0 17px;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    .line{
                        display: flex;
                        padding-top: 8px;
                        .label{
                            font-size:14px;
                            font-family:PingFangSCMedium;
                            font-weight:500;
                            color:rgba(153,153,153,1);
                        }
                        .value{
                            font-size:14px;
                            font-family:PingFangSCMedium;
                            color:#212121;
                            padding-left: 10px;
                        }
                    }
                }
                .item_bottom{
                    display: flex;
                    align-items: center;
                    height: 47px;
                    padding: 0 17px;
                    .icons{
                        display: flex;
                        flex-grow: 1;
                        .item1{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width:74px;
                            height:26px;
                            background:rgba(248,146,0,0.1);
                            border-radius:13px;
                            margin-right: 16px;
                            color: #F89200;
                            img{
                                width: 14px;
                                height: 12px;
                                margin-right: 6px;
                            }
                        }
                        .item2{
                            width:74px;
                            height:26px;
                            line-height: 26px;
                            text-align: center;
                            background:rgba(210,38,66,0.1);
                            border-radius:13px;
                            color: #D22642;
                            font-size:13px;
                        }
                    }
                    .time{
                        font-size:13px;
                        font-family:PingFangSCMedium;
                        font-weight:500;
                        color:rgba(153,153,153,1);
                    }
                }
            }
        }
    }


</style>