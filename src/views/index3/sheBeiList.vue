<template>
  <div class="t_page">
    <drawer
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      placement="right"
      :drawer-style="{'background-color':'white', width: '330px'}"
    >
      <!-- drawer content -->
      <div slot="drawer" style="height: 100%;">
        <SheBeiDrawer v-model="rightOptions" @search="drawerVisibility=false;refresh()"></SheBeiDrawer>
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
                <input placeholder="请输入搜索内容" readonly @click="openSearchPage">
              </div>
            </div>
          </div>
          <div class="right">
            <i class="fa fa-filter" @click="showDrawer"></i>
          </div>
        </div>
        <div class="content">
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
                class="content_item"
                v-for="(item, index) in this.dataList"
                :key="index"
                @click="toDetail(item)"
              >
                <div class="item_top">
                  <div class="line">
                    <div class="label">设备名称:</div>
                    <div class="value">{{item.deviceName}}</div>
                  </div>
                  <div class="line">
                    <div class="label">设备型号:</div>
                    <div class="value">{{item.modelName}}</div>
                  </div>
                  <div class="line">
                    <div class="label">设备类别:</div>
                    <div class="value">{{item.devTypeName}}</div>
                  </div>
                  <div class="line">
                    <div class="label">所属系统:</div>
                    <div class="value">{{item.sysName}}</div>
                  </div>
                  <div class="line">
                    <div class="label">所属项目:</div>
                    <div class="value">{{item.projectName}}</div>
                  </div>
                </div>
                <div class="item_bottom">
                  <div class="icons">
                    <div class="item1" v-if="item.onLine == 0">
                      <div class="online"></div>在线
                    </div>
                    <div class="item1_black" v-if="item.onLine == 1">
                      <div class="outline"></div>离线
                    </div>
                    <div class="item2" v-if="item.status == 1">R 运行</div>
                    <div class="item1_black" v-if="item.status == 2">S 停止</div>
                    <div class="item1_black" v-if="item.status == 3">S 离线</div>
                    <div class="item1_black" v-if="item.status == 4">S 离线</div>
                    <div class="item3">F 报警</div>
                  </div>
                </div>
              </div>
            </div>
          </Scroller>
        </div>
      </div>
    </drawer>
  </div>
</template>
<script>
import { Scroller, Drawer } from "vux";
import { mapState } from "vuex";
import SheBeiDrawer from "./components/SheBeiDrawer";
export default {
  components: {
    Scroller,
    Drawer,
    SheBeiDrawer
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      dataList: [],
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
      showModeValue: "push",
      drawerVisibility: false,
      rightOptions: {
        deviceTypeId: '',
        deviceModelId: '',
        deviceSystemId: '',
        deviceProjectId:'',
        deviceCommStatusId:[],
        deviceWorkStatusId:[],
        deviceAlarmStatusId:[],
      }
    };
  },
  async mounted() {
    this.$vux.loading.show("加载数据中");
    await this.initData();
    this.$vux.loading.hide();
  },
  methods: {
    openSearchPage() {
      this.$router.push("/sheBeiSearch");
    },
    toDetail(item) {
      this.$router.push("/shebeiDetail/" + item.id);
    },
    onSearch() {
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
        method: "/cloud/api/app/monitor/device/getDevicesPage",
        data: {
          deviceType:this.rightOptions.deviceTypeId,
          modelId:this.rightOptions.deviceModelId,
          projectId:this.rightOptions.deviceProjectId,
          communicationStatus:this.rightOptions.deviceCommStatusId.join(','),
          workStatus:this.rightOptions.deviceWorkStatusId.join(','),
          alarmStatus:this.rightOptions.deviceAlarmStatusId.join(','),
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(data => {
        if (data.code === 0 || true) {
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
            // this.$vux.toast.text("没有更多数据了");
          } else {
            this.$refs.scrollerBottom.enablePullup();
          }
        }
      });
    },
    onClick(item) {
      this.$bus.emit("oNSetOneProduct", item);
      this.$router.goBack();
    },
    showDrawer() {
      this.drawerVisibility = !this.drawerVisibility;
    }
  }
};
</script>

<style lang="less" scoped>
.main_content {
  width: 100%;
  height: 170px;
  background: linear-gradient(
    27deg,
    rgba(39, 61, 220, 1),
    rgba(56, 141, 239, 1)
  );
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
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    padding: 0 15px;
  }
}
.content_item {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-top: 15px;
  .item_top {
    padding: 0 17px 8px 17px;
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
    height: 47px;
    padding: 0 17px;

    .icons {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;

      .item1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 74px;
        height: 26px;
        background: rgba(26, 204, 131, 0.1);
        border-radius: 13px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(26, 204, 131, 1);
        .online {
          width: 7px;
          height: 7px;
          background: rgba(26, 204, 131, 1);
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      .item1_black {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 74px;
        height: 26px;
        background: rgba(128, 128, 128, 0.1);
        border-radius: 13px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #808080;
        .outline {
          width: 7px;
          height: 7px;
          background: rgba(128, 128, 128, 1);
          border-radius: 50%;
          margin-right: 5px;
        }
      }

      .item2 {
        width: 74px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font-size: 13px;
        background: rgba(43, 127, 243, 0.1);
        border-radius: 13px;

        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(43, 127, 243, 1);
      }
      .item3 {
        width: 74px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font-size: 13px;
        background: rgba(210, 38, 66, 0.1);
        border-radius: 13px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #d22642;
      }
    }

    .time {
      font-size: 13px;
      font-family: PingFangSCMedium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>
