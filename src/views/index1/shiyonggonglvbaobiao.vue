<template>
    <div class="t_page">
      <div class="project-page">
        <XHeader class="header" :left-options="{ preventGoBack:true, backText: '' }" @on-click-back="$router.goBack()">
          <el-select v-model="select" style="width: 155px;">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
          </el-select>
          <div class="right-box" slot="right">
            <img src="../../assets/images/index1/share.png" />
            <img src="../../assets/images/index1/clip.png" />
          </div>
        </XHeader>
        <div class="type-tab">
          <div class="tab-box" :class="tabType==0 ? 'active' : '' " @click="tabChange(0)"><span>分析</span><div class="line"></div></div>
          <div class="tab-box" :class="tabType==1 ? 'active' : '' " @click="tabChange(1)"><span>报表</span><div class="line"></div></div>
        </div>
        <template v-if="tabType==0">
          <div class="table-box">
            <x-table class="table-con" :cell-bordered="false" :content-bordered="false">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>时间</th>
                  <th>实时功率</th>
                  <th>单位</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2019-07-12 15:00:00</td>
                  <td>350</td>
                  <td>Kw</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2019-07-12 15:00:00</td>
                  <td>350</td>
                  <td>Kw</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2019-07-12 15:00:00</td>
                  <td>350</td>
                  <td>Kw</td>
                </tr>
              </tbody>
            </x-table>
          </div>
          <div class="options">
            <div class="option-box">
              <div class="label-name">采集周期：</div>
              <el-select v-model="select" class="select-box">
                  <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
            </div>
            <div class="option-box">
              <div class="label-name">起始时间：</div>
              <el-select v-model="select" class="select-box">
                  <el-option
                          v-for="item in options3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
            </div>
            <div class="option-box">
              <div class="label-name">终止时间：</div>
              <el-select v-model="select" class="select-box">
                  <el-option
                          v-for="item in options3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
            </div>
          </div>
          <div class="search-btn">查询</div>
          <div class="timer">
            <img src="../../assets/images/index1/timer-icon.png"/>
            <span>2019-06-06  12:26:00</span>
          </div>
        </template>
        <template v-else>
          <div class="baobiao">
            <div class="all-mon">
                <div class="pillar-box">
                    <v-chart 
                        :data="data5" 
                        class="chart-box"
                        :width= "340">
                        <v-scale x type="timeCat"  />
                        <v-scale y :min="0" alias="KW"  />
                        <v-point
                            :style="{
                            stroke: '#fff',
                            lineWidth: 1
                            }"
                            shape="smooth" />
                        <v-line shape="smooth" />
                    </v-chart>
                </div>
            </div>
          </div>
          <div class="options">
            <div class="option-box">
              <div class="label-name">起始时间：</div>
              <el-select v-model="select" class="select-box">
                  <el-option
                          v-for="item in options3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
            </div>
            <div class="option-box">
              <div class="label-name">终止时间：</div>
              <el-select v-model="select" class="select-box">
                  <el-option
                          v-for="item in options3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
            </div>
          </div>
          <div class="search-btn">分析</div>
          <div class="timer">
            <img src="../../assets/images/index1/timer-icon.png"/>
            <span>2019-06-06  12:26:00</span>
          </div>
        </template>






      </div>
    </div>
</template>

<script>
  import { XHeader,XButton,Toast,XTable, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Tabbar, TabbarItem, Group, Cell,XInput,
      VChart, VLine, VArea, VTooltip, VLegend, VPie, VGuide, VBar, VScale, VPoint } from "vux";
  export default {
    components: {
        XHeader,
        Group,
        XInput,
        XButton,
        Toast,
        XTable,
        VChart,
        VLine,
        VArea,
        VTooltip,
        VLegend,
        VBar,
        VGuide,
        VPie,
        VScale,
        VPoint
    },
    data(){
      return{
        data5: [
            { time: '2016-08-08 00:00:00', tem: 10 },
            { time: '2016-08-08 00:10:00', tem: 22 },
            { time: '2016-08-08 00:30:00', tem: 20 },
            { time: '2016-08-09 00:35:00', tem: 26 },
            { time: '2016-08-09 01:00:00', tem: 20 },
            { time: '2016-08-09 01:20:00', tem: 26 },
            { time: '2016-08-10 01:40:00', tem: 28 },
            { time: '2016-08-10 02:00:00', tem: 20 },
            { time: '2016-08-10 02:20:00', tem: 18 }
        ],
        tabType: 0,
        select: 0,
        options: [{
            value: 0,
            label: '实时用电功率'
        }, {
            value: 1,
            label: '实时用电功率'
        }, {
            value: 2,
            label: '实时用电功率'
        }, {
            value: 3,
            label: '实时用电功率'
        }],
        options2: [{
            value: 0,
            label: '5分钟'
        }, {
            value: 1,
            label: '10分钟'
        }, {
            value: 2,
            label: '15分钟'
        }, {
            value: 3,
            label: '20分钟'
        }],
        options3: [{
            value: 0,
            label: '2019-06-10  15:00:00'
        }, {
            value: 1,
            label: '2019-06-10  15:00:00'
        }, {
            value: 2,
            label: '2019-06-10  15:00:00'
        }, {
            value: 3,
            label: '2019-06-10  15:00:00'
        }]
      }
    },
    methods:{
      tabChange(nub){
        this.tabType = nub
      }
    }
  }
