<template>
    <div class="t_page">
        <div class="region">
            <XHeader
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
                title="所在地区"
            >
                <XButton slot="right" @click.native="update">保存</XButton>
            </XHeader>
            <div class="text">定位到的位置</div>
            <Group class="region-input">
                <XInput :value="location" readonly></XInput>
            </Group>
            <div class="text">全部</div>
            <group>
                <x-address title="选择位置" v-model="region" :list="regionList"  placeholder="请选择地址" inline-desc="系统预设位置" :show.sync="showAddress"></x-address>
            </group>
        </div>
    </div>
</template>

  <script>
import { XHeader, Group, XInput, XButton, Cell, XAddress,ChinaAddressV4Data } from "vux";

export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    Cell,
      XAddress
  },
  data() {
    return {
      location:'江西 南昌',
      region: [],
      regionList: [],
      showAddress:false
    };
  },
  mounted(){
      this.init();
  },
  methods:{
      init(){
          this.$store.dispatch("enumeration/getAreaList").then(res => {
              this.regionList = res;
          });
      },
      update(key,item) {
          this.Tools.ajax({
              method:'/cloud/api/app/my/updateArea',
              data:{
                  areaId:this.region[0]
              }
          }).then(res=>{
              if(res.status === "0"){
                  this.$vux.toast.success('修改成功');
                  this.$router.goBack();
              }else {
                  this.$vux.toast.text('修改失败');
              }
          })
      },
  },
    computed:{
        cValue(){
            if(this.region && this.region.length>0){
                return this.region[0].name
            }else{

            }
        }
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
/deep/.weui-cells {
    margin-top: 0;
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
