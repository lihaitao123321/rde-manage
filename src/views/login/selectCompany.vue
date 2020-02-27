<template>
    <div class="t_page">
        <x-header :left-options="{preventGoBack:true}" @on-click-back="$router.goBack()">选择登录企业</x-header>
        <div class="content">
            <div class="item_c" v-for="item in dataList" :key="item.id" @click="selectCompany(item)">
                <img :src="Tools.config.host + item.logo">
                <div>{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  components: {
    XHeader
  },
  data() {
    return {
      dataList: [],

      username: "",
      telephone: "17630378060",
      password: "",
      repassword: "",
      code: "",
      codeText: "获取验证码",
      sending: false,
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      showMenus: false
    };
  },
  created() {},
  mounted() {
    this.getAllCompany();
  },
  methods: {
    getAllCompany() {
      this.Tools.ajax({
        method: "/cloud/api/findByUserId",
        data: {}
      }).then(res => {
        this.dataList = res;
      });
    },
    selectCompany(item){
        this.Tools.ajax({
            method: "/cloud/api/company/changeAppToken",
            data: {
              companyId:item.id
            }
        }).then(res => {
            if(res.code === 0){
                localStorage.setItem("userToken", res.data);
                this.$router.push('home');
            }else{
                this.$vux.toast.text('选择公司失败');
            }
        });
    },
  }
};
</script>
<style lang='less' scoped>
.t_page {
  .content {
      background-color: white;
    .item_c {
      display: flex;
      align-items: center;
      padding: 10px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }
}

.sendCode {
  position: absolute;
  z-index: 1;
  top: -37px;
  right: 15px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background-color: violet;
  font-size: 12px;
  border-radius: 3px;
}

.active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>