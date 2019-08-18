<template>
    <div class="t_page">
      <div class="project-page">
        <XHeader class="header" :left-options="{ preventGoBack:true, backText: '' }" @on-click-back="$router.goBack()">
          <el-select v-model="select" style="width: 116px;">
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
        <div class="table-box">
          <x-table class="table-con" :cell-bordered="false" :content-bordered="false">
            <thead>
              <tr>
                <th>序号</th>
                <th>项目名称</th>
                <th>数量</th>
                <th>单位</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>南京鼓楼医院</td>
                <td>1</td>
                <td>个</td>
              </tr>
              <tr>
                <td>2</td>
                <td>南京鼓楼医院1</td>
                <td>1</td>
                <td>个</td>
              </tr>
              <tr>
                <td>3</td>
                <td>南京鼓楼医院1</td>
                <td>1</td>
                <td>个</td>
              </tr>
            </tbody>
          </x-table>
          <div class="table-footer">
            电站数量汇总：<span>7</span>个
          </div>
        </div>
        <div class="timer">
          <img src="../../assets/images/index1/timer-icon.png"/>
          <span>2019-06-06  12:26:00</span>
        </div>





      </div>
    </div>
</template>

<script>
  import { XHeader,Group,XInput,XButton,Toast,XTable } from "vux";
  export default {
    components: {
        XHeader,
        Group,
        XInput,
        XButton,
        Toast,
        XTable
    },
    data(){
      return{
        select: 0,
        options: [{
            value: 0,
            label: '项目数量'
        }, {
            value: 1,
            label: '项目数1'
        }, {
            value: 2,
            label: '项目数2'
        }, {
            value: 3,
            label: '项目数3'
        }],
      }
    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
.project-page{
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
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
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