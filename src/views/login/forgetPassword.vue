<template>
    <div class="t_page">
        <x-header title="忘记密码" :left-options="{preventGoBack:true}" @on-click-back="$router.goBack()"></x-header>
        <div class="pageContent">
            <group class="group_height" label-width="80px">
                <div class="t_position select-country"  v-if="isActive">
                    <el-input placeholder="请输入手机号" class="t_position_bottom" v-model="telephone" clearable>
                          <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
                              <el-option label="中国大陆+86" value="test"></el-option>
                              <el-option label="美国+86" value="test1"></el-option>
                              <el-option label="日本+23" value="test2"></el-option>
                          </el-select> -->
                          <el-select v-model="select" slot="prepend" placeholder="请选择">
                              <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                              </el-option>
                          </el-select>
                    </el-input>
                </div>
                <div class="t_position ">
                    <el-input
                        class="t_position_bottom"
                        placeholder="新密码(6-20位，字母、数字、-或_)"
                        clearable
                        show-password
                        v-model="password"
                    >
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-lock"></i>
                    </el-input>
                </div>
                <!-- <div class="t_position" v-if="isActive">
                    <el-input
                        class="t_position_bottom"
                        placeholder="请输入手机号"
                        clearable
                        v-model="telephone"
                    >
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-mobile"></i>
                    </el-input>
                </div> -->
                <!-- <div class="t_position"  v-if="!isActive">
                    <el-input
                            class="t_position_bottom"
                            placeholder="邮箱"
                            clearable
                            v-model="email">
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-envelope-o"></i>
                    </el-input>
                </div>-->

                <div class="t_position code_margin">
                    <el-input class="t_position_bottom" placeholder="验证码" clearable v-model="code">
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-shield"></i>
                        <el-button slot="append" @click.stop="sendCode">{{codeText}}</el-button>
                    </el-input>
                </div>
                <div style="padding:15px;margin-top: 40px;">
                    <x-button
                        type="primary"
                        :disabled="!checked"
                        @click.native="register"
                    >{{'重置密码' || $t('register.ok')}}</x-button>
                </div>
            </group>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
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

