<template>
    <div class="t_page">
        <div class="version">
            <XHeader
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
                title="版本介绍"
            ></XHeader>
            <div class="logo">
                <img style="height: 100%;width: 100%" :src="require(`../../assets/images/logo/${config.logo}`)">
            </div>
            <div class="version-code">当前版本V1.0</div>
            <div class="introduction">全新上线</div>
            <div class="text">{{this[config.projectId]}}</div>
            <XButton class="button">检查更新</XButton>
        </div>
    </div>
</template>

  <script>
import { XHeader, XButton } from "vux";
import config from "../../config";
export default {
  components: {
    XHeader,
    XButton
  },
  data() {
    return {
        config,
        A:'德孚致力于利用物联网、大数据技术在设备运维服务领域发挥指引作用，帮助设备制造商、设备运维服务商、设备使用者、能源运营商、楼宇管理方等合作伙伴实现智慧运维云、远程监控云、能源管理云、智能楼宇云等，为设备运维行业提供完善的数据化解决方案。',
        B:'从容智慧运维云平台是一家全球领先的光伏支架、系统解决方案及服务供应商，为全球客户提供安全，可靠，稳定，高效的太阳能支架以及整体解决方案服务。'
    };
  }
};
</script>

  <style lang="less" scoped>
/deep/ .vux-header .vux-header-right {
  top: 7px;
}

/deep/ .vux-header .vux-header-title {
  font-weight: 500;
}

.t_page {
  background-color: #ffffffff;
  .version {
    .logo {
      height: 80px;
      width: 80px;
      margin: 35px auto;
    }

    .version-code {
      margin: 0px auto;
      margin-top: -20px;
      width: 100px;
      color: #888888ff;
      font-size: 16px;
      font-weight: 500;
    }

    .introduction {
      max-width: 68px;
      margin: 20px auto;
      margin-top: 60px;
      font-size: 16px;
      font-weight: 500;
    }

    .text {
      margin: 0 auto;
      width: 280px;
      color: #616161ff;
    }

    .button {
      margin-top: 50px;
      width: 300px;
      border-radius: 100px;
      font-weight: 500;
      background-color: #2b7ff3ff;
      color: white;
    }
  }
}
</style>
