<template>
    <div class="t_page">
        <div class="region">
            <XHeader :left-options="{preventGoBack:true}" @on-click-back="$router.goBack()" title="所在地区">
                <XButton slot="right">保存</XButton>
            </XHeader>
            <div class="text">
                定位到的位置
            </div>
            <Group class="region-input">
                <XInput v-model="region" readonly></XInput>
            </Group>
            <div class="text">
                全部
            </div>
             <Group class="region-list">
                 <cell v-for="item in regionList" :title="item.value" is-link :key=item.value></cell>
            </Group>
        </div>
    
    </div>
</template>
  
  <script>
  import { XHeader,Group,XInput,XButton,Cell } from "vux";
  
  export default {
    components: {
        XHeader,
        Group,
        XInput,
        XButton,
        Cell
    },
    data() {
      return {
        region:'江西南昌',
        regionList:[
            {
                key:1,
                value:'北京市'
            },
             {
                key:1,
                value:'天津市'
            },
             {
                key:1,
                value:'上海市'
            },
             {
                key:1,
                value:'重庆市'
            },
             {
                key:1,
                value:'湖北市'
            },
             {
                key:1,
                value:'浙江市'
            },
             {
                key:1,
                value:'江苏市'
            },
             {
                key:1,
                value:'江西市'
            },
        ],
      };
    }
  };
  </script>

  <style lang='less'scoped>
  
  /deep/ .vux-header .vux-header-right {
      top: 7px;
  }

  /deep/ .vux-header .vux-header-title {
      font-weight: 500;
  }

  .t_page {

      .region {
          .weui-btn {
              font-size: 14px;
              line-height: 28px;
              color: white;
              background-color: #2B7FF3FF;
          }

          .text {
              padding: 16px 10px 5px 10px;
              color: #999999FF;
          }

          .region-input {
              /deep/ .weui-input {
                  font-weight: 500;
              }

              /deep/ .weui-cells {
                  margin: 0;
                  font-size: 15px !important;
              }
          }

          .region-list {
              font-weight: 500;

              /deep/ .weui-cells {
                  margin: 0;
                  font-size: 14px !important;
              }

              /deep/ .weui-cell {
                  padding: 5px 15px;
              }
          }
      }

  }

  </style>