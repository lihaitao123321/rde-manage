<template>
    <div class="t_page">
        <x-header
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
        >注册
        </x-header>
        <div class="t_content">
            <group label-width="80px">
                <x-input
                        title="真实姓名"
                        v-model="username"
                        @on-click-clear-icon="clearPhone"
                ></x-input>
                <x-input
                        title="用户名"
                        v-model="nickname"
                        @on-click-clear-icon="clearNickname"
                ></x-input>
                <x-input
                        type="password"
                        title="登陆密码"
                        placeholder="4~20位字母、数字、 _的组合"
                        v-model="password"
                        @on-click-clear-icon="clearPassword"
                ></x-input>
                <button-tab v-model="registerType">
                    <button-tab-item @on-item-click="consoleIndex()">{{ 666 }}</button-tab-item>
                    <button-tab-item @on-item-click="consoleIndex()">{{ 888 }}</button-tab-item>
                </button-tab>


                <x-input
                        title="手机号码"
                        v-model="telephone"
                        is-type="china-mobile"
                        @on-click-clear-icon="clearPhone"
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
                    <x-button type="primary" @click.native="register">注册</x-button>
                </div>
            </group>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
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
    } from 'vux'
    import encrypt from '../../util/jsencrypt'

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
                username: '李海涛',
                nickname:'Dolphin',
                telephone: '17630378060',
                password: '123321',
                code: '',
                codeText: '获取验证码',
                sending: false,
                menus: {
                    menu1: 'Take Photo',
                    menu2: 'Choose from photos'
                },
                showMenus: false,
                registerType:1
            }
        },
        methods: {
            consoleIndex(){

            },
            sendCode() {
                if (this.sending) {
                    return false;
                }
                if (!this.Tools.RegExp.Phone.test(this.telephone)) {
                    this.$vux.toast.text('请输入正确的手机号码');
                    return false;
                }
                this.sending = true;
                let n = 120;
                this.codeText = '再次获取(' + n + 's)';
                let timer = setInterval(() => {
                    if (n === 0) {
                        this.sending = false;
                        this.codeText = '获取验证码';
                        clearInterval(timer);
                    } else {
                        this.codeText = '再次获取(' + n + 's)';
                        n--;
                    }
                }, 1000);
                this.Tools.ajax({
                    method: '/sendregistermsg',
                    data: {
                        "telephone": this.telephone
                    }
                }).then(res => {
                    console.log(res)
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
            register() {
                if (!this.username) {
                    this.$vux.toast.text('请输入用户名');
                    return false;
                }
                if (!this.Tools.RegExp.Phone.test(this.telephone)) {
                    this.$vux.toast.text('请输入正确的手机号码');
                    return false;
                }
                if (!this.Tools.RegExp.password.test(this.password)) {
                    this.$vux.toast.text('请输入正确的密码，4~20位字母、数字、 _的组合');
                    return false;
                }
                if (!this.code) {
                    this.$vux.toast.text('验证码不能为空');
                    return false;
                }
                this.Tools.ajax({
                    method: '/register',
                    headers : {
                        'Content-type': 'application/json'
                    },
                    data: {
                        "username": this.username.trim(),
                        "telephone": this.telephone.trim(),
                        "passwd": encrypt.encrypt(this.password),
                        "code": this.code.trim()
                    }
                }).then(res => {
                    switch (res.status) {
                        case '0':
                            // 注册成功
                            this.$vux.toast.text('注册成功');
                            setTimeout(() => {
                                this.$router.goBack();
                            }, 1500);
                            break;
                        case '2':
                            this.$vux.toast.text('验证码错误');
                            break;
                        case '3':
                            this.$vux.toast.text('验证码过期');
                            break;
                        case '4':
                            this.$vux.toast.text('用户已存在');
                            break;
                        default:
                            // 1：失败 或者其他情况
                            this.$vux.toast.text('注册失败，请重试');
                            break;
                    }
                });

            },
            clearPhone() {
                this.telephone = '';
            },
            clearNickname(){
                this.nickname = '';
            },
            clearPassword() {
                this.password = '';
            },
        }
    }
</script>
<style scoped>
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