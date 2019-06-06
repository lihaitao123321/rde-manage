<template>
    <div id="app">
        <keep-alive>
            <transition :name="transitionName">
                <router-view class="child-view"></router-view>
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
<style scoped>
    .child-view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
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
</style>