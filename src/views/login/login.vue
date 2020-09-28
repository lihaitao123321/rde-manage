<template>
    <div class="t_page">
            <div class="t_content_image">
                <div class="t_content_image1">
                    <img style="height: 100%;width: 100%" :src="require('../../assets/images/logo/' + config.logo)">
                </div>
            </div>
            <div class="bottom-layout">
                <div class="input-layout">
                    <el-input
                            class="input"
                            placeholder="请输入账号"
                            clearable
                            v-model="telephone"
                    >
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-user-o"></i>
                    </el-input>
                </div>
                <div class="input-layout">
                    <el-input
                            class="input"
                            placeholder="请输入密码"
                            show-password
                            clearable
                            v-model="password"
                    >
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-lock"></i>
                    </el-input>
                </div>
                <div class="t_distance">
                    <x-button @click.native="login" class="t_submit" type="primary">登录</x-button>
                </div>
                <div class="footer_title uf uf-dr js">
                    <span @click="gotoForgetPassword">忘记密码</span>
                    <span @click="register()">新用户注册 ></span>
                </div>
            </div>

    </div>
</template>

<script>
import {
  XHeader,
  Actionsheet,
  TransferDom,
  ButtonTab,
  ButtonTabItem,
  Tabbar,
  TabbarItem,
  Group,
  Cell,
  XInput,
  XButton
} from "vux";
import encrypt from "../../util/jsencrypt";
import config from "../../config";
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
    XInput,
    XButton
  },
  data() {
    return {
      config,
      // telephone: "15051665680",
      // password: "11076038",
        telephone: "",
        password: "",
      td: false,
      input1: "",
      input2: ""
    };
  },
    created() {
      if(this.config.projectId === 'A' || process.env.NODE_ENV === "development"){
          this.telephone = '17630378060'
          this.password = '123321'
      }
    },
    methods: {
    login() {
      if (!this.Tools.RegExp.Phone.test(this.telephone)) {
        this.$vux.toast.text("请输入正确的手机号码");
        return false;
      }
      if (!this.password) {
        this.$vux.toast.text("请输入密码");
        return false;
      }
      localStorage.removeItem('userToken')
      this.Tools.ajax({
        method: "/cloud/api/appLogin",
        data: {
          telephone: this.telephone,
          passwd: encrypt.encrypt(this.password)
        }
      }).then(data => {
        if (data.status == 1) {
          this.$vux.toast.text("账号或密码错误");
          return false;
        }
          if (data.num == 0) {
              this.$vux.toast.text("当前用户未绑定所属公司，请联系管理员!");
              return false;
          }else{
              localStorage.setItem("tel", this.telephone);
              localStorage.setItem("pwd", this.password);
              localStorage.setItem("prevToken", data.token);
              localStorage.setItem("userToken", data.token);
              localStorage.setItem("userCompanyNum", data.num);
              localStorage.setItem("userCurrentCompanyStatus", data.companyStatus);

              this.$store.commit("setLoginInfo", {
                  tel: this.telephone,
                  pwd: this.password,
                  token:data.token
              });
              if (data.num > 1) {
                  localStorage.setItem("userToken", data.token);
                  this.$router.push("selectCompany");
              } else {
                  this.$router.push("home");
              }
          }

      });
    },
    register() {
      this.$router.push({ path: "/register" });
    },
      gotoForgetPassword(){
          this.$router.push({ path: "/forgetPassword" });
      },
    clearPhone() {
      console.log(666);
      this.telephone = "";
    },
    clearPassword: function() {
      console("我点击了");
      this.password = "";
    }
  }
};
</script>
<style lang="less" scoped>
    .t_page{
        background-color: white;
        .t_content_image {
            width: 100%;
            height: 210px;
            display: flex;
            justify-content: center;
            align-items: center;
            .t_content_image1 {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                height: 100px;
                background-color: rgba(43, 127, 243, 1);
                border: 0px;
                border-radius: 15px;
            }
        }
        .bottom-layout{
            padding: 0 40px;
            .input-layout {
                display: flex;
                align-items: center;
                height: 66px;
                border-bottom: 1px solid rgba(0,0,0,0.05);
                .input{
                    border: none !important;
                }
            }
        }
    }

.el-input__icon{
    line-height: 36px;
}
.js {
  justify-content: space-between;
}
.uf-dr {
  flex-direction: row;
}


.t_login {
  padding: 0px 38px;
}
.t_margin_icon {
  margin-right: 22px;
  color: rgba(43, 127, 243, 1);
  font-size: 20px;
}
.t_distance {
  margin-top: 50px;
  padding: 15px;
}
/deep/.weui-btn_primary {
  background-color: rgba(43, 127, 243, 1) !important;
  border-radius: 20px !important;
  height: 44px;
}
/deep/.el-input--mini /deep/.el-input__inner {
  border: 0px !important;
  background-color: white !important;
  border-radius: 0px !important;
}
/deep/.el-input__inner {
  height: 35px !important;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:bold;
  padding-left: 40px;
}

/deep/.weui-cell {
  height: 66px;
  border: 0px !important;
  background-color: white !important;
  border-bottom: 0.5px solid darkgray !important;
  align-items: flex-end !important;
}
.t_content /deep/.weui-cells:after {
  border-bottom: 0px !important;
}
.footer_title {
  margin-top: 16px;
  padding-left: 15px;
  padding-right: 15px;
}
.footer_title :nth-child(1) {
  font-size: 14px;
  color: gray;
}
.footer_title :nth-child(2) {
  font-size: 14px;
  color: rgba(43, 127, 243, 1);
}
</style>
