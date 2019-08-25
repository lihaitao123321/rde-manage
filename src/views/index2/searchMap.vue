
<template>
    <div class="t_page">
        <drawer
                :show.sync="drawerVisibility"
                :show-mode="showModeValue"
                placement="right"
                :drawer-style="{'background-color':'white', width: '330px'}">

            <!-- drawer content -->
           <div slot="drawer">
                <div class="rightWarp">
                    <div class="header">
                        项目
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
                       <el-input v-model='value' style="width:100px"></el-input><span>KW</span>一
                       <el-input v-model='value' style="width:100px"></el-input><span>KW</span>
                    </div>
                </div>
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
                                <input placeholder="请输入搜索内容" />
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <i class="fa fa-filter" @click="showDrawer"></i>
                    </div>
                </div>
                
                <div class="content">
                        <div class="text">
                                为您搜索到的内容
                            </div>
                    <div class="content_item" v-for="item in 2">
                        <div class="item_top">
                            <div class="line">
                                <div class="label">项目名称:</div>
                                <div class="value">DF002 鼓楼医院综合楼</div>
                            </div>
                            <div class="line">
                                <div class="label">项目位置:</div>
                                <div class="value">江苏省南京中山路北路10号</div>
                            </div>
                            <div class="line">
                                <div class="label">项目类型 :</div>
                                <div class="value">医院</div>
                            </div>
                            <div class="line">
                                <div class="label">设计负荷:</div>
                                <div class="value">3600KW</div>
                            </div>
                        </div>
                        <div class="item_bottom">
                            <div class="online">
                                <span class="label">在线率：</span>
                                <span class="color">35%</span>
                            </div>
                            <div class="run">
                                    <span class="label">运行率：</span>
                                    <span>96%</span>
                            </div>
                            <div class="warn">
                                    <span class="label">报警率：</span>
                                    <span>2%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </drawer>
    </div>
</template>

<script>
    import {
        Radio,
        Group,
        Cell,
        Badge,
        Drawer,
        Actionsheet,
        ButtonTab,
        ButtonTabItem,
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Loading,
        TransferDom,
        Datetime
    } from 'vux'
    import {mapState, mapActions} from 'vuex'

    export default {
        directives: {
            TransferDom,
        },
        components: {
            Radio,
            Group,
            Cell,
            Badge,
            Drawer,
            ButtonTab,
            ButtonTabItem,
            ViewBox,
            XHeader,
            Tabbar,
            TabbarItem,
            Loading,
            Actionsheet,
            Datetime
        },
        data() {
            return {
        
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
                tabActive:0,
                value: '',
                rightOptions: {
                    value: ''
                },
                entryUrl: document.location.href,
                showMenu: false,
                drawerVisibility: false,
                showMode: 'push',
                showModeValue: 'push',
                showPlacement: 'left',
                showPlacementValue: 'left'
            }
        },
        methods: {
            openSearchPage(){
                this.$router.push('searchBaoJing');
            },
            tabPage(index) {
                this.tabActive=index;
            },
            showDrawer() {
                this.drawerVisibility = !this.drawerVisibility;
            },
            onShowModeChange(val) {
                /** hide drawer before changing showMode **/
                this.drawerVisibility = false
                setTimeout(one => {
                    this.showModeValue = val
                }, 400)
            },
            onPlacementChange(val) {
                /** hide drawer before changing position **/
                this.drawerVisibility = false
                setTimeout(one => {
                    this.showPlacementValue = val
                }, 400)
            },
            onClickMore() {
                this.showMenu = true
            },
            changeLocale(locale) {
                this.$i18n.set(locale)
                this.$locale.set(locale)
            },
            ...mapActions([
                'updateDemoPosition'
            ])
        },
        mounted() {
            this.handler = () => {
                if (this.path === '/demo') {
                    this.box = document.querySelector('#demo_list_box')
                    this.updateDemoPosition(this.box.scrollTop)
                }
            }
        },
        beforeDestroy() {
            this.box && this.box.removeEventListener('scroll', this.handler, false)
        },
        watch: {},
        computed: {
            ...mapState({
                route: state => state.route,
                deviceready: state => state.app.deviceready,
                demoTop: state => state.vux.demoScrollTop,
            }),
            isShowBar() {
                if (this.entryUrl.indexOf('hide-tab-bar') > -1) {
                    return false
                }
                return true
            },
            isShowNav() {
                if (this.entryUrl.indexOf('hide-nav') > -1) {
                    return false
                }
                return true
            },
            isTabbarDemo() {
                return /tabbar/.test(this.route.path)
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
            span {
                color:#212121FF;
                margin: 0 6px;
            }
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
            .text {
                padding: 15px 3px 0;
                color: #888888FF;
            }   
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
                .item_bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 47px;
                    padding: 0 17px;

                    .label {
                        font-size: 14px;
                        font-family: PingFangSCMedium;
                        font-weight: 500;
                        color: rgba(153, 153, 153, 1);
                    }

                    .online {
                        .color {
                            color: #1ACC83FF;
                            font-weight: 700;
                        }
                    }

                    .run {
                        color: #2B7FF3FF;
                        font-weight: 700;
                    }

                    .warn {
                        color: #D42843FF;
                        font-weight: 700;
                    }
                }
            }
        }
    }


</style>