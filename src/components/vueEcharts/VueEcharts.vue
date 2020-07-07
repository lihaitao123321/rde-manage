<template>
    <van-row>
        <van-col span="24" v-if="empty" class="empty">
            暂无数据
        </van-col>
        <van-col span="24" v-else>
            <v-chart ref="charts" :options="options" autoresize @click="e=>this.$emit('click', e)"/>
        </van-col>
    </van-row>
</template>
<script>
    export default {
        name: 'vueEcharts',
        props: {
            options: {
                type: Object,
            },
            empty: {
                type: Boolean
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/style/var";
    @import "../../../assets/style/common";

    .bar-container {
        position: relative;
        background: @light-bgcolor;
        overflow-x: hidden;

        &:after {
            position: absolute;
            top: 41px;
            left: 0;
            right: 0;
            content: ' ';
            display: block;
            height: 1px;
            background: #1E212B;
        }
    }

    .time-dimensions {
        padding: 10px 0;
        color: @dark-text-color;
        font-size: @block-sub-content-size;

        .van-col {
            transition: color .3s;
        }

        .active {
            font-size: @block-filters-active-text-size;
            color: @active-color;
        }
    }

    .echarts {
        width: 100%;
        height: 260px;
    }

    .empty {
        margin: 50px 0;
        color: @dark-tab-color;
    }

    .fields-container {
        padding: 10px 0;
        max-height: 220px;
        -webkit-overflow-scrolling: touch;

        .van-row {
            transition: color .3s;
        }

        .field {
            float: right;
            width: 100%;
            margin: 8px 0;
            padding: 6px 0;
            color: @dark-tab-color;
            font-size: @block-filters-text-size;
            border-radius: 2px;
            transition: color .3s, background .3s;

            &.active {
                background: @selected-text-bgcolor;
                color: @selected-light-text-color;
            }
        }
    }
</style>
