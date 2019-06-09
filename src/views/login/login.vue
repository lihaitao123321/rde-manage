<template>
    <div class="t_page">
        <x-header>登陆<a slot="right" @click.stop="register">注册</a></x-header>
        <div class="t_content">
            <group >
                <x-input
                        title="手机号码"
                        v-model="telephone"
                        is-type="china-mobile"
                        @on-click-clear-icon="clearPhone"
                ></x-input>
                <x-input
                        type="password"
                        title="登陆密码"
                        v-model="password"
                        @on-click-clear-icon="clearPassword"
                ></x-input>
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

                    try {
                        if (data.num > 1) {
                            // commonjs.goPage("selectCompany");
                        } else {
                            localStorage.setItem("userToken", data.token);
                        }
                    }catch(e){

                    }
                    this.$router.push('home');
                });
                this.$router.push({path: '/home'});
            },
            register(){
                this.$router.push({path: '/register'});
            },
            clearPhone(){
                this.phone='';
            },
            clearPassword(){
                this.password='';
            },
        }
    }
</script>