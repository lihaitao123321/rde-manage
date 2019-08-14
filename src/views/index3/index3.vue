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
                        报警管理
                    </div>
                    <div class="list">
                        <div class="little_title">报警时间:</div>
                        <el-date-picker
                                style="width: 135px;"
                                v-model="value"
                                type="date"
                                placeholder="起始时间">
                        </el-date-picker>-
                        <el-date-picker
                                style="width: 135px;"
                                v-model="value"
                                type="date"
                                placeholder="起始时间">
                        </el-date-picker>
                        <div class="little_title">设备类别：</div>
                        <el-select v-model="value" placeholder="设备类别" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">设备型号：</div>
                        <el-select v-model="value" placeholder="设备型号" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">设备编号：</div>
                        <el-select v-model="value" placeholder="所属电站" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">所属系统：</div>
                        <el-select v-model="value" placeholder="通讯状态" style="width: 100%;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">所属项目：</div>
                        <el-select v-model="value" placeholder="通讯状态" style="width: 100%;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">通讯状态：</div>
                        <div>
                            <CheckButtonList :data="checkedButtonDics1" v-model="checkedList1"></CheckButtonList>
                        </div>
                        <div class="little_title">工作状态：</div>
                        <div>
                            <CheckButtonList :data="checkedButtonDics2" v-model="checkedList2"></CheckButtonList>
                        </div>
                        <div class="little_title">报警状态：</div>
                        <div>
                            <CheckButtonList :data="checkedButtonDics3" v-model="checkedList3"></CheckButtonList>
                        </div>


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
                                <input placeholder="请输入搜索内容" readonly @click="openSearchPage"/>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <i class="fa fa-filter" @click="showDrawer"></i>
                    </div>
                </div>
                <div class="content">
                    <div class="content_item" v-for="item in 10">
                        <div class="item_top">
                            <div class="line">
                                <div class="label">报警描述:</div>
                                <div class="value">越上限报警</div>
                            </div>
                            <div class="line">
                                <div class="label">报警变量:</div>
                                <div class="value">X001 CPU工作温度</div>
                            </div>
                            <div class="line">
                                <div class="label">报警对象 :</div>
                                <div class="value">B001逆变器</div>
                            </div>
                            <div class="line">
                                <div class="label">所属电站:</div>
                                <div class="value">瑞德恩屋顶电站</div>
                            </div>
                        </div>
                        <div class="item_bottom">
                            <div class="icons">
                                <div class="item1">
                                    <img src="../../assets/images/index3/warning@2x.png">故障
                                </div>
                                <div class="item2">
                                    报警中
                                </div>
                            </div>
                            <div class="time">
                                2019-08-12 15:00
                            </div>
                        </div>
                    </div>
                </div>
                <tabbar @on-index-change="tabPage">
                    <tabbar-item  v-for="(item,index) in this.menus" :selected="index===0">
                        <img class="tabbar_image" slot="icon" :src="tabActive===index?item.activeIcon:item.icon" />
                        <span class="tabbar_label" slot="label">{{item.title}}</span>
                    </tabbar-item>
                </tabbar>
            </div>
        </drawer>
    </div>
</template>

<script>
    import {
        XButton,
        Calendar,
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
            XButton,
            Calendar,
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
                menus: [
                    {
                        title: '报警管理',
                        value: 'index1',
                        icon:require('../../assets/images/index3/bj_black@2x.png'),
                        activeIcon:require('../../assets/images/index3/bj_red@2x.png')
                    }, {
                        title: '操作记录',
                        value: 'index2',
                        icon:require('../../assets/images/index3/czjl_black@2x.png'),
                        activeIcon:require('../../assets/images/index3/czjl_red@2x.png')
                    }, {
                        title: '电站设备',
                        value: 'index3',
                        icon:require('../../assets/images/index3/dzsb_black@2x.png'),
                        activeIcon:require('../../assets/images/index3/dzsb_red@2x.png')
                    }, {
                        title: '运维设备',
                        value: 'index4',
                        icon:require('../../assets/images/index3/ywsb_black@2x.png'),
                        activeIcon:require('../../assets/images/index3/ywsb_red@2x.png')
                    }, {
                        title: '电站',
                        value: 'index5',
                        icon:require('../../assets/images/index3/dz_black@2x.png'),
                        activeIcon:require('../../assets/images/index3/dz_red@2x.png')
                    }
                ],
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
        }
    }
    .main_content{
        width: 100%;
        height: 170px;
        background:linear-gradient(27deg,rgba(39,61,220,1),rgba(56,141,239,1));
        /*background:linear-gradient(27deg,rgba(180,23,54,1),rgba(226,47,73,1));*/
        .header{
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            .left{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                i{
                    font-size: 22px;
                    font-weight: bold;
                    color: white;
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
                    color: white;
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
                    background:rgba(255,255,255,0.3);
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
                            color: white;
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
                            color:rgba(255,255,255,0.7);
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
            bottom: 45px;
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