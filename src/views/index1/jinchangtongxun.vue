<template>
    <div class="t_page">
        <XHeader
                fixed
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
                title="近场通讯"
        ></XHeader>
        <div class="aboutUs">
            功能开发中
        </div>
    </div>
</template>

<script>
    import { XHeader, XButton } from "vux";

    export default {
        components: {
            XHeader,
            XButton
        },
        data() {
            return {};
        }
    };
</script>

<style lang="less" scoped>
    /deep/ .vux-header .vux-header-right {
        top: 7px;
    }

    /deep/ .vux-header .vux-header-title {
        font-weight: 500;
    }

    .t_page {
        background-color: #ffffffff;
        .vux-header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            padding: 3px 0;
            background-color: white;
        }
        .aboutUs {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding-top: 50px;
            overflow-y: auto;
        }
    }
</style>
