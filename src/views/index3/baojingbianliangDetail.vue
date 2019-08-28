<template>
    <div class="t_page">
      <XHeader :left-options="{preventGoBack:true, backText: ''}"
          @on-click-back="$router.goBack()"
          title="报警变量详情">
      </XHeader>
      <div class="detail-content">
        <div class="pillar-box">
          <div class="item-con">
              <div class="lefts">
                  <span class="indexs">1</span>
                  <span class="names">AA1</span>
                  <span class="titles">压缩机高压报警</span>
              </div>
              <div class="rights">
                  <span class="state-name color-one">正常</span>
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
              .color-one{
                color: #1ACC83;
              }
              .color-two{
                color: #666666;
              }
              .color-three{
                color: #D22642;
              }
              .color-four{
                color: #F89200;
              }
              
          }
      }
  }
}

</style>