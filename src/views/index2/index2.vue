<template>
  <div class="t_page">
    <div class="search-header">
      <div class="back-icon" @click="$router.goBack()">
        <img style="height: 100%;width: 100%" src="../../assets/images/index2/返回图标@2x.png">
      </div>
      <div class="search">
        <div class="input_warp">
          <div class="left_search_icon">
            <i class="el-icon-search"></i>
          </div>
          <div class="search_content">
            <input placeholder="搜索项目" readonly @click="openSearchPage">
          </div>
        </div>
      </div>
    </div>
    <div class="left">
      <div class="blue">{{leftModel.projectCount || 0}}</div>
      <div class="text">项目数</div>
      <div class="blue">{{leftModel.deviceCount || 0}}</div>
      <div class="text">设备数</div>
      <div class="blue" style="color: #1ACC83FF;">{{leftModel.onlineRate*100}}%</div>
      <div class="text">在线率</div>
      <div class="blue">{{leftModel.runingRate*100}}%</div>
      <div class="text">运行率</div>
      <div class="blue" style="color:#D22642FF;">{{leftModel.alarmRate*100}}%</div>
      <div class="text">报警率</div>
    </div>
    <div class="goodsInfo" v-if="showProduct">
      <div class="header">
        <x-icon type="ios-close-empty" size="30" @click="showProduct=false"></x-icon>
        <div class="navigation" @click="openAmap">导航</div>
      </div>
      <div class="content_item" @click="openProjectDetail">
        <div class="item_top">
          <div class="line">
            <div class="label">项目名称:</div>
            <div class="value">{{productModel.name}}</div>
          </div>
          <div class="line">
            <div class="label">项目位置:</div>
            <div class="value">{{productModel.address}}</div>
          </div>
          <div class="line">
            <div class="label">项目类型 :</div>
            <div class="value">{{productModel.projectType}}</div>
          </div>
          <div class="line">
            <div class="label">设计负荷:</div>
            <div class="value">{{productModel.designLoad}}</div>
          </div>
        </div>
        <div class="item_bottom">
          <div class="online">
            <span class="label">在线率：</span>
            <span class="color">{{productModel.onlineRate*100}}%</span>
          </div>
          <div class="run">
            <span class="label">运行率：</span>
            <span>{{productModel.runingRate*100}}%</span>
          </div>
          <div class="warn">
            <span class="label">报警率：</span>
            <span>{{productModel.alarmRate*100}}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content" id="index1_content_map"></div>
    <!-- 自定义定位圆点，采用原生定位-->
    <div class="location_button">
      <img
              style="width: 70%;height: 70%;"
              :src="locationLoading? require('../../assets/images/index2/timg.gif'):require('../../assets/images/index2/location.png')"
              alt=""
              @click.stop="startLocation()"
      />
    </div>
  </div>
