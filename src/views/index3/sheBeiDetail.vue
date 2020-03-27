<template>
  <div class="t_page">
    <XHeader
      :left-options="{preventGoBack:true, backText: ''}"
      @on-click-back="$router.goBack()"
      title="x009循环水泵"
      fixed
    ></XHeader>
    <div class="shebei-content">
      <div class="content_item">
        <div class="item_top" @click="jumpUrl('shebeishuxingDetail')">
          <div class="line">
            <div class="label">设备名称:</div>
            <div class="value">{{this.pageData.deviceBaseInfo.deviceName}}</div>
          </div>
          <div class="line">
            <div class="label">所属系统:</div>
            <div class="value">{{this.pageData.deviceBaseInfo.sysName}}</div>
          </div>
          <div class="line">
            <div class="label">所属项目:</div>
            <div class="value">{{this.pageData.deviceBaseInfo.projectName}}</div>
          </div>
        </div>
        <div class="item_bottom">
          <div class="icons">
            <div class="item1">
              <div class="online"></div>在线
            </div>
            <div class="item2">R 运行</div>
            <div class="item3">F 报警</div>
            <div class="item4" @click="jumpUrl('video')">查看视频</div>
          </div>
        </div>
      </div>
      <div class="all-mon">
        <div class="title">
          <div>模式状态</div>
          <div @click="jumpUrl('moshizhuangtaiDetail')">
            <span>详情</span>
            <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
          </div>
        </div>
        <div class="pillar-box">
          <div class="item-con" v-for="(item,index) in pageData.deviceModes" :key="index">
            <div class="lefts">
              <span class="indexs">{{index+1}}</span>
              <span class="names">{{item.abbreviate}}</span>
              <span class="titles">{{item.abbreviateName}}</span>
            </div>
            <div class="rights">
              <span class="state-name blue">{{item.value}}</span>
              <span class="units">{{item.label}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="all-mon">
        <div class="title">
          <div>参数显示</div>
          <div @click="jumpUrl('canshuDetail')">
            <span>详情</span>
            <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
          </div>
        </div>
        <div class="pillar-box">
          <div class="item-con" v-for="(item,index) in pageData.deviceParams" :key="index">
            <div class="lefts">
              <span class="indexs">{{index+1}}</span>
              <span class="names">{{item.abbreviate}}</span>
              <span class="titles">{{item.abbreviateName}}</span>
            </div>
            <div class="rights">
              <span class="state-name blue">{{item.value}}</span>
              <span class="units">{{item.unitName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="all-mon">
        <div class="title">
          <div>报警</div>
          <div class="rights">
            <div @click="jumpUrl('baojingbianliangDetail')">
              <span>报警变量</span>
            </div>
            <div>
              <span>进入报警</span>
            </div>
          </div>
        </div>
        <div class="pillar-box">
          <v-chart class="chart-box" :width="340" ref="demo3" style="height: auto;" :data="data3">
            <v-scale x field="title"/>
            <v-scale y field="nub"/>
            <v-bar
              series-field="name"
              :adjust="{
                        type: 'dodge',
                        marginRatio: 0.05 // 设置分组间柱子的间距
                    }"
            />
            <v-tooltip show-value-in-legend/>
          </v-chart>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>流程图监控</div>
      <div>模型图监控</div>
      <div @click="jumpUrl('/caozuo')">操作</div>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Actionsheet,
  TransferDom,
  ButtonTab,
  ButtonTabItem,
  Tabbar,
  TabbarItem,
  Group,
  Cell,
  XInput,
  XButton,
  VChart,
  VLine,
  VArea,
  VTooltip,
  VLegend,
  VPie,
  VGuide,
  VBar,
  VScale,
  VPoint
} from "vux";
import mqtt from "mqtt";
import _ from "lodash";
export default {
  name: "sheBeiDetail",
  components: {
    XHeader,
    Group,
    XInput,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    VGuide,
    VPie,
    VScale,
    VPoint
  },
  data() {
    return {
      client: null,
      pageData: {
        deviceBaseInfo: {},
        deviceModes: [],
        deviceParams: []
      },
      data3: [
        { name: "电站设备", title: "警告", nub: 18.9 },
        { name: "电站设备", title: "报警", nub: 28.8 },
        { name: "电站设备", title: "故障", nub: 39.3 }
        // { name: "电站设备", title: "离线", nub: 81.4 }
      ]
    };
  },
  async mounted() {
    await this.initData();
    await this.initMqtt();
  },
  beforeRouteLeave(to, from, next) {
    if(this.client){
      this.client.end();
    }
    next();
  },
  methods: {
    //初始化数据
    initData() {
      return this.Tools.ajax({
        method: "/cloud/api/app/monitor/device/getDeviceDetail",
        data: {
          deviceId: this.$route.params.deviceId
        }
      }).then(data => {
        if (data.code === 0 || true) {
          let chartDataList = data.data.deviceAlarms;
          let data3 = JSON.parse(JSON.stringify(this.data3));
          for (let index = 0; index < data3.length; index++) {
            data3[index].nub = chartDataList[index].count;
          }
          this.data3 = data3;
          if(data.data.deviceModes.length>10){
              data.data.deviceModes = data.data.deviceModes.slice(0,9)
          }
          if(data.data.deviceParams.length>10){
              data.data.deviceParams = data.data.deviceParams.slice(0,9)
          }
          this.pageData = data.data;
        }
      });
    },
    //链接并监听mqtt
    initMqtt() {
      let username = this.pageData.deviceBaseInfo.thingId;
      let password = this.pageData.deviceBaseInfo.thingKey;
      this.client = mqtt.connect(
        this.$store.state.mqttUrl,
        {
          username: username,
          password: password,
          keepalive: 60,
          connectTimeout: 30 * 1000,
          clientId:
            "mqttjs_cr_" +
            Math.random()
              .toString(16)
              .substr(2, 8)
        }
      );
      this.client.on("connect", () => {
        this.client.subscribe("iot/realData/" + username, {
          qos: 1
        });
      });
      this.client.on("message", (topic, message, packet) => {
        message = JSON.parse(message);
        console.log('message', message)
        if (message.state == 0) {
          this.convertMessage(message);
        }
      });
    },
    convertMessage: _.debounce(function(message) {
      let mt = message.mt;
      //模式状态处理
      let deviceModes = JSON.parse(JSON.stringify(this.pageData.deviceModes));
      deviceModes.forEach(item => {
        for (const key in mt) {
          //找到本地和mqtt对应的数据
          if (mt.hasOwnProperty(key) && key === item.abbreviate) {
            item.value = mt[key];
            //找到mqtt的值对应的枚举数据
          }
        }
      });
      this.pageData.deviceModes = deviceModes;
      //参数显示处理
      let deviceParams = JSON.parse(JSON.stringify(this.pageData.deviceParams));
      deviceParams.forEach(item => {
        for (const key in mt) {
          //找到本地和mqtt对应的数据
          if (mt.hasOwnProperty(key) && key === item.abbreviate) {
            item.value = mt[key];
            //找到mqtt的值对应的枚举数据
          }
        }
      });
      this.pageData.deviceParams = deviceParams;
    }),
    getStatusName(status) {
      return "状态名称";
    },
    jumpUrl(name) {
      this.$router.push({
        name,
        params: {
          pageData: this.pageData
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.t_page {
  .shebei-content {
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 15px;
    padding-bottom: 70px;
    overflow-y: auto;
    .content_item {
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
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
          .item4 {
            width: 74px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            font-size: 13px;
            background: #2b7ff3;
            border-radius: 13px;
            font-family: PingFang-SC-Bold;
            color: #ffffff;
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
    .all-mon {
      width: 345px;
      margin: 15px auto;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 18px;
        div {
          &:nth-child(1) {
            font-size: 21px;
            font-weight: bold;
          }
          &:nth-child(2) {
            padding: 6px 13px;
            border-radius: 13px;
            background: #ffffff;
            font-size: 13px;
            color: #2b7ff3;
            display: flex;
            align-items: center;
            padding-right: 8px;
            .back-icon {
              fill: #2b7ff3;
            }
          }
          &.rights {
            padding: 0;
            border-radius: 0;
            background: none;

            div {
              padding: 6px 16px;
              border-radius: 13px;
              background: #ffffff;
              font-size: 13px;
              color: #2b7ff3;
              display: flex;
              align-items: center;
              &:nth-child(2) {
                background: #2b7ff3;
                color: #ffffff;
                margin-left: 22px;
              }
            }
          }
        }
      }
      .chart-box {
        height: 140px;
        margin: 0 auto;
        border-radius: 5px;
        background: #ffffff;
        box-sizing: border-box;
        &.mb13 {
          margin-bottom: 13px;
        }
      }
      .pillar-box {
        margin: 0 auto;
        overflow: hidden;
        border-radius: 5px;
        background: #ffffff;
        box-sizing: border-box;
        font-size: 15px;
        color: #666666;
        .item-con {
          border-bottom: 1px solid #d6d6d6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 55px;
          padding-left: 19px;
          padding-right: 28px;
          &:last-child {
            border-bottom: none;
          }
          .lefts {
            span {
              margin-right: 15px;
            }
          }
          .rights {
            display: flex;
            align-items: center;
            color: #333333;
            .blue {
              color: #2b7ff3;
              font-size: 16px;
            }
            .icon-image {
              margin-left: 5px;
              width: 18px;
              height: 15px;
            }
            .units {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    div {
      width: 107px;
      height: 38px;
      border: 1px solid #2b7ff3;
      line-height: 38px;
      color: #2b7ff3;
      text-align: center;
      border-radius: 19px;
      &:nth-child(1) {
        background: #2b7ff3;
        color: #ffffff;
      }
      &:nth-child(3) {
        background: #1acc83;
        border: 1px solid #1acc83;
        color: #ffffff;
      }
    }
  }
}
</style>