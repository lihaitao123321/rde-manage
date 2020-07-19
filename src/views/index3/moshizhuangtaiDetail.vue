<template>
    <div class="t_page">
        <XHeader
            :left-options="{preventGoBack:true, backText: ''}"
            @on-click-back="$router.goBack()"
            title="模式状态详情"
        ></XHeader>
        <div class="detail-content">
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
    </div>
</template>

<script>
import { XHeader } from "vux";
import {mapState} from "vuex";
import _ from "lodash";
export default {
  components: {
    XHeader
  },
  data() {
    return {
      pageData: {
        deviceBaseInfo: {},
        deviceModes: [],
        deviceParams: []
      }
    };
  },
    created() {
        this.pageData = this.$route.params.pageData;
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
  methods: {
      convertMessage: _.debounce(function(message) {
          //模式状态处理
          let deviceModes = JSON.parse(JSON.stringify(this.pageData.deviceModes));
          deviceModes.forEach(item => {
              for (const key in message) {
                  //找到本地和mqtt对应的数据
                  if (message.hasOwnProperty(key) && key === item.abbreviate) {
                      item.value = message[key];
                      //找到mqtt的值对应的枚举数据
                  }
              }
          });
          this.pageData.deviceModes = deviceModes;
          //参数显示处理
          let deviceParams = JSON.parse(JSON.stringify(this.pageData.deviceParams));
          deviceParams.forEach(item => {
              for (const key in message) {
                  //找到本地和mqtt对应的数据
                  if (message.hasOwnProperty(key) && key === item.abbreviate) {
                      item.value = message[key];
                      //找到mqtt的值对应的枚举数据
                  }
              }
          });
          this.pageData.deviceParams = deviceParams;
      }),
  }
};
</script>

<style lang="less" scoped>
.detail-content {
  padding: 15px;
  overflow-y: auto;
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
