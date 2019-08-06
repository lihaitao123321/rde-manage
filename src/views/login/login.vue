<template>
    <div class="t_page">
        <x-header>{{$t('login.title')}}<a slot="right" @click.stop="register">{{$t('login.register')}}</a></x-header>
        <div class="t_content">
            <div class="t_content_image">
                <div class="t_content_image1"></div>
            </div>
            <group class="t_login">
                    <x-input
                            v-model="telephone"
                            is-type="china-mobile"
                            @on-click-clear-icon="clearPhone"
                            placeholder="请填写用户名"
                    >
                        <label slot=label  class="t_margin_icon fa fa-user-o"></label>
                    </x-input>
                <x-input
                        type="password"
                        v-model="password"
                        placeholder="请填写密码"
                        @on-click-clear-icon="clearPassword">
                    <label slot=label  class="t_margin_icon fa fa-lock"></label>
                </x-input>
                <div style="padding:15px;">
                    <x-button @click.native="login" type="primary">登陆</x-button>
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
<style>
    .t_content_image{
        width: 100%;
        height: 210px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .t_content_image1{
        width: 100px;
        height: 100px;
        background-color: red;
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
</style>