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
                    <div class="value">
                        F009 循环水泵
                    </div>
                </div>
                <div class="line">
                    <div class="label">所属系统:</div>
                    <div class="value">NYGL01 1号楼能源管理系统</div>
                </div>
                <div class="line">
                    <div class="label">所属项目:</div>
                    <div class="value">镇江出版大厦</div>
                </div>
            </div>
        </div>
        <div class="all-mon">
            <div class="title">
                <div>参数显示</div>
            </div>
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
        <div class="all-mon">
            <div class="title">
                <div>模式状态</div>
            </div>
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

}

</style>