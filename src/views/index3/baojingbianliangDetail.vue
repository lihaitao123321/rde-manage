<template>
    <div class="t_page">
        <XHeader
            :left-options="{preventGoBack:true, backText: ''}"
            @on-click-back="$router.goBack()"
            title="报警变量详情"
        ></XHeader>
        <div class="detail-content">
            <div class="pillar-box">
                <div class="item-con" v-for="(item,index) in dataList" :key="index">
                    <div class="lefts">
                        <span class="indexs">{{index+1}}</span>
                        <span class="names">AA1</span>
                        <span class="titles">{{item.alarmVariableName}}</span>
                    </div>
                    <div class="rights">
                        <span class="state-name color-one">{{item.stateName}}</span>
                    </div>
                </div>


                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">2</span>
                        <span class="names">AA1</span>
                        <span class="titles">压缩机高温报警</span>
                    </div>
                    <div class="rights">
                        <span class="state-name color-two">故障</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">3</span>
                        <span class="names">AA1</span>
                        <span class="titles">电磁阀报警</span>
                    </div>
                    <div class="rights">
                        <span class="state-name color-three">报警</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">4</span>
                        <span class="names">AA1</span>
                        <span class="titles">回水温度报警</span>
                    </div>
                    <div class="rights">
                        <span class="state-name color-four">警告</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">5</span>
                        <span class="names">AA1</span>
                        <span class="titles">冷凝器低压压力报警</span>
                    </div>
                    <div class="rights">
                        <span class="state-name color-one">正常</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">6</span>
                        <span class="names">AA1</span>
                        <span class="titles">冷凝器高压压力报警</span>
                    </div>
                    <div class="rights">
                        <span class="state-name color-one">故障</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Toast } from "vux";
export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    Toast
  },
  data() {
    return {
        pageData: {
        deviceBaseInfo: {},
        deviceModes: [],
        deviceParams: []
      },
      dataList:[]
    };
  },
  created() {
    this.pageData = this.$route.params.pageData;
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      return this.Tools.ajax({
        method: "/cloud/api/app/monitor/device/getAlarmVariableDetailPage",
        data: {
          deviceId: this.$route.params.pageData.deviceBaseInfo.id
        }
      }).then(data => {
        if (data.code === 0) {
          this.dataList = data.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.detail-content {
  padding: 15px;
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
        .color-one {
          color: #1acc83;
        }
        .color-two {
          color: #666666;
        }
        .color-three {
          color: #d22642;
        }
        .color-four {
          color: #f89200;
        }
      }
    }
  }
}
</style>