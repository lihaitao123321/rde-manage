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
        localStorage.setItem("userCompany", item.id);
        this.$router.push('home');
    },
    register() {
      console.log(666, this);
      if (!this.username) {
        this.$vux.toast.text("请输入用户名");
        return false;
      }
      if (!this.Tools.RegExp.Phone.test(this.telephone)) {
        this.$vux.toast.text("请输入正确的手机号码");
        return false;
      }
      if (!this.Tools.RegExp.password.test(this.password)) {
        this.$vux.toast.text("请输入正确的密码，4~20位字母、数字、 _的组合");
        return false;
      }
      if (this.password !== this.repassword) {
        this.$vux.toast.text("两次密码不一致");
        return false;
      }
      if (!this.code) {
        this.$vux.toast.text("验证码不能为空");
        return false;
      }

      this.Tools.ajax({
        method: "/register",
        headers: {
          "Content-type": "application/json"
        },
        data: {
          username: this.username.trim(),
          telephone: this.telephone.trim(),
          passwd: md5(this.password.trim()),
          code: this.code.trim()
        }
      }).then(res => {
        switch (res.status) {
          case "0":
            // 注册成功
            this.$vux.toast.text("注册成功");
            setTimeout(() => {
              this.$router.goBack();
            }, 1500);
            break;
          case "2":
            this.$vux.toast.text("验证码错误");
            break;
          case "3":
            this.$vux.toast.text("验证码过期");
            break;
          case "4":
            this.$vux.toast.text("用户已存在");
            break;
          default:
            // 1：失败 或者其他情况
            this.$vux.toast.text("注册失败，请重试");
            break;
        }
      });
    },
    clearPhone() {
      this.telephone = "";
    },
    clearPassword() {
      this.password = "";
    }
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