export default {
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
      username: "",
      nickname: "",
      telephone: "",
      email: "",
      password: "",
      code: "",
      codeText: "获取验证码",
      sending: false,
      checked: true,
      disabled: true,
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      showMenus: false,
      registerType: 0,
      isActive: true,
      isTab: false,
      input1: "李海涛",
      input2: "",
      input3: "",
      input4: "17630378060",
      select: 0,
      options: [
        { value: 0, label: "中国大陆86+" },
        { value: 1, label: "日本43+" }
      ]
    };
  },
  methods: {
    consoleIndex() {},
    userHttp() {
      this.$router.push("home");
    },
    tabColor() {
      this.isActive = true;
      this.isTab = false;
    },
    tabColor1() {
      this.isActive = false;
      this.isTab = true;
    },
    sendCode() {
      if (this.sending) {
        return false;
      }
      if (!this.Tools.RegExp.Phone.test(this.telephone)) {
        this.$vux.toast.text("请输入正确的手机号码");
        return false;
      }
      this.sending = true;
      let n = 120;
      this.codeText = "再次获取(" + n + "s)";
      let timer = setInterval(() => {
        if (n === 0) {
          this.sending = false;
          this.codeText = "获取验证码";
          clearInterval(timer);
        } else {
          this.codeText = "再次获取(" + n + "s)";
          n--;
        }
      }, 1000);
      this.Tools.ajax({
        method: "/cloud/api/sendforgetmsg",
        data: {
          telephone: this.telephone
        }
      }).then(res => {
          if(res.status == 0){
              this.$toast.success('发送验证码成功，注意查收')
          }else{
              this.$toast.fail('发送验证码失败')
          }
      });
    },
    register() {
      if (!this.Tools.RegExp.Phone.test(this.telephone)) {
        this.$vux.toast.text("请输入正确的手机号码");
        return false;
      }
      if (!this.Tools.RegExp.password.test(this.password)) {
        this.$vux.toast.text("请输入正确的密码格式");
        return false;
      }
      if (!this.code) {
        this.$vux.toast.text("验证码不能为空");
        return false;
      }
      this.Tools.ajax({
        method: "/cloud/api/forgetpasswd",
        data: {
          code: this.code.trim(),
          passwd: encrypt.encrypt(this.password),
          telephone: this.telephone.trim(),
        }
      }).then(res => {
        switch (res.status) {
          case "0":
            // 注册成功
            this.$toast.success('重置密码成功')
            setTimeout(() => {
              this.$router.goBack();
            }, 1500);
            break;
          case "2":
              this.$toast.fail('验证码错误')
            break;
          case "3":
              this.$toast.fail('验证码过期')
            break;
          default:
            // 1：失败 或者其他情况
              this.$toast.fail('重置密码失败，请重试')
            break;
        }
      });
    },
    clearPhone() {
      this.telephone = "";
    },
    clearNickname() {
      this.nickname = "";
    },
    clearPassword() {
      this.password = "";
    }
  }
};
</script>
<style lang="less" scoped>
.pageContent {
  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  padding: 0 15px;
}
/deep/ .vux-header-title span {
  color: black;
}
@button-tab-border-radius: 3px;
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
.uf {
  display: flex;
}
.jf {
  justify-content: center;
}
.dr {
  flex-direction: row;
}
/deep/.el-select .el-input {
  width: 130px;
}
.t_tabs {
  width: 100%;
  height: 40px;
  background-color: white;
  position: relative;
  border-radius: 8px;
}
/deep/.weui-cells:after {
  border-bottom: 0px;
}
.t_tabs :nth-child(1) {
  border: 0px;
  height: 70%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  width: calc(50% - 1px);
  position: relative;
}
.t_margin_icon {
  margin-right: 22px;
  color: rgba(43, 127, 243, 1);
  font-size: 20px;
}
.activefont1 {
  color: rgba(43, 127, 243, 1);
}
.activefont2 {
  color: rgba(43, 127, 243, 1);
}
.activeColor1 {
  position: absolute;
  bottom: 0px;
  width: 18px;
  height: 3px;
  left: calc(25% - 13px);
  background-color: rgba(43, 127, 243, 1);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.activeColor2 {
  position: absolute;
  bottom: 0px;
  width: 18px;
  height: 3px;
  left: calc(75% - 13px);
  background-color: rgba(43, 127, 243, 1);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.t_tabs :nth-child(2) {
  border: 0px;
  width: 50%;
  height: 70%;
}
.f1 {
  flex: 1;
}
.ac {
  align-items: center;
}
.jc {
  justify-content: center;
}
.active {
  background-color: rgba(0, 0, 0, 0.1);
}
.dc {
  flex-direction: column;
}

/deep/ .t_content {
  padding: 0 10px;
}
.t_position {
  position: relative;
  height: 66px;
  border: 0px !important;
  background-color: white !important;
  border-bottom: 01px solid #E6E6E6 !important;
  border-radius: 0px !important;
}
.t_position_bottom {
  position: absolute;
  bottom: 10px;
  left: 0px;
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
.el-input-group--prepend .el-input__inner,
/deep/.el-input-group__append {
  border: 0px !important;
  border-radius: 30px;
  background-color: rgba(43, 127, 243, 1) !important;
  color: white !important;
}
.code_margin {
  padding-right: 20px;
}

.padding_lrt15px {
  padding: 15px 0px 0 0px;
  margin: 0px 10px;
}
.group_height {
  height: calc(100% - 68px);
  background-color: white;
  padding: 0 22px;
  border-radius: 5px;
}
.font_color {
  color: rgba(43, 127, 243, 1) !important;
  font-size: 15px;
}
.http_padding {
  margin-top: 40px;
  padding-left: 20px;
}
.font_size {
  margin-left: 10px;
  color: gray;
  font-size: 15px;
}
.select-country{
  border-right: 1px solid #EBEBEB;
  /deep/.el-input__inner {
    font-size:14px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    padding-left: 10px;
  }
  input{
      border: none;
      padding-left: 10px;
  }
}
/deep/.el-input-group__prepend{
  color: #333333;
  font-size:14px;
    border: none;
  }
/deep/.el-select .el-input .el-select__caret {
    color:#323232;
}
</style>
