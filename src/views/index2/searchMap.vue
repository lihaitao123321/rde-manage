
<template>
  <div class="t_page">
    <drawer
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      placement="right"
      :drawer-style="{'background-color':'white', width: '330px'}"
    >
      <!-- drawer content -->
      <div slot="drawer">
        <div class="rightWarp">
          <div class="header">项目</div>
          <div class="list">
            <div class="little_title">项目位置:</div>
            <el-select v-model="value" placeholder="国家" style="width: 90px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="省份" style="width: 90px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="城市" style="width: 90px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="little_title">项目类型：</div>
            <el-select v-model="value" placeholder="项目类型" style="width: 185px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="little_title">设计负荷：</div>
            <el-input v-model="value" style="width:100px"></el-input>
            <span>KW</span>一
            <el-input v-model="value" style="width:100px"></el-input>
            <span>KW</span>
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
                <input placeholder="请输入搜索内容" @change="onSearch">
              </div>
            </div>
          </div>
          <div class="right">
            <i class="fa fa-filter" @click="showDrawer"></i>
          </div>
        </div>
        <div class="text">为您搜索到的内容</div>
        <Scroller
          use-pullup
          :pullup-config="pullupDefaultConfig"
          @on-pullup-loading="loadMore"
          use-pulldown
          :pulldown-config="pulldownDefaultConfig"
          @on-pulldown-loading="refresh"
          lock-x
          ref="scrollerBottom"
          height="-80"
        >
          <div class="content">
            <div class="content_item" v-for="item in dataList" :key="item.id" @click="onClick(item)">
              <div class="item_top">
                <div class="line">
                  <div class="label">项目名称:</div>
                  <div class="value">{{item.name}}</div>
                </div>
                <div class="line">
                  <div class="label">项目位置:</div>
                  <div class="value">{{item.address}}</div>
                </div>
                <div class="line">
                  <div class="label">项目类型 :</div>
                  <div class="value">{{item.projectType}}</div>
                </div>
                <div class="line">
                  <div class="label">设计负荷:</div>
                  <div class="value">{{item.designLoad}}KW</div>
                </div>
              </div>
              <div class="item_bottom">
                <div class="online">
                  <span class="label">在线率：</span>
                  <span class="color">{{item.onlineRate*100}}%</span>
                </div>
                <div class="run">
                  <span class="label">运行率：</span>
                  <span>{{item.runingRate*100}}%</span>
                </div>
                <div class="warn">
                  <span class="label">报警率：</span>
                  <span>{{Math.round(item.alarmRate*100)}}%</span>
                </div>
              </div>
            </div>
          </div>
        </Scroller>
      </div>
    </drawer>
  </div>
</template>

<script>
import {
  Scroller,
  Drawer,
} from "vux";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Scroller,
    Drawer,
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      dataList: [],
      isLoading: false, //防止多次调用接口
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
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      tabActive: 0,
      value: "",
      rightOptions: {
        value: ""
      },
      drawerVisibility: false,
      showMode: "push",
      showModeValue: "push",
      showPlacement: "left",
      showPlacementValue: "left"
    };
  },
  async mounted() {
    this.$vux.loading.show("加载地图中");
    await this.initData();
    this.$vux.loading.hide();
  },
  methods: {
    onSearch() {
      if (this.isLoading) {
        return false;
      }
      this.refresh();
    },
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
      return this.Tools.ajax({
        method: "/cloud/api/app/firstpage/getProjectData",
        data: {
          areaId: null, //项目地点
          projectType: null, //项目类型
          beginDesignLoad: null, //负载下限
          endDesignLoad: null, //负载上限
          projectIds: [], //项目id
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(data => {
        if (data.code === 0) {
          this.isLoading = false;
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
            this.$vux.toast.text('没有更多数据了')
          } else {
            this.$refs.scrollerBottom.enablePullup();
          }
        }
      });
    },
    onClick(item){
      this.$bus.emit('oNSetOneProduct',item);
      this.$router.goBack();
    },
    showDrawer() {
      this.drawerVisibility = !this.drawerVisibility;
    },
  }
};
</script>

<style lang="less" scoped>
/deep/.weui-tabbar__item {
  text-decoration: none;
}
/deep/.weui-tabbar__icon {
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
  .little_title {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    font-family: PingFangSCMedium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    margin-top: 15px;
    margin-bottom: 5px;
  }
  .list {
    color: #e3e3e6;
    span {
      color: #212121ff;
      margin: 0 6px;
    }
  }
}
.main_content {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .header {
    display: flex;
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      i {
        font-size: 22px;
        font-weight: bold;
        color: #333333;
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
        color: #343434;
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
        background: rgba(222, 222, 224, 0.3);
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
            color: #999999;
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
            color: #999999;
          }
        }
      }
    }
  }
  .text {
    position: absolute;
    z-index: 1000;
    left: 0;
    top: 50px;
    height: 40px;
    width: 100%;
    line-height: 40px;
    padding-left: 15px;
    color: #888888ff;
    background-color: #efefef;
  }
  .content {
    padding: 0 15px;
    .content_item {
      height: 176px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      margin-top: 15px;
      .item_top {
        height: 128px;
        padding: 0 17px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .line {
          display: flex;
          padding-top: 8px;
          .label {
            font-size: 14px;
            font-family: PingFangSCMedium;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }
          .value {
            font-size: 14px;
            font-family: PingFangSCMedium;
            color: #212121;
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
            color: #1acc83ff;
            font-weight: 700;
          }
        }

        .run {
          color: #2b7ff3ff;
          font-weight: 700;
        }

        .warn {
          color: #d42843ff;
          font-weight: 700;
        }
      }
    }
  }
}
</style>