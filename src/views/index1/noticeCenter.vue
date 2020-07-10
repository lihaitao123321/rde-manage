<template>
    <div class="t_page">
      <XHeader :left-options="{ preventGoBack:true, backText: '' }" @on-click-back="$router.goBack()" title="消息中心" ></XHeader>
      <div class="notice-tab">
        <div class="tab-box" :class="noticeType === 0 ? 'active' : ''" @click="checkTab(0)"><span>平台消息</span></div>
        <div class="tab-box" :class="noticeType === 1 ? 'active' : ''" @click="checkTab(1)"><span>系统通知</span></div>
      </div>
      <div class="child-page">
          <keep-alive>
              <router-view />
          </keep-alive>
      </div>


<!--      <div class="platform-notice" v-if="noticeType == 0">-->
<!--        <div class="notice-box">-->
<!--          <div class="notice-con">-->
<!--            张益达 授予您【麒麟科技园光伏电站】、电控 股有限责任公司光伏发电项目共2个电站电控 股有限责任公司光伏发电项目共2个电站-->
<!--          </div>-->
<!--          <div class="notice-time">2019-07-18 15:00:00</div>-->
<!--        </div>-->
<!--        <div class="notice-box">-->
<!--          <div class="notice-con">-->
<!--            张益达 授予您【麒麟科技园光伏电站】、电控 股有限责任公司光伏发电项目共2个电站电控 股有限责任公司光伏发电项目共2个电站-->
<!--          </div>-->
<!--          <div class="notice-time">2019-07-18 15:00:00</div>-->
<!--        </div>-->
<!--        <div class="notice-box">-->
<!--          <div class="notice-con">-->
<!--            张益达 授予您【麒麟科技园光伏电站】、电控 股有限责任公司光伏发电项目共2个电站电控 股有限责任公司光伏发电项目共2个电站-->
<!--          </div>-->
<!--          <div class="notice-time">2019-07-18 15:00:00</div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="system-notice" v-if="noticeType == 1">-->
<!--        <div class="system-box">-->
<!--          <div class="system-con">-->
<!--            <p>闪耀2018活动中奖名单公示通知</p>-->
<!--            <div class="award">一等奖：<span>江小鱼</span></div>-->
<!--            <div class="award">二等奖：<span>江小鱼</span></div>-->
<!--            <div class="award">三等奖：<span>江小鱼</span></div>-->
<!--          </div>-->
<!--          <div class="system-footer">-->
<!--            <div class="btn">查看详情</div>-->
<!--            <div class="time">2019-07-18 15:00:00</div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
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
          if(num===0){
              this.$router.replace('/notice/notice1')
          }else{
              this.$router.replace('/notice/notice2')
          }
      }
    }
  }
</script>

<style lang="less" scoped>
  .child-page{
    height: calc(100% - 90px);
  }
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
       &.active{
         color: #2B7FF3;
         span{
           border-bottom: 2px solid #2B7FF3;
         }
       }
     }
   }




</style>
