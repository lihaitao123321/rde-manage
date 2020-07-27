<template>
  <div class="t_page">
    <XHeader
      :left-options="{preventGoBack:true, backText: ''}"
      @on-click-back="$router.goBack()"
      :title="this.pageData.deviceBaseInfo.deviceName || '设备详情'"
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
          <x-icon class="right-icon-position" type="ios-arrow-right" size="15"></x-icon>
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
      <div class="all-mon" v-if="pageData.deviceModes.length">
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
      <div class="all-mon" v-if="pageData.deviceParams.length">
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
            <div @click="jumpUrl('/jiankongbaobiao')">
              <span>进入报警</span>
            </div>
          </div>
        </div>
        <div class="pillar-box">
          <div class="chart-layout">
            <echarts :options="baoJingChartOption"/>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>流程图监控</div>
      <div>模型图监控</div>
      <div @click="jumpUrl('/caozuo/' + deviceId)">操作</div>
    </div>
  </div>
</template>

<script>
  import echarts from '../../components/echarts'
import config from "../../config";
import {
  XHeader,
  Group,
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
import _ from "lodash";
import {mapState,mapActions} from "vuex";
  import {getOption as getFirstOption} from '../index1/chartOptions/baojingdongtaiOption'
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
    VPoint,
    echarts
  },
  data() {
    return {
      deviceId: '',
      originData:{},
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
      ],
      baoJingChartOption:{}
    };
  },
  async created() {
    this.deviceId = this.$route.params.deviceId
    await this.initData();
  },
  computed:{
    ...mapState('mqtt', {
      message: state => state.message,
    }),
  },
  watch:{
    message(){
      this.convertMessage(this.message)
    }
  },
  async activated() {
    let deviceId = this.$route.params.deviceId
    if(this.deviceId === deviceId){
      return false
    }else{
      this.deviceId = deviceId
    }
    await this.initData();
  },
  methods: {
    ...mapActions('mqtt',['initMqtt']),
    //初始化数据
    initData() {
      return this.Tools.ajax({
        method: "/cloud/api/app/monitor/device/getDeviceDetail",
        data: {
          deviceId:this.deviceId
        }
      }).then(data => {
        if (data.code === 0 || true) {
          this.originData = JSON.parse(JSON.stringify(data.data))
          if(data.data.deviceModes.length>10){
              data.data.deviceModes = data.data.deviceModes.slice(0,9)
          }
          if(data.data.deviceParams.length>10){
              data.data.deviceParams = data.data.deviceParams.slice(0,9)
          }
          this.pageData = data.data;

          //初始化mqtt
          let username = this.pageData.deviceBaseInfo.thingId;
          let password = this.pageData.deviceBaseInfo.thingKey;
          this.initMqtt({
            username,
            password
          })
          let series = []
          this.pageData.deviceAlarms.forEach(item=>{
            series.push(item.count)
          })
          this.baoJingChartOption = getFirstOption({seriesDataList:series})
        }
      });
    },
    convertMessage: _.debounce(function(message) {
      //模式状态处理
      let pageData = JSON.parse(JSON.stringify(this.pageData));
      pageData.deviceModes.forEach(item => {
        for (const key in message) {
          //找到本地和mqtt对应的数据
          if (message.hasOwnProperty(key) && key === item.abbreviate) {
            let find = item.dicts.find(obj=>obj.key == message[key]);
            item.value = find.value
            item.originValue = find.value;
            //找到mqtt的值对应的枚举数据
          }
        }
      });
      //参数显示处理
      pageData.deviceParams.forEach(item => {
        for (const key in message) {
          //找到本地和mqtt对应的数据
          if (message.hasOwnProperty(key) && key === item.abbreviate) {
            item.value = message[key];
            item.originValue = message[key];
            //找到mqtt的值对应的枚举数据
          }
        }
      });
      this.pageData = pageData;
    }),
    jumpUrl(name) {
      if(name.indexOf('/')!==-1){
        this.$router.push(name)
      }else{
        this.$router.push({
          name,
          params: {
            pageData: this.originData
          }
        });
      }

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
        position: relative;
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
        .right-icon-position{
          position: absolute;
          z-index: 1;
          top: 40px;
          right: 15px;
          color: #D9D9DB;
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
        .chart-layout{
          width: calc(100% - 20px);
          margin: 10px;
          height: 275px;
        }
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
