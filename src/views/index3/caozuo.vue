<template>
    <div class="t_page">
      <XHeader :left-options="{preventGoBack:true, backText: ''}"
          @on-click-back="$router.goBack()"
          title="操作">
      </XHeader>
      <div class="detail-content">
        <div class="content_item">
            <div class="item_top">
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
        </div>
        <div class="all-mon">
            <div class="title">
                <div>参数设置</div>
            </div>
            <div class="pillar-box">
                <div class="item-con" v-for="(item,index) in pageData.deviceParams" :key="index">
                    <div class="lefts">
                        <div class="indexs">{{index+1}}</div>
                        <div class="names">{{item.abbreviate}}</div>
                        <div class="titles">{{item.abbreviateName}}</div>
                    </div>
                    <div class="rights">
<!--                        <div class="state-name blue">{{item.value}}</div>-->
                        <div class="state-name blue">
                            <input :style="getColor(item)" v-model="item.value"/>
                        </div>
                        <div class="units">{{item.unitName}}</div>
                        <div class="yes">
                            <van-icon v-if="getShowIcon(item)" name="success" @click="setParamsData(item)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="all-mon">
            <div class="title">
                <div>状态操作</div>
            </div>
            <div class="pillar-box">
                <div class="item-con" v-for="(item,index) in pageData.deviceModes" :key="index">
                    <div class="lefts">
                        <div class="indexs">{{index+1}}</div>
                        <div class="names">{{item.abbreviate}}</div>
                        <div class="titles">{{item.abbreviateName}}</div>
                    </div>
                    <div class="rights">
                        <div class="state-name blue">{{item.value}}</div>
                        <div class="units">{{item.label}}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { XHeader,Group,XInput,XButton,Toast } from "vux";
  import {mapState,mapActions} from "vuex";
  import _ from "lodash";
  import {getOption as getFirstOption} from "../index1/chartOptions/baojingdongtaiOption"
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
              deviceId:'',
              pageData: {
                  deviceBaseInfo: {},
                  deviceModes: [],
                  deviceParams: []
              }
          };
      },
      created() {
          this.deviceId = this.$route.params.pageData.deviceBaseInfo.id
          this.initData()
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
          ...mapActions('mqtt',['initMqtt','setMqttData']),
          //初始化数据
          initData() {
              return this.Tools.ajax({
                  method: "/cloud/api/app/monitor/device/getDeviceDetail",
                  data: {
                      deviceId:this.deviceId
                  }
              }).then(data => {
                  if (data.code === 0) {
                      let pageData = data.data
                      pageData.deviceModes.forEach(item=>item.originValue='')
                      pageData.deviceParams.forEach(item=>item.originValue='')
                      this.pageData = data.data;
                      //初始化mqtt
                      let username = pageData.deviceBaseInfo.thingId;
                      let password = pageData.deviceBaseInfo.thingKey;
                      this.initMqtt({
                          username,
                          password
                      })
                  }
              });
          },
          getColor(item){
              if(item.value != item.originValue ){
                  return {
                      color:'#2B7FF3'
                  }
              }else{
                  return {}
              }
          },
          getShowIcon(item){
              if(item.value != item.originValue ){
                  return true
              }else{
                  return false
              }
          },

          convertMessage: _.debounce(function(message) {
              //模式状态处理
              let pageData = JSON.parse(JSON.stringify(this.pageData));
              pageData.deviceModes.forEach(item => {
                  for (const key in message) {
                      //找到本地和mqtt对应的数据
                      if (message.hasOwnProperty(key) && key === item.abbreviate) {
                          item.value = message[key];
                          item.originValue = message[key];
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
          setParamsData(item){
              this.setMqttData({
                  id:item.abbreviate,
                  value:item.value
              })
              this.sendLog(item)
          },
          sendLog(item) {
              console.log(6666,this.pageData)
              return this.Tools.ajax({
                  method: "/cloud/api/control/log/save",
                  data: {
                      "deviceId":this.pageData.deviceBaseInfo.id,
                      "operate":`由${item.originValue + item.unitName}设置为${item.value + item.unitName}`,
                      "origin":0,
                      "type":0,
                      "variableId":"8aaaf67061f433510161f4d8de1f001b"
                  }
              }).then(data => {
                  if (data.status === 0 || true) {
                      this.$vux.toast.text("设置完成");
                  }else{
                      this.$vux.toast.text('设置失败，请稍后再试')
                  }
              });
          },
      }
  }
</script>

<style lang="less" scoped>
.t_page{
    overflow-y: scroll;
}
.detail-content{
  padding: 15px;
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
  }

  .all-mon{
        width: 345px;
        margin: 15px auto;
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 18px;
            div{
                &:nth-child(1){
                    font-size: 21px;
                    font-weight: bold;
                }
                &:nth-child(2){
                    padding: 6px 13px;
                    border-radius: 13px;
                    background: #ffffff;
                    font-size: 13px;
                    color: #2B7FF3;
                    display: flex;
                    align-items: center;
                    padding-right: 8px;
                    .back-icon{
                        fill: #2B7FF3;
                    }
                }
                &.rights{
                    padding: 0;
                    border-radius: 0;
                    background: none;

                    div{
                        padding: 6px 16px;
                        border-radius: 13px;
                        background: #ffffff;
                        font-size: 13px;
                        color: #2B7FF3;
                        display: flex;
                        align-items: center;
                        &:nth-child(2){
                            background: #2B7FF3;
                            color: #ffffff;
                            margin-left: 22px;
                        }
                    }
                }
            }

        }
        .chart-box{
            height: 140px;
            margin: 0 auto;
            border-radius: 5px;
            background: #ffffff;
            box-sizing: border-box;
            &.mb13{
            margin-bottom: 13px;
            }
        }
        .pillar-box{
            margin: 0 auto;
            overflow: hidden;
            border-radius: 5px;
            background: #ffffff;
            box-sizing: border-box;
            font-size: 15px;
            color: #666666;
            .item-con{
                border-bottom: 1px solid #D6D6D6;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 55px;
                padding-left: 20px;
                padding-right: 10px;
                &:last-child{
                    border-bottom: none;
                }
                .lefts{
                    display: flex;
                    align-items: center;
                    div{
                        margin-right: 8px;
                    }
                    .names{
                        min-width: 32px;
                    }
                }
                .rights{
                    display: flex;
                    align-items: center;
                    color: #333333;
                    .blue{
                        font-size: 16px;
                        input{
                            width:64px;
                            height:28px;
                            background:rgba(242,242,245,1);
                            border-radius:5px;
                            border: none;
                            text-align: center;
                            font-size:16px;
                            font-family:DIN;
                            font-weight:bold;;
                        }
                    }
                    .icon-image{
                        margin-left: 5px;
                        width: 18px;
                        height: 15px;
                    }
                    .units{
                        min-width: 16px;
                        margin-left: 5px;
                    }
                    .yes{
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        color: #2B7FF3;
                        font-size: 25px;
                        width: 35px;
                    }
                }
            }
        }

    }

}

</style>
