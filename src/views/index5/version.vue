<template>
    <div class="t_page">
        <div class="version">
            <XHeader :left-options="{preventGoBack:true}"
            @on-click-back="$router.goBack()" title="版本介绍" ></XHeader>
           <div class="logo"></div>
           <div class="version-code">当前版本V1.0</div>
           <div class="Introduction">全新上线</div>
           <div class="text">从容智慧运维云平台是一家全球领先的光伏支架、系统解决方案及服务供应商，为全球客户提供安全，可靠，稳定，高效的太阳能支架以及整体解决方案服务。</div>
           <XButton class="button">检查更新</XButton>
        </div>
    </div>
</template>
  
  <script>
  import { XHeader,XButton } from "vux";
  
  export default {
    components: {
        XHeader,
        XButton
    },
    data() {
      return {
       
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
          .version {
              .logo {
                  height: 80px;
                  width: 80px;
                  background: linear-gradient(#57b6ffFF, #2b7ff3FF);
                  margin: 35px auto;
                  border-radius: 12px;
              }

              .version-code {
                  margin: 0px auto;
                  margin-top: -20px;
                  width: 100px;
                  color: #888888FF;
                  font-size: 16px;
                  font-weight: 500;
              }

              .Introduction {
                  max-width: 68px;
                  margin: 20px auto;
                  margin-top: 60px;
                  font-size: 16px;
                  font-weight: 500;
              }

              .text {
                  margin: 0 auto;
                  width: 280px;
                  color: #616161FF;
              }

              .button {
                  margin-top: 50px;
                  width: 300px;
                  border-radius: 100px;
                  font-weight: 500;
                  background-color: #2B7FF3FF;
                  color: white;
              }
          }
      }
  </style>