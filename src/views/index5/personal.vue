<template>
  <div>
    <div class="t_page">
      <XHeader :left-options="{preventGoBack:true}" @on-click-back="$router.goBack()" title="个人中心"></XHeader>
      <Group>
        <cell :title="cellData.avatar"  is-link>
          <div>
            <img :src=form.imageUrl alt="">
          </div>
        </cell>
        <cell :title="cellData.nickname" :value="form.username" is-link :link="{path:'/nickname',query:{username:form.username}}"></cell>
        <cell :title="cellData.gender" :value="form.sex" is-link @click.native="change"></cell>
        <cell :title="cellData.companyName" :value="form.companyName" is-link></cell>
        <cell :title="cellData.department" :value="form.deptName" is-link></cell>
      </Group>
      <Actionsheet v-model="isShowSex" :menus="menus" @on-click-menu="updateSex" show-cancel></Actionsheet>
      <Group>
        <cell :title="cellData.area" :value="form.areaName" is-link :link="{path:'/region'}"></cell>
        <cell :title="cellData.address" :value="form.address" is-link :link="{path:'/address',query:{address:form.address}}"></cell>
      </Group>
    </div>
  </div>
</template>
  
  <script>
import { Group, Cell, XHeader, Actionsheet } from "vux";

export default {
  components: {
    Group,
    Cell,
    XHeader,
    Actionsheet
  },
  data() {
    return {
      form: {
        imageUrl: "",
        username: "",
        sex: "",
        companyName: "",
        deptName: "",
        areaId: "",
        areaName: "",
        address: ""
      },
      cellData: {
        avatar: "头像",
        nickname: "昵称",
        gender: "性别",
        companyName: "所在单位",
        department: "部门",
        area: "所在地区",
        address: "详细地址"
      },
      isShowSex: false,
      menus: {
        0: "男",
        1: "女"
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.Tools.ajax({
        method: "cloud/api/app/my/getMyUserData",
        data: {}
      }).then(res => {
        if (res.code === 0) {
          this.form = res.data;
        } else {
          this.$vux.toast.text("加载失败");
        }
      });
    },
    updateSex(key,item) {
      if(key != 'cancel'){
        this.Tools.ajax({
          method:'cloud/api/app/my/updateUserSex',
          data:{
            sex:key
          }
        }).then(res=>{
          if(res.status === "0"){
            this.init();
          }else {
            this.$vux.toast.text('修改失败');
          }
        })
      }
    },
    change() {
      this.isShowSex = true;
    }
  }
};
</script>
  
  <style lang="less" scoped>
.t_page {
  
}
</style>
  
  