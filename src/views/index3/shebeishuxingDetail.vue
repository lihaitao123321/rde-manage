<template>
    <div class="t_page">
        <XHeader
            :left-options="{preventGoBack:true, backText: ''}"
            @on-click-back="$router.goBack()"
            title="属性详情"
        ></XHeader>
        <div class="detail-content">
            <div class="pillar-box">
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">1</span>
                        <span class="names">设备名称</span>
                    </div>
                    <div class="rights">
                        <span class="units">{{data.deviceName}}</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">2</span>
                        <span class="names">设备型号</span>
                    </div>
                    <div class="rights">
                        <span class="units">{{data.modelName}}</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">3</span>
                        <span class="names">设备类型</span>
                    </div>
                    <div class="rights">
                        <span class="units">{{data.devTypeName}}</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">4</span>
                        <span class="names">所属系统</span>
                    </div>
                    <div class="rights">
                        <span class="units">{{data.sysName}}</span>
                    </div>
                </div>
                <div class="item-con">
                    <div class="lefts">
                        <span class="indexs">5</span>
                        <span class="names">所属电站</span>
                    </div>
                    <div class="rights">
                        <span class="units">{{data.projectName}}</span>
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
      data: {}
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    //初始化数据
    initData() {
      return this.Tools.ajax({
        method: "/cloud/api/app/monitor/device/getDeviceById",
        data: {
          deviceId: this.$route.params.pageData.deviceBaseInfo.id
        }
      }).then(data => {
        if (data.code === 0) {
          this.data = data.data;
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
      }
    }
  }
}
</style>