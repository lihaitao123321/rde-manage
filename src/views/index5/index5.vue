<template>
  <div class="t_page">
      <div class="top" @click="toPersonal">
        <div class="img">
              
        </div>
        <div class="top-right">
          <div><span class="name">陈高峰</span>
            <img width="17" src="../../assets/images/index5/认证@2x.png">
          </div>
          <div >南京瑞德恩科技有限公司</div>
        </div>
        <div class="right-icon">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <Group class="group">
        <cell :title="cellData.changePassword" is-link :link="{path:'/changePassword'}">
          <img slot="icon" width="16" style="margin: 5px 19px 0 0;" src="../../assets/images/index5/修改密码(1)@2x.png">
        </cell>
        <cell :title="cellData.cell2" is-link :link="{path:'/message'}">
          <img slot="icon" width="20" style="margin: 6px 15px 0 0;" src="../../assets/images/index5/消息设置@2x.png">
        </cell>
        <cell :title="cellData.cell3" is-link :link="{path:'/language'}">
          <img slot="icon" width="20" style="margin: 6px 15px 0 0;" src="../../assets/images/index5/语言类型@2x.png">
        </cell>
        <cell :title="cellData.cell4" is-link >
          <img slot="icon" width="20" style="margin: 6px 15px 0 0;" src="../../assets/images/index5/清除缓存@2x.png">
        </cell>
        <cell :title="cellData.cell5" is-link :link="{path:'/version'}">
          <img slot="icon" width="20" style="margin: 6px 15px 0 0;" src="../../assets/images/index5/版本介绍@2x.png">
        </cell>
        <cell :title="cellData.cell6" is-link :link="{path:'/aboutUs'}">
          <img slot="icon" width="20" style="margin: 6px 15px 0 0;" src="../../assets/images/index5/关于我们(1)@2x.png">
        </cell>
      </Group>
      <x-button class="button">退出登录</x-button>
  </div>
</template>

<script>
import { Group, Cell, XButton,Flexbox, FlexboxItem } from "vux";

export default {
  components: {
    Group,
    Cell,
    XButton,
    Flexbox, 
    FlexboxItem
  },
  data() {
    return {
      name:'陈高峰',
      name_desc:'南京瑞德恩科技有限公司',
      cellData: {
        changePassword: "修改密码",
        cell2: "消息设置",
        cell3: "语言类型",
        cell4: "清除缓存",
        cell5: "版本介绍",
        cell6: "关于我们"
      }
    };
  },
  methods: {
    toPersonal() {
      this.$router.push('personal');
    }
  },
};
</script>

<style lang="less" scoped>
  .t_page {
    .top {
      background:  linear-gradient(to top right,#3865DF,#3286ED);
      height: 200px;
      display:flex;
      .img {
      width: 80px;
      height: 80px;
      background-color:white;
      margin-left: 30px;
      margin-top: 20px;
      border-radius: 50%;
    }
    .top-right {
      margin: 34px;
      color: white;
      .name {
        font-size: 24px;
        margin-bottom: 5px;
        margin-right:5px;
        font-weight: bold;
      }
    }.right-icon {
      position: fixed;
      right: 20px;
      top: 48px;
      color: white;
    }
    }

    .group {
      margin-top: -100px;
      padding: 10px 20px;
    /deep/  .weui-cells {
    margin-top: 1.17647059em;
    background-color: #ffffff;
    line-height: 1.41176471;
    font-size: 16px !important;
    font-weight:500;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
  }
    }

    .name .weui-cell .vux-cell-bd p {
      margin-bottom: 0;
    }

    .name .weui-cell_access {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-size: 18px;
      color: #FFFFFFFF;
      font-weight: bold;
    }

    .button {
      margin-top: 20px;
      color: #2B7FF3FF;
      font-weight: 500;
      width: 376px;
    }
  }

  /deep/ .vux-label-desc {
    font-size: 14px;
    color: #FFFFFFFF;
  }

  /deep/ .weui-btn:after {
    border-radius: 15px;
  }
</style>

