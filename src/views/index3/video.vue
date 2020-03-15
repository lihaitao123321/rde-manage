<style lang="less" scoped>
.t_page {
  .content {
    padding: 0 15px;
    .item {
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      margin-top:15px;
      .top {
        border-radius: 5px 5px 0px 0px;
        video {
          width: 100%;
        }
      }
      .bottom {
        height: 43px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        .title {
          font-size: 14px;
          font-family: DIN;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .videoType {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .dotOut {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            background: rgba(43, 127, 243, 0.5);
            border-radius: 50%;
            .dotIn {
              width: 6px;
              height: 6px;
              background: rgba(43, 127, 243, 1);
              border-radius: 50%;
            }
          }
          .dotDesc {
            font-size: 14px;
            font-family: DIN;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-left: 2px;
          }
        }
        .icon {
          width: 17px;
          height: 17px;
        }
      }
    }
  }
}
</style>
<template>
    <div class="t_page">
        <XHeader
            :left-options="{preventGoBack:true, backText: ''}"
            @on-click-back="$router.goBack()"
            title="查看视频"
            fixed
        ></XHeader>
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
            <div class="content">
                <div class="item" v-for="(item,index) in dataList" :key="index">
                    <div class="top">
                        <video :ref="'video'+index" :src="item.testUrl" controls="controls"></video>
                    </div>
                    <div class="bottom">
                        <div class="title">NO.编号+摄像头名称</div>
                        <div class="videoType">
                            <div class="dotOut">
                                <div class="dotIn"></div>
                            </div>
                            <div class="dotDesc">REV</div>
                        </div>
                        <img
                            class="icon"
                            @click="allScreen(index)"
                            src="../../assets/images/index3/allScreen.png"
                        >
                    </div>
                </div>
            </div>
        </Scroller>
    </div>
</template>
<script>
import { Scroller, XHeader, Icon } from "vux";
import { mapState } from "vuex";

export default {
  components: {
    Scroller,
    XHeader,
    Icon
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      dataList: [
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
        {
          testUrl: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
        },
      ],
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
  async mounted() {
    // this.$vux.loading.show("加载数据中");
    // await this.initData();
    // this.$vux.loading.hide();
  },
  methods: {
    allScreen(index) {
      let ele = this.$refs["video" + index][0];
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen();
      }else{
          console.log(ele)
      }
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
            this.$vux.toast.text("没有更多数据了");
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

