<template>
  <div class="t_page">
    <x-header :right-options="{showMore: true}" >
      <span>瑞德恩智能运维云平台</span>
      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <component :is="isActive"></component>
    <tabbar @on-index-change="tabPage">
      <tabbar-item selected>
        <img class="image" slot="icon" src="../assets/logo.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img class="image" slot="icon" src="../assets/logo.png">
        <span slot="label">地图</span>
      </tabbar-item>
      <tabbar-item >
        <img class="image" slot="icon" src="../assets/logo.png">
        <span slot="label">任务</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img class="image" slot="icon" src="../assets/logo.png">
        <span slot="label">监控</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img class="image" slot="icon" src="../assets/logo.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Tabbar, TabbarItem, Group, Cell} from 'vux'
  import index1 from './index1/index1'
  import index2 from './index2/index2'
  import index3 from './index3/index3'
  import index4 from './index4/index4'
  import index5 from './index5/index5'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      index1,
      index2,
      index3,
      index4,
      index5,
    },
    data () {

      return {
        isActive:'index1',
        children:[
          {
            label:'主页',
            value:'index1'
          },{
            label:'地图',
            value:'index2'
          },{
            label:'任务',
            value:'index3'
          },{
            label:'监控',
            value:'index4'
          },{
            label:'我的',
            value:'index5'
          }
        ],
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false
      }
    },
    methods:{
      tabPage(index){
        this.isActive='index'+(index+1);
      },
    }
  }
</script>

<style scoped>
  .overwrite-title-demo {
    margin-top: 5px;
  }
  .image{
    width: 20px;
    height: 20px;
  }
</style>