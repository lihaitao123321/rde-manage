<template>
    <div class="t_page">
      <XHeader :left-options="{preventGoBack:true, backText: ''}"
          @on-click-back="$router.goBack()"
          title="参数显示详情">
      </XHeader>
      <div class="canshu-content">
        <div class="pillar-box">
            <div class="item-con">
                <div class="lefts">
                    <span class="indexs">1</span>
                    <span class="names">AA1</span>
                    <span class="titles">累计运行时间</span>
                </div>
                <div class="rights">
                    <span class="state-name blue">1450</span>
                    <span class="units">H</span>
                </div>
            </div>
            <div class="item-con">
                <div class="lefts">
                    <span class="indexs">2</span>
                    <span class="names">AA1</span>
                    <span class="titles">实时功率</span>
                </div>
                <div class="rights">
                    <span class="state-name blue">26</span>
                    <span class="units">KW</span>
                </div>
            </div>
            <div class="item-con">
                <div class="lefts">
                    <span class="indexs">3</span>
                    <span class="names">AA1</span>
                    <span class="titles">供水温度</span>
                </div>
                <div class="rights">
                    <span class="state-name blue">15</span>
                    <span class="units"> ℃</span>
                </div>
            </div>
            <div class="item-con">
                <div class="lefts">
                    <span class="indexs">4</span>
                    <span class="names">AA1</span>
                    <span class="titles">回水温度</span>
                </div>
                <div class="rights">
                    <span class="state-name blue">7.5</span>
                    <span class="units"> ℃</span>
                </div>
            </div>
            <div class="item-con">
                <div class="lefts">
                    <span class="indexs">5</span>
                    <span class="names">AA1</span>
                    <span class="titles">冷凝器低压压力</span>
                </div>
                <div class="rights">
                    <span class="state-name blue">0.67</span>
                    <span class="units">Bar</span>
                </div>
            </div>
            <div class="item-con">
                <div class="lefts">
                    <span class="indexs">6</span>
                    <span class="names">AA1</span>
                    <span class="titles">温控器模式</span>
                </div>
                <div class="rights">
                    <span class="state-name blue">0.15</span>
                    <span class="units">Bar</span>
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
.canshu-content{
  padding: 15px;
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

</style>