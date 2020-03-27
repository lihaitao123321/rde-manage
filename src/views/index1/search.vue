<template>
  <div class="t_page">
    <div class="search-page">
      <drawer
        :show.sync="drawerVisibility"
        :show-mode="showModeValue"
        placement="right"
        :drawer-style="{'background-color':'white', width: '330px'}"
      >
        <!-- drawer content -->
        <div slot="drawer" style="height: 100%;">
          <SearchOptions></SearchOptions>
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
                  <input v-model="keywords" placeholder="请输入搜索内容">
                </div>
              </div>
            </div>
            <div class="right">
              <i class="fa fa-filter" @click="showDrawer"></i>
            </div>
          </div>
          <div class="search-box">
            <div class="search-history">
              <div class="title">
                <div class="history-title">{{ ids.length > 0 ?'历史记录':'为您搜索到的内容' }}</div>
                <div class="clear-btn" v-if="ids.length > 0">清空记录</div>
              </div>
            </div>
            <div class="search-list">
              <Scroller
                use-pullup
                :pullup-config="pullupDefaultConfig"
                @on-pullup-loading="loadMore"
                use-pulldown
                :pulldown-config="pulldownDefaultConfig"
                @on-pulldown-loading="refresh"
                lock-x
                ref="scrollerBottom"
                height="-95"
                style="height:100%;"
              >
                <div>
                  <div
                    class="search-con"
                    v-for="item in dataList"
                    :key="item.id"
                    @click="openProject(item)"
                  >
                    <div class="search-info">
                      <div class="info-box">
                        电站名称：
                        <span>{{item.name}}</span>
                      </div>
                      <div class="info-box">
                        电站位置：
                        <span>{{item.address}}</span>
                      </div>
                      <div class="info-box">
                        电站类型：
                        <span>{{item.projectType}}</span>
                      </div>
                      <div class="info-box">
                        装机容量：
                        <span>{{item.designLoad}}</span>
                      </div>
                    </div>
                    <div class="search-bottom">
                      <div class="bottom-info">
                        在线率：
                        <span class="color-blue">{{item.onlineRate*100}}%</span>
                      </div>
                      <div class="bottom-info">
                        运行率：
                        <span class="color-green">{{item.runingRate}}%</span>
                      </div>
                      <div class="bottom-info">
                        报警率：
                        <span class="color-red">{{item.alarmRate*100}}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Scroller>
            </div>
          </div>
        </div>
      </drawer>
    </div>
  </div>
</template>
<script>
import SearchOptions from "@/views/index1/components/searchOptions";
import { Scroller, Drawer } from "vux";
import { mapState, mapActions } from "vuex";
import historyModel from "@/util/projectHistory";
export default {
  components: {
    Scroller,
    Drawer,
    SearchOptions
  },
  data() {
    return {
      tabActive: 0,
      seacrhText: "",
      rightOptions: {
        value: ""
      },
      options: [
        {
          value: "12",
          label: "23"
        }
      ],
      entryUrl: document.location.href,
      showMenu: false,
      menus: {
        "language.noop": '<span class="menu-title">Language</span>',
        "zh-CN": "中文",
        en: "English"
      },
      drawerVisibility: false,
      showMode: "push",
      showModeValue: "push",
      showPlacement: "left",
      showPlacementValue: "left",
      pageList: [],

      dataList: [],
      pageNum: 1,
      pageSize: 10,
      keywords: "",
      ids:[],
      pullupDefaultConfig: {
        content: "上拉加载更多",
        pullUpHeight: 60,
        height: 40,
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
      }
    };
  },
  methods: {
    async loadMore() {
      if (this.dataList.length < this.pageSize * this.pageNum) {
        return false;
      }
      this.$vux.loading.show("加载数据中");
      this.pageNum++;
      await this.initData();
      this.$refs.scrollerBottom.donePullup();
      this.$vux.loading.hide();
    },
    async refresh() {
      this.$vux.loading.show("刷新数据中");
      this.pageNum = 1;
      await this.initData();
      this.$refs.scrollerBottom.enablePullup();
      this.$refs.scrollerBottom.donePulldown();
      this.$vux.loading.hide();
    },
    initData() {
      this.ids = historyModel.getHistoryList();
      if (this.keywords.trim()) {
        this.ids = [];
      }
      return this.Tools.ajax({
        method: "/cloud/api/app/firstpage/getProjectData",
        data: {
          // keywords: this.keywords.trim(),
          areaId: null, //项目地点
          projectType: null, //项目类型
          beginDesignLoad: null, //负载下限
          endDesignLoad: null, //负载上限
          projectIds: this.ids, //项目id
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(data => {
        if (data.code === 0) {
          if (this.pageNum === 1) {
            this.dataList = data.data.data;
          } else {
            this.dataList = this.dataList.concat(data.data.data);
          }
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          if (this.dataList.length < this.pageSize * this.pageNum) {
            this.$refs.scrollerBottom.disablePullup();
            this.$vux.toast.text("没有更多数据了");
          } else {
            this.$refs.scrollerBottom.enablePullup();
          }
        }
      });
    },
    openProject(item) {
      historyModel.editHistory(item.id);
      this.$router.push("/xiangMuDetail/" + item.id);
    },
    showDrawer() {
      this.drawerVisibility = !this.drawerVisibility;
    }
  },
  async mounted() {
    this.$vux.loading.show("加载数据中");
    await this.initData();
    this.$vux.loading.hide();
  }
};
</script>
<style lang="less" scoped>
@import "../../css/index";
</style>

