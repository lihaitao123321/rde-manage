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