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
            this.setPermissions()
        },
        methods:{
            //安卓提前请求定位权限
            setPermissions() {
                if (window.device && window.device.platform === 'Android') {
                    let permissions = cordova.plugins.permissions;
                    //申请安卓权限
                    permissions.requestPermissions(
                        [
                            permissions.ACCESS_FINE_LOCATION,
                            permissions.READ_EXTERNAL_STORAGE,
                            permissions.READ_PHONE_STATE
                        ],
                        res => {},
                        err => {}
                    );

                    // //GPS定位权限
                    // permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, status => {
                    //     if (!status.hasPermission) {
                    //         permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, res => {
                    //         }, err => {
                    //         });
                    //     } else {
                    //     }
                    // });
                    // //储存权限
                    // permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, status => {
                    //     if (!status.hasPermission) {
                    //         permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, res => {
                    //         }, err => {
                    //         });
                    //     } else {
                    //     }
                    // });
                    // //运营商信息
                    // permissions.checkPermission(permissions.ACCESS_NETWORK_STATE, status => {
                    //     if (!status.hasPermission) {
                    //         permissions.requestPermission(permissions.ACCESS_NETWORK_STATE, res => {
                    //         }, err => {
                    //         });
                    //     } else {
                    //     }
                    // });
                }
            },
            init() {
                if (!window.device) {
                    return false;
                }
                try {
                    //监听物理键返回
                    let backClick = 0;// 退出点击次数，默认为0
                    let time = new Date(); // 2s内再次点击就退出
                    document.addEventListener("backbutton", () => {
                        let url = location.href.split('/');
                        let page = url[url.length - 1];
                        if (page === 'home' || page === 'index1' || page === 'index2' || page === 'index3' || page === 'index4' || page === 'index5' || page === 'login') {
                            //拦截扫码页面返回
                            if (backClick) {  // 不为0时
                                navigator.app.exitApp();  // app退出
                            } else {
                                this.$toast('再次点击退出应用');
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

                    // //从后台切回到前台监听
                    // document.addEventListener("resume", () => {
                    //     jpushModel.resetBadge();
                    // }, false);
                    // //初始化极光插件
                    // jpushModel.init();
                } catch (exception) {
                    console.log(exception);
                }
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
