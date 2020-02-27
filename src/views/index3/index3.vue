<template>
    <div class="t_page">
        <drawer
                :show.sync="drawerVisibility"
                :show-mode="showModeValue"
                placement="right"
                :drawer-style="{'background-color':'white', width: '330px'}">

            <!-- drawer content -->
            <div slot="drawer" style="height: 100%;">
                <component
                        :is="getDrawer"
                ></component>
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
                    <component
                            :is="getList"
                    ></component>
                </div>
                <tabbar @on-index-change="tabPage">
                    <tabbar-item v-for="(item,index) in this.menus" :selected="index===0">
                        <img class="tabbar_image" slot="icon" :src="tabActive===index?item.activeIcon:item.icon"/>
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
    import baoJingDrawer from './baoJingDrawer';
    import caoZuoDrawer from './caoZuoDrawer';
    import sheBeiDrawer from './sheBeiDrawer';
    import xiTongDrawer from './xiTongDrawer';
    import xiangMuDrawer from './xiangMuDrawer';

    import baoJingList from './baoJingList';
    import baoJingListNew from './baojingListNew'
    import caoZuoList from './caoZuoList';
    import sheBeiList from './sheBeiList';
    import xiTongList from './xiTongList';
    import xiangMuList from './xiangMuList';


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
            Datetime,
            baoJingDrawer,
            caoZuoDrawer,
            sheBeiDrawer,
            xiTongDrawer,
            xiangMuDrawer,
            baoJingListNew,
            caoZuoList,
            sheBeiList,
            xiTongList,
            xiangMuList



        },
        data() {
            return {
                menus: [
                    {
                        title: '报警管理',
                        value: 'index1',
                        icon: require('../../assets/images/index3/bj_black@2x.png'),
                        activeIcon: require('../../assets/images/index3/bj_red@2x.png')
                    }, {
                        title: '操作记录',
                        value: 'index2',
                        icon: require('../../assets/images/index3/czjl_black@2x.png'),
                        activeIcon: require('../../assets/images/index3/czjl_red@2x.png')
                    }, {
                        title: '设备',
                        value: 'index3',
                        icon: require('../../assets/images/index3/dzsb_black@2x.png'),
                        activeIcon: require('../../assets/images/index3/dzsb_red@2x.png')
                    }, {
                        title: '系统',
                        value: 'index4',
                        icon: require('../../assets/images/index3/ywsb_black@2x.png'),
                        activeIcon: require('../../assets/images/index3/ywsb_red@2x.png')
                    }, {
                        title: '项目',
                        value: 'index5',
                        icon: require('../../assets/images/index3/dz_black@2x.png'),
                        activeIcon: require('../../assets/images/index3/dz_red@2x.png')
                    }
                ],


                tabActive: 0,
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
            openSearchPage() {
                if(this.tabActive===0){
                    this.$router.push('baoJingSearch');
                }else if(this.tabActive===1){
                    this.$router.push('caoZuoSearch');
                }else if(this.tabActive===2){
                    this.$router.push('sheBeiSearch');
                }else if(this.tabActive===3){
                    this.$router.push('xiTongSearch');
                }else if(this.tabActive===4){
                    this.$router.push('xiangMuSearch');
                }
            },
            tabPage(index) {
                this.tabActive = index;
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
            },
            getDrawer() {
                let name = '';
                if (this.tabActive === 0) {
                    name = 'baoJingDrawer';
                } else if (this.tabActive === 1) {
                    name = 'caoZuoDrawer';
                } else if (this.tabActive === 2) {
                    name = 'sheBeiDrawer';
                } else if (this.tabActive === 3) {
                    name = 'xiTongDrawer';
                } else if (this.tabActive === 4) {
                    name = 'xiangMuDrawer';
                }
                return name;
            },
            getList(){
                let name = '';
                if (this.tabActive === 0) {
                    name = 'baoJingListNew';
                } else if (this.tabActive === 1) {
                    name = 'caoZuoList';
                } else if (this.tabActive === 2) {
                    name = 'sheBeiList';
                } else if (this.tabActive === 3) {
                    name = 'xiTongList';
                } else if (this.tabActive === 4) {
                    name = 'xiangMuList';
                }
                return name;
            }
        },

    }
</script>

<style lang="less" scoped>
    /deep/ .weui-tabbar__item {
        text-decoration: none;
    }

    /deep/ .weui-tabbar__icon {
        width: 17px;
        height: 19px;
    }

    .tabbar_image {
        width: 17px;
        height: 19px;
    }

    .tabbar_label {
        font-size: 10px;
        font-family: PingFangSCMedium;
        font-weight: 500;
        line-height: 12px;

    }

    .main_content {
        width: 100%;
        height: 170px;
        background: linear-gradient(27deg, rgba(39, 61, 220, 1), rgba(56, 141, 239, 1));
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
            bottom: 45px;
            left: 0;
            width: 100%;
            overflow-y: auto;
            padding: 0 15px;


        }
    }


</style>