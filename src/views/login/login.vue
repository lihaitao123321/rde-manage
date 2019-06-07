<template>
    <div class="t_page">
        <x-header>登陆</x-header>
        <div class="t_content">
            <group>
                <x-input
                        title="手机号码"
                        mask="999 9999 9999"
                        v-model="phone"
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
                phone:'',
                password:'',
                menus: {
                    menu1: 'Take Photo',
                    menu2: 'Choose from photos'
                },
                showMenus: false
            }
        },
        methods:{
            login(){
                this.$router.push({path: '/home'});
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