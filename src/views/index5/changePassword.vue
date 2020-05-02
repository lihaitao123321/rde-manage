<template>
    <div>
        <div class="changePassword">
            <XHeader :left-options="{preventGoBack:true}"
            @on-click-back="$router.goBack()" title="修改密码"></XHeader>
            <Group class="password-input">
                <XInput title="当前密码" type="password" v-model="password.old" placeholder="请输入当前密码"></XInput>
                <XInput title="新密码" type="password" v-model="password.new" placeholder="请输入新密码"></XInput>
                <XInput title="确认密码" type="password" v-model="password.confirm" placeholder="确认新密码"></XInput>
            </Group>
            <div class="button">
                <XButton  @click.native="onSave">保存</XButton>
            </div>
            <toast v-model="toast.showPositionValue" type="text" :time="5000"  :text="toast.text" position="center"></toast>
        </div>
    </div>
</template>

  <script>
  import { XHeader,Group,XInput,XButton,Toast } from "vux";
  import encrypt from '../../util/jsencrypt'
  import { mapGetters } from "vuex";

  export default {
    components: {
        XHeader,
        Group,
        XInput,
        XButton,
        Toast
    },
    data() {
      return {
       password:{
           old:'',
           new:'',
           confirm:''
       },
       toast:{
        showPositionValue:false,
        text:''
       }

      };
    },
      computed: {
          ...mapGetters(["loginInfo", "company"])
      },
    methods: {
        onSave() {
            console.log(666)
            const { password } = this;
            if (!password.old === oldPwd) {
                this.toast.showPositionValue = true;
                this.toast.text = '当前密码输入错误'
                return false;
            }
            if (!password.new === password.confirm) {
                this.toast.showPositionValue = true;
                this.toast.text = '新密码两次输入不一致'
                return false;
            }
            let reg = /^[-_a-zA-Z0-9]+$/;
            if (!reg.test(password.new) && (password.new.length >= 4 && password.new.length <= 20)) {
                this.toast.showPositionValue = true;
                this.toast.text = '请输入合法的密码，可以是4~20位的字母、数字、- 或 _的组合'
                return false;
            }
            let oldPwd = encrypt.encrypt(password.old);
            let newPwd = encrypt.encrypt(password.new);
            this.Tools.ajax({
                method: '/cloud/api/updateUserPasswd',
                data: {
                    "telephone": localStorage.getItem('tel'),
                    "oldpasswd": oldPwd,
                    "newpasswd": newPwd
                }
            }).then(res => {
                if(res.status == 0){
                    this.toast.showPositionValue = true;
                    this.toast.text = '密码修改成功'
                }

            }).catch (() => { })
        },
    },
  };
  </script>

<style lang='less' scoped>
    .changePassword .password-input .weui-cell {
        padding: 20px 10px;
    }

    .changePassword {
        .button {
            margin-top: 40px;
            padding: 0 50px;

            /deep/ .weui-btn_default {
                color: white;
                background-color: #2B7FF3FF;
                font-weight: bold;
            }

            .weui-btn {
                border-radius: 50px;
                margin-top: 40px;
            }
        }
    }
</style>
