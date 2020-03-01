<style scoped>
    .child-view {
        transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    /*.keep-alive-position {*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    top: 0;*/
    /*    width: 100%;*/
    /*    transition: all .3s cubic-bezier(.55, 0, .1, 1);*/
    /*}*/
    /*.slide-left-enter, .slide-right-leave-active {*/
    /*    opacity: 0;*/
    /*    -webkit-transform: translate(100%, 0);*/
    /*    transform: translate(100%, 0);*/
    /*}*/

    /*.slide-left-leave-active, .slide-right-enter {*/
    /*    opacity: 0;*/
    /*    -webkit-transform: translate(-100%, 0);*/
    /*    transform: translate(-100%, 0);*/
    /*}*/
</style>
<template>
    <div id="app" @touchstart.stop>
        <transition :name="transitionName">
            <!-- 这里是会被缓存的视图组件，比如 home！ -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class="child-view" @touchstart.stop></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <!-- 这里是不被缓存的视图组件，比如 login！ -->
            <router-view v-if="!$route.meta.keepAlive" class="child-view" @touchstart.stop></router-view>
        </transition>
    </div>
</template>
<script>
    //导入极光推送
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
                    //注册极光
                    document.addEventListener('jpush.receiveRegistrationId', function (event) {
                        console.log(event.registrationId)
                    }, false);
                    window.JPush.init();
                    window.JPush.setDebugMode(true);
                    window.JPush.getRegistrationID(function(rId) {
                        console.log("JPushPlugin:registrationID is " + rId)
                    })

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