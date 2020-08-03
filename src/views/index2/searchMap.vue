
<template>
  <div class="t_page">
    <drawer
      :show.sync="drawerVisibility"
      show-mode="push"
      placement="right"
      :drawer-style="{'background-color':'white', width: '330px'}"
    >
      <!-- drawer content -->
      <div slot="drawer" style="height: 100%;">
        <SearchOptions v-model="rightOptions" @search="onSearch"></SearchOptions>
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
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
          >
            <div
              class="content_item"
              v-for="(item,index) in dataList"
              :key="index"
              @click="onClick(item)"
            >
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
          </van-list>
        </van-pull-refresh>
      </div>
    </drawer>
  </div>
</template>

<script>
import { Drawer } from "vux";
import { mapState, mapActions } from "vuex";
import SearchOptions from "@/views/index1/components/searchOptions";
export default {
  components: {
    Drawer,
    SearchOptions
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      pageNum:0,
      pageSize:10,
      total:0,
      dataList: [],
      drawerVisibility: false,
      rightOptions: {
        areaId: "",
        projectType: "",
        beginDesignLoad: "",
        endDesignLoad: ""
      },
    };
  },
  methods: {
    onLoad() {
      console.log(1111)
      this.pageNum ++;
      this.initData();
    },
    onRefresh() {
      console.log(2222)
      this.pageNum = 1
      this.refreshing = true;
      this.initData();
    },
    onSearch(){
      this.drawerVisibility = false
      this.onRefresh()
    },
    initData() {
      return this.Tools.ajax({
        method: "/cloud/api/app/firstpage/getProjectData",
        data: {
          ...this.rightOptions,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (this.refreshing) {
          this.dataList = [];
          this.refreshing = false;
        }
        this.dataList = this.dataList.concat(res.data.data)
        this.loading = false;
        if(this.dataList.length < (this.pageNum-1)*this.pageSize){
          this.finished = true;
        }else{
          this.finished = false;
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
/deep/.weui-tabbar__item {
  text-decoration: none;
}
/deep/.weui-tabbar__icon {
  width: 17px;
  height: 19px;
}
.van-pull-refresh {
  height: 100%;
  overflow-y: auto;
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
  padding: 80px 10px 0 10px;
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
</style>
