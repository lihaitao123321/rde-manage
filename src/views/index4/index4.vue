<template>
    <div class="t_page">
        <div class="aboutUs">
            <img src="../../assets/images/public/developing.png">
            <div class="text">
                功能开发中，敬请期待...
            </div>
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
            flex-direction: column;
            align-items: center;
            img{
                width: 100%;
                margin-top: 100px;
            }
            .text{
                font-size:14px;
                font-family:PingFang SC;
                font-weight:500;
                color:#999999;
                margin-top: 30px;
            }
        }
    }
</style>
