<template>
  <div class="t-page">
    <div class="redBg">
      <div class="search-page">
        <drawer
            :show.sync="drawerVisibility"
            :show-mode="showModeValue"
            placement="right"
            :drawer-style="{'background-color':'white', width: '330px', position: 'fixed'}">

            <!-- drawer content -->
            <div slot="drawer">
                <div class="rightWarp">
                    <div class="header">
                        报警管理
                    </div>
                    <div>
                        <el-select v-model="rightOptions.value" placeholder="请选择">
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
                  <group>
                    <x-input placeholder="输入搜索内容" v-model="seacrhText"></x-input>
                  </group>
                </x-header>
            </view-box>
        </drawer>
        <div class="search-box">
          <div class="search-history">
            <div class="title">
              <div class="history-title">历史记录</div>
              <div class="clear-btn">清空记录</div>
            </div>
          </div>
          <div class="search-list">
            <div class="search-con">
              <div class="search-info">
                <div class="info-box">电站名称：<span>123</span></div>
                <div class="info-box">电站位置：<span>123</span></div>
                <div class="info-box">电站类型：<span>123</span></div>
                <div class="info-box">装机容量：<span>123</span></div>
              </div>
              <div class="search-bottom">
                <div class="bottom-info">在线率：<span class="color-blue">35%</span></div>
                <div class="bottom-info">报警率：<span class="color-red">35%</span></div>
                <div class="bottom-btn">未服务</div>
              </div>
            </div>
            <div class="search-con">
              <div class="search-info">
                <div class="info-box">电站名称：<span>123</span></div>
                <div class="info-box">电站位置：<span>123</span></div>
                <div class="info-box">电站类型：<span>123</span></div>
                <div class="info-box">装机容量：<span>123</span></div>
              </div>
              <div class="search-bottom">
                <div class="bottom-info">在线率：<span class="color-blue">35%</span></div>
                <div class="bottom-info">报警率：<span class="color-red">35%</span></div>
                <div class="bottom-btn serveing">服务中</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
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
      TransferDom,
      XInput
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
      Actionsheet,
      XInput
  },
  data(){
    return{
      seacrhText:'',
      rightOptions: {
          value: ''
      },
      options:[{
        value: '12',
        label: '23'
      }],
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
  methods:{
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
@import '../../css/index';
</style>

