<template>
    <div id="app">
        <keep-alive>
            <transition :name="transitionName">
                <router-view class="keep-alive-position"></router-view>
            </transition>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                transitionName: 'slide-left'
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                document.addEventListener("deviceready",  ()=> {
                    let backClick = 0;// 退出点击次数，默认为0
                    let time = new Date(); // 2s内再次点击就退出
                    document.addEventListener("backbutton",  ()=> {
                        //关闭所有弹框
                        let node = document.getElementById('popListViewBox');
                        if (node) node.parentNode.removeChild(node);
                        let url = location.href.split('/');
                        let page = url[url.length - 1];
                        if (page === 'home' || page === 'login') {
                            if (backClick) {  // 不为0时
                                navigator.app.exitApp();  // app退出
                            } else {
                                this.$vux.toast.text('再次点击退出App');
                                if (new Date() - time < 2000) {// 小于2s,退出程序
                                    backClick++;
                                } else {   // 大于2s，重置时间戳，
                                    time = new Date();
                                }
                            }
                        } else {
                            window.history.back();
                        }
                    }, false);
                }, false);
            }
        },
        watch: {
            '$route'(to, from) {
                let isBack = this.$router.isBack;
                this.$router.isBack = false;
                if (isBack) {
                    this.transitionName = 'slide-right';
                } else {
                    this.transitionName = 'slide-left';
                }
            }
        }
    }
</script>