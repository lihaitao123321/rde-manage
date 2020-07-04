<template>
  <Scroller
          use-pullup
          :pullup-config="pullupDefaultConfig"
          @on-pullup-loading="loadMore"
          use-pulldown
          :pulldown-config="pulldownDefaultConfig"
          @on-pulldown-loading="refresh"
          lock-x
          ref="scrollerBottom"
          style="height: 100%"
          height="-50">
    <div class="t_page">
      <div class="project-page">
        <XHeader class="header" :left-options="{ preventGoBack:true, backText: '' }" @on-click-back="$router.goBack()">
          <el-select v-model="select" style="width: 116px;" @change="changSelect">
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
              <tr v-for="(item,index) in projectNumList">
                <td>
                {{index + 1}}
                </td>
                <td>{{item.name}}</td>
                <td>{{item.num}}</td>
                <td>{{item.unit}}</td>
              </tr>
<!--              <tr>-->
<!--                <td>2</td>-->
<!--                <td>南京鼓楼医院1</td>-->
<!--                <td>1</td>-->
<!--                <td>个</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>3</td>-->
<!--                <td>南京鼓楼医院1</td>-->
<!--                <td>1</td>-->
<!--                <td>个</td>-->
<!--              </tr>-->
            </tbody>
          </x-table>
<!--          <div class="table-footer">-->
<!--            电站数量汇总：<span>7</span>个-->
<!--          </div>-->
        </div>
<!--        <div class="timer">-->
<!--          <img src="../../assets/images/index1/timer-icon.png"/>-->
<!--          <span>2019-06-06  12:26:00</span>-->
<!--        </div>-->





      </div>
    </div>
  </Scroller>
</template>

<script>
  import { XHeader,Group,XInput,XButton,Toast,XTable,Scroller } from "vux";
  import warn from '../Warn/warn.js'
  export default {
    components: {
        XHeader,
        Group,
        XInput,
        XButton,
        Toast,
        XTable,
      Scroller
    },
    data(){
      return{
        select: 1,
        projectNumList:[],
        pullupDefaultConfig: {
          content: "上拉加载更多",
          pullUpHeight: 10,
          height: 10,
          autoRefresh: false,
          downContent: "释放后加载",
          upContent: "上拉加载更多",
          loadingContent: "加载中...",
          clsPrefix: "xs-plugin-pullup-"
        },
        pulldownDefaultConfig: {
          content: "下拉刷新",
          height: 40,
          autoRefresh: false,
          downContent: "下拉刷新",
          upContent: "释放后刷新",
          loadingContent: "正在刷新...",
          clsPrefix: "xs-plugin-pulldown-"
        },
        total:0,
        pageNum:1,
        pageSize:10,
        options: [{
            value: 1,
            label: '项目数量'
        }, {
            value: 2,
            label: '设备数量'
        }, {
            value: 3,
            label: '负荷容量'
        }, {
            value: 4,
            label: '实时功率'
        }],
      }
    },

    mounted(){
      this.init();
    },
    methods:{
      init(){
        this.select = this.$route.params.serialNum;
        if(typeof this.select === 'string'){
          this.select = Number(this.select)
        }
        this.getProjectNum(this.$route.params.serialNum);
      },
      async loadMore() {
        if (this.total < this.pageSize * this.pageNum) {
          return false;
        }
        this.$vux.loading.show("加载数据中");
        this.pageNum++;
        await this.getProjectNum();
        this.$refs.scrollerBottom.donePullup();
        this.$vux.loading.hide();
      },
      async refresh() {
        this.$vux.loading.show("刷新数据中");
        this.pageNum = 1;
        await   this.getProjectNum();
        this.$refs.scrollerBottom.enablePullup();
        this.$refs.scrollerBottom.donePulldown();
        this.$vux.loading.hide();
      },
      changSelect(){
        this.getProjectNum();
      },
      getProjectNum(){
        warn.projectNum(this.select,this.pageNum,this.pageSize).then(res=>{
            if(res.code === 0 && Array.isArray(res.data.data) && res.data.data.length > 0){

              if (this.pageNum === 1) {
                this.projectNumList = res.data.data;
                this.total = res.data.total
              } else {
                this.warnList = this.warnList.concat(res.data.data);
              }
              this.$nextTick(() => {
                this.$refs.scrollerBottom.reset();
              });
              if (this.total < this.pageSize * this.pageNum) {
                this.$refs.scrollerBottom.disablePullup();
                // this.$vux.toast.text('没有更多数据了')
              } else {
                this.$refs.scrollerBottom.enablePullup();
              }
            }
        }).catch()
      }
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
