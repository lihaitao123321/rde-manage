<template>
  <div>
    <div class="personal">
      <div class="red">
        <flexbox :justify='space-around'>
          <flexbox-item :span="3">
            <div class="img">
              
            </div>
          </flexbox-item>
          <flexbox-item :span='9' class="name">
              <cell :title="name" is-link :link="{path:'/personal'}" :inline-desc="name_desc" ></cell>
          </flexbox-item>
        </flexbox>
      
      </div>
      <Group class="group">
        <cell :title="cellData.changePassword" is-link :link="{path:'/changePassword'}"></cell>
        <cell :title="cellData.cell2" is-link :link="{path:'/message'}"></cell>
        <cell :title="cellData.cell3" is-link :link="{path:'/language'}"></cell>
        <cell :title="cellData.cell4" is-link></cell>
        <cell :title="cellData.cell5" is-link></cell>
        <cell :title="cellData.cell6" is-link></cell>
      </Group>
      <x-button class="button">退出登录</x-button>
    </div>
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
  }
};
</script>

<style lang="less" scoped>

.personal .red {
    background-color:#E24549;
    height: 200px;
  }
.personal .group {
  margin-top: -110px;
  padding: 10px 20px;
}
.personal .name .weui-cell .vux-cell-bd p{
  margin-bottom: 0;
}
.personal .name .weui-cell_access {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 18px;
    color: #FFFFFFFF;
    font-weight: bold;
}
/deep/ .vux-label-desc {
    font-size: 14px;
    color: #FFFFFFFF;
}

/deep/.personal .weui-cells {
  margin-top: 1.17647059em;
  background-color: #ffffff;
  line-height: 1.41176471;
  font-size: 17px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
}
.personal .button {
  margin-top: 20px;
  color: #D22642;
  font-weight: 500;
  width: 376px;
}
/deep/ .weui-btn:after {
    border-radius: 15px;
}
.personal .red .img {
    width: 80px;
    height: 80px;
    background-color: #c39898;
    margin-left: 20px;
    margin-top: 10px;
    border-radius: 50%;
}
</style>