</template>
<script>
import startAppModel from "@/plugins/startAppModel";
import locationModel from "@/plugins/locationModel";
export default {
  data() {
    return {
      locationLoading: false,
      map: null,
      center: [116.406315, 39.908775],
      locationMark: [],
      markerList: [],
      checkedList: [],
      showProduct: false,
      leftModel: {
        projectCount: 0,
        deviceCount: 0,
        onlineRate: 0,
        runingRate: 0,
        alarmRate: 0,
        appProjectModels: []
      },
      productModel: {},
      isCollection: false
    };
  },
  async mounted() {
    this.$vux.loading.show("加载地图中");
    await this.initMap();
    await this.startLocation();
    await this.initData();
    this.$vux.loading.hide();
    this.$bus.on("oNSetOneProduct", this.showAMarker);
  },
  methods: {
    openSearchPage() {
      this.$router.push("/searchMap");
    },
    //开始定位
    startLocation() {
      return new Promise(resolve => {
        this.locationLoading = true;
        locationModel.getCurrentLocation(center => {
          this.locationLoading = false;
          if (center) {
            this.center = center;
            this.$store.commit("setLocation", center);
            localStorage.setItem("location", center);
            this.setLocationMark(center);
            resolve(center);
          } else {
            this.setLocationMark(this.$store.state.location);
            resolve(false);
          }
        });
      });
    },
    //设置定位点标记
    setLocationMark(position) {
      if (!position || position.length === 0) {
        return false;
      }
      if (this.locationMark) {
        this.map.remove(this.locationMark);
      }
      let markerContent = `<img style="position:relative;cursor:pointer;" width="23px" height="23px" src="https://webapi.amap.com/theme/v1.3/markers/b/loc.png" alt=""/>`;
      let marker = new AMap.Marker({
        position: position,
        zoom: 10,
        content: markerContent
        // offset: new AMap.Pixel(-13, -30),
        // extData: obj[i]
      });
      this.map.add(marker);
      this.locationMark = marker;
      this.map.setZoomAndCenter(13, position);
    },

    //收藏
    async collectionProduct() {
      await this.Tools.ajax({
        method: "/app/masterdata/site/store/save",
        data: {
          siteId: this.productModel.siteId,
          opType: this.productModel.isStore ? 0 : 1
        }
      }).then(data => {
        if (data.code === 200) {
          this.$toast.success(
            this.productModel.isStore === 0 ? "收藏成功" : "取消收藏成功"
          );
          this.productModel.isStore = this.productModel.isStore === 0 ? 1 : 0;
        } else {
          this.$toast(
            this.productModel.isStore === 0 ? "收藏失败" : "取消收藏失败"
          );
        }
      });
    },
    initData() {
      return this.Tools.ajax({
        method: "/cloud/api/app/map/getMapProject",
        data: {
          longitude: 121.469652,
          latitude: 31.230121,
          radius: 9999999999
        }
      }).then(data => {
        console.log(data);
        if (data.code === 0) {
          this.leftModel = data.data;
          this.addMarker(data.data.appProjectModels);
        }
      });
    },
    async refreshData() {
      this.t_loading.show("加载地图中");
      await this.initData();
      this.t_loading.hide();
    },
    async initMap() {
      this.map = new AMap.Map("index1_content_map", {
        zoom: 14
      });
      this.map.on("click", ev => {
        this.showProduct = false;
      });
      this.map.on("mapmove", ev => {
        this.showProduct = false;
      });
      this.map.on("resize", ev => {
        this.showProduct = false;
      });
      //增加工具条
      let tools = new AMap.ToolBar({
        position: "RB"
      });
      this.map.addControl(tools);
      this.map.addControl(new AMap.Scale());
    },
    async showAMarker(item) {
      let obj = null;
      if (
        this.leftModel.appProjectModels &&
        this.leftModel.appProjectModels.length > 0
      ) {
        for (let i = 0; i < this.leftModel.appProjectModels.length; i++) {
          if (item.id === this.leftModel.appProjectModels[i].id) {
            obj = this.leftModel.appProjectModels[i];
            break;
          }
        }
      }
      console.log("obj", obj);
      await this.Tools.ajax({
        method: "/cloud/api/app/map/getProjectById",
        data: {
          projectId: obj.id
        }
      }).then(data => {
        if (data.code === 0) {
          this.productModel = {
            ...obj,
            ...data.data
          };

          this.map.setZoomAndCenter(13, [
            this.productModel.gdLongitude,
            this.productModel.gdLatitude
          ]);
          this.$nextTick(res => {
            this.showProduct = true;
          });
        }
      });
    },
    addMarker(obj) {
      if (this.markerList && this.markerList.length > 0) {
        for (let i = 0; i < this.markerList.length; i++) {
          this.map.remove(this.markerList[i]);
        }
        this.markerList = [];
      }
      if (obj instanceof Array) {
      } else {
        obj = [obj];
      }
      let hasPop = false;
      for (let i = 0; i < obj.length; i++) {
        let markerContent = "";
        if (obj[i].siteType === 0) {
          markerContent = `<div class="custom-content-marker" style="background-image: url(${require("../../assets/images/index2/blueMarker.png")});background-size: 100% 100%;">
                                <div class="custom-content-marker-yuan-blue"></div>
                            </div>`;
        } else {
          markerContent = `<div class="custom-content-marker">
                                <div class="custom-content-marker-yuan-red"></div>
                            </div>`;
        }

        let marker = new AMap.Marker({
          position: [obj[i].gdLongitude, obj[i].gdLatitude],
          zoom: 10,
          content: markerContent,
          offset: new AMap.Pixel(-13, -30),
          extData: obj[i]
        });
        AMap.event.addListener(marker, "click", res => {
          this.onClickMarker(res);
        });
        this.map.add(marker);
        this.markerList.push(marker);
        if (this.productModel && this.productModel.siteId === obj[i].siteId) {
          hasPop = JSON.parse(JSON.stringify(obj[i]));
        }
      }
      if (hasPop && this.showProduct) {
        this.productModel = hasPop;
      } else {
        this.productModel = {};
        this.showProduct = false;
      }
    },
    async onClickMarker(res) {
      this.productModel = res.target.getExtData();
      await this.Tools.ajax({
        method: "/cloud/api/app/map/getProjectById",
        data: {
          projectId: this.productModel.id
        }
      }).then(data => {
        if (data.code === 0) {
          this.productModel = {
            ...this.productModel,
            ...data.data
          };
        }
      });
      this.showProduct = true;
    },
    openAmap() {
      let location = this.$store.state.location;
      startAppModel.openAmap(
        location[1],
        location[0],
        "我",
        this.productModel.gdLatitude,
        this.productModel.gdLongitude,
        this.productModel.siteName
      );
    },
    //打开项目详情
    openProjectDetail() {
      this.$router.push("/xiangMuDetail/" + this.productModel.id);
    }
  }
};
</script>
<style lang="less" scoped>
.t_page {
  .search-header {
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 0;
    width: 100%;
    height: 50px;

    .back-icon {
      height: 40px;
      width: 40px;
      margin: 10px;
    }

    .search {
      display: flex;
      align-items: center;
      /* flex-grow: 1; */
      height: 50px;
      width: 80%;

      .input_warp {
        display: flex;
        width: 100%;
        height: 38px;
        background: #ffffff;
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
            color: #999999ff;
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
            color: #999999ff;
          }
        }
      }
    }
  }

  .left {
    position: absolute;
    z-index: 1;
    top: 90px;
    left: 10px;
    width: 80px;
    height: 326px;
    background-color: #ffffff;
    border-radius: 5px;
    text-align: center;

    .text {
      color: #888888ff;
      font-size: 12px;
      padding-bottom: 12px;
      margin: 0 14px;
      border-bottom: 1px solid #e8e8ebff;
    }

    .blue {
      color: #2b7ff2ff;
      font-size: 19px;
      font-weight: 700;
      margin-top: 10px;
    }
  }

  .goodsInfo {
    position: absolute;
    z-index: 10000;
    bottom: 0px;
    left: 0px;
    width: 375px;
    height: 224px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: 0px 0px 6px 0px rgba(221, 221, 221, 1);
    padding: 0 15px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      .close {
        width: 13px;
        height: 13px;
        background: rgba(187, 187, 187, 1);
        border-radius: 1px;
      }
      .navigation {
        width: 70px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: rgba(43, 127, 243, 1);
        box-shadow: 0px 1px 11px 0px rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        color: white;
      }
    }
    .content_item {
      height: 176px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      // margin-top: 15px;
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

  #index1_content_map {
    width: 100%;
    height: 100%;
  }
  .location_button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 14px;
    bottom: 130px;
    z-index: 500;
    width: 35px;
    height: 35px;
    background-color: white;
    background-color: rgba(255,255,255,0.9);
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 10px 0 #ccc;
    img{
      width: 35px;
      height: 35px;
    }
  }
}

/*自定义标签*/
/deep/ .custom-content-marker {
  width: 20px;
  height: 20px;

  .custom-content-marker-yuan-blue {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/index2/blueMarker.png");
    background-size: cover;
  }

  .custom-content-marker-yuan-red {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/index2/redMarker.png");
    background-size: cover;
  }

  .custom-content-marker-yuan-black {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/index2/blackMarker.png");
    background-size: cover;
  }
}
</style>
