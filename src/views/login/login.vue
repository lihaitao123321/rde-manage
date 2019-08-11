<template>
    <div class="t_page">
        <div class="t_content">
            <div class="t_content_image">
                <div class="t_content_image1">
                    <img style="height: 100%;width: 100%" src="../../assets/images/login/redlogo@2x.png">
                </div>
            </div>
            <group class="t_login">
                <div class="t_position">
                    <el-input
                            class="t_position_bottom"
                            placeholder="请输入账号"
                            clearable
                            v-model="input1">
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-user-o"></i>
                    </el-input>
                </div>
                <div class="t_position">
                    <el-input
                            class="t_position_bottom"
                            placeholder="请输入密码"
                            show-password
                            clearable
                            v-model="input2">
                        <i slot="prefix" class="el-input__icon t_margin_icon fa fa-lock"></i>
                    </el-input>
                </div>
                <div class="t_distance">
                    <x-button @click.native="login" class="t_submit" type="primary">登陆</x-button>
                </div>
                <div class="footer_title uf uf-dr js">
                    <span>忘记密码</span>
                    <span>新用户注册 ></span>
                </div>
            </group>
        </div>

    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Tabbar, TabbarItem, Group, Cell,XInput,XButton} from 'vux'
    import encrypt from '../../util/jsencrypt'
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
        data () {
            return {
                telephone:'15261872169',
                password:'87654321',
                td:false,
                input1:'',
                input2:'',
            }
        },
        methods:{
            login(){
                if (!this.Tools.RegExp.Phone.test(this.telephone)) {
                    this.$vux.toast.text('请输入正确的手机号码');
                    return false;
                }
                if (!this.password) {
                    this.$vux.toast.text('请输入密码');
                    return false;
                }

                let pwd=encrypt.encrypt(this.password);
                this.Tools.ajax({
                    method: '/appLogin',
                    data: {
                        "telephone": this.telephone,
                        "passwd":pwd
                    }
                }).then(data => {
                    if (data.status === 1) {
                        this.$vux.toast.text('账号或密码错误');
                        return false;
                    }
                    localStorage.setItem("tel", this.telephone);
                    localStorage.setItem("pwd", this.password);
                    localStorage.setItem("prevToken", data.token);
                    localStorage.setItem("userCompanyNum", data.num);
                    localStorage.setItem("userCurrentCompanyStatus", data.companyStatus);
                    // if (data.num > 1) {
                    //     this.$router.push('selectCompany');
                    // } else {
                    //     localStorage.setItem("userToken", data.token);
                    //     this.$router.push('home');
                    // }
                    this.$router.push('home');

                });
            },
            register(){
                this.$router.push({path: '/register'});
            },
            clearPhone(){
                console.log(666)
                this.telephone='';
            },
            clearPassword:function(){
                console('我点击了');
                this.password='';
            }
        }
    }
</script>
<style  scoped>
    .js{
        justify-content: space-between;
    }
    .uf-dr{
        flex-direction: row;
    }
    .t_content_image{
        width: 100%;
        height: 210px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .t_content_image1{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: rgba(213,51,77,1);
        border: 0px;
        border-radius: 15px;
    }
    .t_login{
        padding: 0px 38px;
    }
    .t_margin_icon{
        margin-right: 22px;
        color: #CC183C;
    }
    .t_distance{
        margin-top:50px;
        padding: 15px;
    }
    .t_page{
        background-color: white;
    }
    /deep/.weui-btn_primary{
        background-color: rgba(213,51,77,1) !important;
        border-radius: 20px !important;
        height: 44px;
    }
    /deep/.el-input--mini /deep/.el-input__inner{
        border: 0px !important;
        background-color: white !important;
        border-radius: 0px !important;
    }
    /deep/.el-input__inner{
        height: 35px !important;
    }
    .t_position{
        position: relative;
        height: 66px;
        border: 0px !important;
        background-color: white !important;
        border-bottom: 0.5px solid darkgray !important;
        border-radius: 0px !important;
    }
    .t_position_bottom{
        position: absolute;
        bottom: 10px;
        left: 0px;
    }

    /deep/.weui-cell{
        height: 66px;
        border: 0px !important;
        background-color: white !important;
        border-bottom: 0.5px solid darkgray !important;
        align-items: flex-end !important;
    }
    .footer_title{
        margin-top: 16px;
        padding-left: 15px;
        padding-right: 15px;
    }
    .footer_title :nth-child(1){
        font-size: 14px;
        color: gray;
    }
    .footer_title :nth-child(2){
        font-size: 14px;
        color: rgba(213,51,77,1);
    }
</style>