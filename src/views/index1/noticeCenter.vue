<template>
    <div class="t_page">
      <XHeader :left-options="{ preventGoBack:true, backText: '' }" @on-click-back="$router.goBack()" title="消息中心" ></XHeader>
      <div class="notice-tab">
        <div class="tab-box" :class="noticeType == 0 ? 'actice' : ''" @click="checkTab(0)"><span>平台消息</span></div>
        <div class="tab-box" :class="noticeType == 1 ? 'actice' : ''" @click="checkTab(1)"><span>系统通知</span></div>
      </div>
      <div class="platform-notice" v-if="noticeType == 0">
        <div class="notice-box">
          <div class="notice-con">
            张益达 授予您【麒麟科技园光伏电站】、电控 股有限责任公司光伏发电项目共2个电站电控 股有限责任公司光伏发电项目共2个电站
          </div>
          <div class="notice-time">2019-07-18 15:00:00</div>
        </div>
        <div class="notice-box">
          <div class="notice-con">
            张益达 授予您【麒麟科技园光伏电站】、电控 股有限责任公司光伏发电项目共2个电站电控 股有限责任公司光伏发电项目共2个电站
          </div>
          <div class="notice-time">2019-07-18 15:00:00</div>
        </div>
        <div class="notice-box">
          <div class="notice-con">
            张益达 授予您【麒麟科技园光伏电站】、电控 股有限责任公司光伏发电项目共2个电站电控 股有限责任公司光伏发电项目共2个电站
          </div>
          <div class="notice-time">2019-07-18 15:00:00</div>
        </div>
      </div>
      <div class="system-notice" v-if="noticeType == 1">
        <div class="system-box">
          <div class="system-con">
            <p>闪耀2018活动中奖名单公示通知</p>
            <div class="award">一等奖：<span>江小鱼</span></div>
            <div class="award">二等奖：<span>江小鱼</span></div>
            <div class="award">三等奖：<span>江小鱼</span></div>
          </div>
          <div class="system-footer">
            <div class="btn">查看详情</div>
            <div class="time">2019-07-18 15:00:00</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { XHeader,Group,XInput,XButton,Toast } from "vux";
  export default {
    components: {
        XHeader,
        Group,
        XInput,
        XButton,
        Toast
    },
    data(){
      return{
        noticeType: 0

      }
    },
    methods:{
      checkTab(num){
        this.noticeType = num
      }
    }
  }
</script>

<style lang="less" scoped>

   .notice-tab{
     height: 44px;
     line-height: 44px;
     display: flex;
     border-top: 1px solid #CDCDCD;
     background: #ffffff;
     .tab-box{
       flex: 1;
       box-sizing: border-box;
       color: #323232;
       font-size: 16px;
       text-align: center;
       span{
         display: inline-block;
         height: 100%;
         box-sizing: border-box;
         border-bottom: 1px solid #ffffff;
       }
       &.actice{
         color: #2B7FF3;
         span{
           border-bottom: 1px solid #2B7FF3;
         }
       }
     }
   }

   .platform-notice{
     padding: 15px;
    .notice-box{
      padding: 15px 14px;
      margin-bottom: 15px;
      background: #ffffff;
      border-radius: 5px;
      .notice-con{
        color: #333333;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .notice-time{
        color: #BBBBBB;
        font-size: 13px;
        margin-top: 10px;
      }
    }
   }

   .system-notice{
     padding: 15px;
     .system-box{
      padding: 12px 0;
      margin-bottom: 15px;
      background: #ffffff;
      border-radius: 5px;

        .system-con{
          padding: 0 17px;
          padding-bottom: 10px;
          border-bottom: 1px solid #E6E6E6;
          p{
            color: #212121;
            font-size: 16px;
            margin: 0;
            padding: 0;
          }
          .award{
            margin-top: 10px;
            font-size: 14px;
            color: #888888;
            span{
              color: #212121;
            }
          }
        }
      
      .system-footer{
        padding: 0 17px;
        padding-top: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn{
          width: 74px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          border-radius: 13px;
          color: #ffffff;
          font-size: 13px;
          background: #2B7FF3;
        }
        .time{
          font-size: 13px;
          color: #BBBBBB;
        }
      }
     }
   }
 
</style>