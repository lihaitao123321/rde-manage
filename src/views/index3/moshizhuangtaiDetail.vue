<template>
    <div class="t_page">
      <XHeader :left-options="{preventGoBack:true, backText: ''}"
          @on-click-back="$router.goBack()"
          title="模式状态详情">
      </XHeader>
      <div class="detail-content">

                <div class="pillar-box">
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">1</span>
                            <span class="names">AA1</span>
                            <span class="titles">工作状态</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">运行</span>
                            <img class="icon-image" src="../../assets/images/index3/fresh.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">2</span>
                            <span class="names">AA1</span>
                            <span class="titles">运行模式</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">制冷</span>
                            <img class="icon-image" src="../../assets/images/index3/leng.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">3</span>
                            <span class="names">AA1</span>
                            <span class="titles">节能模式</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">节能启用</span>
                            <img class="icon-image" src="../../assets/images/index3/go.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">4</span>
                            <span class="names">AA1</span>
                            <span class="titles">故障状态</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">正常</span>
                            <img class="icon-image" src="../../assets/images/index3/zhengchang.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">5</span>
                            <span class="names">AA1</span>
                            <span class="titles">风速</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">中速</span>
                            <img class="icon-image" src="../../assets/images/index3/zhongsu.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="lefts">
                            <span class="indexs">6</span>
                            <span class="names">AA1</span>
                            <span class="titles">温控器模式</span>
                        </div>
                        <div class="rights">
                            <span class="state-name">远程</span>
                            <img class="icon-image" src="../../assets/images/index3/yuancheng.png" alt="">
                        </div>
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
        data() {
          return {
          
          }
        },
        created(){

        },
        mounted(){
        
        },
        methods: {

        },

    }
</script>

<style lang="less" scoped>

.detail-content{
  padding: 15px;
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
          padding-left: 19px;
          padding-right: 28px; 
          &:last-child{
              border-bottom: none;
          }
          .lefts{
              span{
                  margin-right: 15px;
              }
          }
          .rights{
              display: flex;
              align-items: center;
              color: #333333;
              .blue{
                  color: #2B7FF3;
                  font-size: 16px;
              }
              .icon-image{
                  margin-left: 5px;
                  width: 18px;
                  height: 15px;
              }
              .units{
                  margin-left: 5px;
              }
          }
      }
  }
}

</style>