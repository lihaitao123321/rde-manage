<template>
    <div class="t_page">
        <x-header
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
        >注册</x-header>
        <div class="t_content">
            <group label-width="80px">
                <x-input
                        title="用户名"
                        v-model="username"
                        is-type="china-mobile"
                        @on-click-clear-icon="clearPhone"
                ></x-input>
                <x-input
                        title="手机号码"
                        v-model="telephone"
                        is-type="china-mobile"
                        @on-click-clear-icon="clearPhone"
                ></x-input>
                <x-input
                        type="password"
                        title="登陆密码"
                        placeholder="4~20位字母、数字、 _的组合"
                        v-model="password"
                        @on-click-clear-icon="clearPassword"
                ></x-input>
                <x-input
                        type="password"
                        title="再次密码"
                        placeholder="4~20位字母、数字、 _的组合"
                        v-model="repassword"
                        @on-click-clear-icon="clearPassword"
                ></x-input>
                <x-input
                        type="password"
                        title="验证码"
                        v-model="code"
                        @on-click-clear-icon="clearPassword"
                ></x-input>
                <div style="position: relative;">
                    <div class="sendCode" :class="sending?'active':''" @click.stop="sendCode">{{codeText}}</div>
                </div>
                <div style="padding:15px;">
                    <x-button @click.native="login" type="primary" @click.stop="register">注册</x-button>
                </div>
            </group>
        </div>

    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Tabbar, TabbarItem, Group, Cell,XInput,XButton} from 'vux'

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
        data () {
            return {
                username:'',
                telephone:'17630378060',
                password:'',
                repassword:'',
                code:'',
                codeText:'获取验证码',
                sending:false,
                menus: {
                    menu1: 'Take Photo',
                    menu2: 'Choose from photos'
                },
                showMenus: false
            }
        },
        methods:{
            sendCode(){
                if(this.sending){
                    return false;
                }
                if(!this.Tools.RegExp.Phone.test(this.telephone)){
                    this.$vux.toast.text('请输入正确的手机号码');
                    return false;
                }
                this.sending=true;
                let n=120;
                this.codeText='再次获取('+n+'s)';
                let timer= setInterval(()=>{
                    if(n===0){
                        this.sending=false;
                        this.codeText='获取验证码';
                        clearInterval(timer);
                    }else{
                        this.codeText='再次获取('+n+'s)';
                        n--;
                    }
                },1000);
                this.Tools.ajax({
                    method:'/sendregistermsg',
                    data:{
                        "telephone" : this.telephone
                    }
                }).then(res=>{
                    switch (res.status) {
                        case '0':
                            // 发送成功
                            this.$vux.toast.text('验证码已发送请注意查收');
                            break;
                        case '2':
                            this.$vux.toast.text('2分钟内不重复发送短信');
                            break;
                        default:
                            // 1：失败 或者其他情况
                            this.$vux.toast.text('发送失败，请稍后重试！');
                            break;
                    }
                });
            },
            register(){
                if(!this.username.trim()){
                    this.$vux.toast.text('请输入用户名');
                    return false;
                }
                if(!this.Tools.RegExp.Phone.test(this.telephone)){
                    this.$vux.toast.text('请输入正确的手机号码');
                    return false;
                }
                if(!this.Tools.RegExp.password.test(this.password)){
                    this.$vux.toast.text('请输入正确的密码，4~20位字母、数字、 _的组合');
                    return false;
                }
                if(this.password!==this.repassword){
                    this.$vux.toast.text('两次密码不一致');
                    return false;
                }
                this.Tools.ajax({
                    method:'/register',
                    data:{
                        "username" : this.username,
                        "telephone" : this.telephone,
                        "passwd" : encrypt.encrypt(password),
                        "code" : code
                    }
                }).then(res=>{
                    switch (res.status) {
                        case '0':
                            // 发送成功
                            this.$vux.toast.text('验证码已发送请注意查收');
                            break;
                        case '2':
                            this.$vux.toast.text('2分钟内不重复发送短信');
                            break;
                        default:
                            // 1：失败 或者其他情况
                            this.$vux.toast.text('发送失败，请稍后重试！');
                            break;
                    }
                });

            },
            clearPhone(){
                this.telephone='';
            },
            clearPassword(){
                this.password='';
            },
        }
    }
</script>
<style scoped>
    .sendCode{
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
    .active{
        background-color: rgba(0,0,0,0.1);
    }
</style>