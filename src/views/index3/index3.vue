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
                        <el-select v-model="value" placeholder="起始时间" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        -
                        <el-select v-model="value" placeholder="结束时间" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
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
                        <div class="little_title">所属电站：</div>
                        <el-select v-model="value" placeholder="所属电站" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">通讯状态：</div>
                        <el-select v-model="value" placeholder="通讯状态" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">工作状态：</div>
                        <el-select v-model="value" placeholder="工作状态" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="little_title">报警状态：</div>
                        <el-select v-model="value" placeholder="报警状态" style="width: 135px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>


                    </div>
                </div>
            </div>

            <!-- main content -->
            <div class="t_page">
                
                666
            </div>
<!--            <view-box>-->
<!--                <x-header-->
<!--                        :left-options="{preventGoBack:true}"-->
<!--                        @on-click-back="$router.goBack()"-->
<!--                        @on-click-more="showDrawer"-->
<!--                        :right-options="{showMore: true}">-->
<!--                    <div>这是头部</div>-->
<!--                </x-header>-->
<!--                <div>-->

<!--                </div>-->
<!--            </view-box>-->
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
                value: '',
                rightOptions: {
                    value: ''
                },
                entryUrl: document.location.href,
                showMenu: false,
                menus: {
                    'language.noop': '<span class="menu-title">Language</span>',
                    'zh-CN': '中文',
                    'en': 'English'
                },
                drawerVisibility: false,
                showMode: 'push',
                showModeValue: 'push',
                showPlacement: 'left',
                showPlacementValue: 'left'
            }
        },
        methods: {
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


</style>