</script>

<style lang="less" scoped>
.project-page{
  .baobiao{
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
              color: #ffffff;
            }
            &:nth-child(2){
              padding: 6px 13px;
              border-radius: 13px;
              background: rgba(255,255,255,0.2);
              font-size: 13px;
              color: #ffffff;
              display: flex;
              align-items: center;
              padding-right: 8px;
              .back-icon{
                fill: #ffffff;
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
          height: 295px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 5px;
          background: #ffffff;
          box-sizing: border-box;
          .chart-box{
            margin: 0 auto;
          }
        }

      }
  }
  .options{
    width: 345px;
    margin: 0 auto;
    border-radius: 5px;
    background: #ffffff;
    .option-box{
      display: flex;
      align-items: center;
      height: 45px;
      border-bottom: 1px solid #F2F2F5;
      .label-name{
        width: 107px;
        color: #999999;
        font-size: 14px;
        text-align: center;
      }
      .select-box{
        flex: 1;
        padding-right: 16px;
        /deep/ .el-input__inner {
          background: #ffffff;
          border: none;
          font-size: 14px;
          color: #333333;
        }
      }
    }
  }
  .search-btn{
    width: 345px;
    height: 41px;
    line-height: 41px;
    text-align: center;
    background: #2B7FF3;
    color: #ffffff;
    font-size: 17px;
    margin: 15px auto;
    border-radius: 5px;
  }
  .type-tab{
    display: flex;
    align-items: center;
    height: 40px;
    background: #ffffff;
    border-radius: 5px;
    margin: 15px 15px 0 15px;
    .tab-box{
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #313131;
      position: relative;
      span{
        display: block;
        width: 100%;
        height: 18px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .line{
        width: 18px;
        height: 3px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: #FFFFFF;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -9px;
      }
      &.active{
        color: #2B7FF3;
        font-weight: bold;
        .line{
          background: #2B7FF3;
        }
      }
      &:first-child{
        span{
          border-right: 1px solid #E8E8EB;
        }
      }
    }
  }
  .header{
    /deep/ .el-input__inner{
      background: none;
      font-size: 18px;
      color: #333333;
      font-weight: bold;
    }
    /deep/ .el-input .el-select__caret{
      color: #2B7FF3;
      font-size: 18px;
    }
    /deep/ .vux-header-right{
      height: 100%;
      top: 0;
    }
    .right-box{
      display: flex;
      height: 100%;
      align-items: center;
      img{
        width: 29px;
        height: 29px;
        &:nth-child(1){
          margin-right: 12px;
        }
      }
    }
  }
  .table-box{
    padding: 17px 15px 15px 15px;
    /deep/ .vux-table td:before, .vux-table th:before{
      border-bottom: none;
    }
    .table-con{
      border-radius: 5px;
      background: #ffffff;
      tbody{
        tr{
          &:nth-child(2n+1){
            background: #F7F7FA;
          }
        }
      }
    }
    .table-footer{
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      height: 61px;
      line-height: 61px;
      background: #ffffff;
      font-size: 13px;
      color: #888888;
      text-align: right;
      padding: 0 27px;
      span{
        font-size: 21px;
        color: #2B7FF3;
      }

    }
  }
  .timer{
    display: flex;
    padding: 0 15px;
    align-items: center;
    font-size: 13px;
    color: #ABABAB;
    img{
      margin-right: 8px;
      width: 13px;
      height:13px;
    }
  }

}
 
</style>