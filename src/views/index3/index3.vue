<template>
    <div style="height:100%;">
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
                    <div>
                        <el-select v-model="value" placeholder="请选择">
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
            <view-box>
                <x-header
                        :left-options="{preventGoBack:true}"
                        @on-click-back="$router.goBack()"
                        @on-click-more="showDrawer"
                        :right-options="{showMore: true}">
                    <div>这是头部</div>
                </x-header>
            </view-box>
        </drawer>
    </div>
</template>

<script>
    import { Select } from 'element-ui'
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
        TransferDom
    } from 'vux'
    import {mapState, mapActions} from 'vuex'

    export default {
        directives: {
            TransferDom,
            "x-select":Select
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
            Actionsheet
        },
        data() {
            return {
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


    }
</style>