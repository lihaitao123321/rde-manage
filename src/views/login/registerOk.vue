<template>
    <div class="t_page">
        <x-header>{{$t('registerOk.title')}}</x-header>
        <div class="t_content">
            <div class="success_icon">
                <img style="height: 100px;width: 100px" src="../../assets/images/login/resisterSuccess@2x.png">
            </div>
            <div class="success">{{$t('registerOk.success')}}</div>
            <div class="success">{{$t('registerOk.successNext')}}</div>
            <div class="desc">{{$t('registerOk.desc')}}</div>
            <x-button type="primary" @click.native="">{{$t('registerOk.ok')}}</x-button>
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
                this.phone='';
            },
            clearPassword(){
                this.password='';
            },
        }
    }
</script>
<style lang="less" scoped>
    /deep/.t_content {
        padding: 40px 30px;
    }
    .ok{
        font-size: 18px;
        font-weight: 600;
    }
    .success{
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
        font-family: PingFang-SC-Bold;
        color: rgba(0, 0, 0, 1);
    }
    .success_icon{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 180px;
    }
    /deep/.weui-btn_primary{
        background-color: rgba(43, 127, 243, 1);
        border-radius: 30px;
    }
    .desc{
        text-align: center;
        margin-top: 20px;
        margin-bottom: 40px;
        font-size: 13px;
        color: #666666;
    }
</style>