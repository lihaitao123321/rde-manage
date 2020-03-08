<template>
    <div class="t_page">
        <div class="region">
            <XHeader
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
                title="所在地区"
            >
                <XButton slot="right">保存</XButton>
            </XHeader>
            <div class="text">定位到的位置</div>
            <Group class="region-input">
                <XInput v-model="region" readonly></XInput>
            </Group>
            <div class="text">全部</div>
            <Group class="region-list">
                <cell v-for="item in regionList" :title="item.name" is-link :key="item.id"></cell>
            </Group>
        </div>
    </div>
</template>
  
  <script>
import { XHeader, Group, XInput, XButton, Cell } from "vux";

export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    Cell
  },
  data() {
    return {
      region: "江西南昌",
      regionList: []
    };
  },
  mounted(){
      this.init();
  },
  methods:{
      init(){
          this.Tools.ajax({
              method:'cloud/api/app/sys/getAreaList',
              data:{}
          }).then(res=>{
              if(res.code === 0){
                  let list = res.data;
                  for(let i = 0;i < list.length;i++){
                      list[i].children = []
                  }
                  for(let i = 0;i < list.length;i++){
                      list[i].children = []
                      for(let j = 0;j<list.length;j++){
                          if(list[i].parentId == list[j].id){
                              list[j].children.push(list[i])
                          }
                      }
                  }
                  for(let i = 0;i < list.length;i++){
                      for(let j = 0;j<list.length;j++){
                          if(list[i].parentId == list[j].id){
                              list.splice(i--,1)
                          }
                      }
                  }
                  this.regionList = list;
              }
          })
      },
  }
};
</script>

  <style lang='less'scoped>
/deep/ .vux-header .vux-header-right {
  top: 7px;
}

/deep/ .vux-header .vux-header-title {
  font-weight: 500;
}

.t_page {
  .region {
      height: 100%;
    .weui-btn {
      font-size: 14px;
      line-height: 28px;
      color: white;
      background-color: #2b7ff3ff;
    }

    .text {
      padding: 16px 10px 5px 10px;
      color: #999999ff;
    }

    .region-input {
      /deep/ .weui-input {
        font-weight: 500;
      }

      /deep/ .weui-cells {
        margin: 0;
        font-size: 15px !important;
      }
    }

    .region-list {
      font-weight: 500;
      height: 100%;
      overflow: auto;
      /deep/ .weui-cells {
        margin: 0;
        font-size: 14px !important;
      }

      /deep/ .weui-cell {
        padding: 5px 15px;
      }
    }
  }
}
</style>