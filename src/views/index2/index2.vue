<template>
    <div class="t_page">
        <div class="search-header">
            <div class="back-icon" @click='$router.goBack()'>
                <img style="height: 100%;width: 100%" src="../../assets/images/index2/返回图标@2x.png">
            </div>
            <div class="search">
                <div class="input_warp">
                    <div class="left_search_icon">
                        <i class="el-icon-search"></i>
                    </div>
                    <div class="search_content">
                        <input placeholder="搜索电站" readonly @click="openSearchPage" />
                    </div>
                </div>
            </div>
           
        </div>
        <div class="left">
            <div class="blue">595</div>
            <div class="text">项目数</div>

            <div class="blue">65610</div>
            <div class="text">设备数</div>

            <div class="blue" style="color: #1ACC83FF;">100%</div>
            <div class="text">在线率</div>

            <div class="blue">89%</div>
            <div class="text">运行率</div>

            <div class="blue" style="color:#D22642FF;">5%</div>
            <div class="text">报警率</div>
        </div>
        <baidu-map class="baidu" :center="center" :zoom="zoom" @ready="ready" ak="bLH7rG3fQ75DhH6dLkjhQbD7LV3rsmM7"></baidu-map>
    </div>
    
</template>
<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    export default {
        components: {
            BaiduMap
        },
        data () {
            return {
                center: {lng: 0, lat: 0},
                zoom: 3
            }
        },
        methods: {
            openSearchPage() {
                this.$router.push('searchMap');
            },
            ready ({BMap, map}) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
            }
        }
    }
</script>
<style lang="less" scoped>
    .t_page {
        .search-header {
            display: flex;
            align-items: center;
            position: absolute;
            z-index:1;
            top: 10px;
            left: 0;
            width: 100%;
            height: 50px;

            .back-icon {
                height: 40px;
                width: 40px;
                margin: 10px;
            }

            .search {
                display: flex;
                align-items: center;
                /* flex-grow: 1; */
                height: 50px;
                width: 80%;

                .input_warp {
                    display: flex;
                    width: 100%;
                    height: 38px;
                    background: #FFFFFF;
                    border-radius: 30px;

                    .left_search_icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 100%;
                        border-radius: 30px;

                        i {
                            font-size: 18px;
                            color: #999999FF;
                        }
                    }

                    .search_content {
                        flex-grow: 1;

                        input {
                            width: 100%;
                            height: 100%;
                            background: none;
                            border: none;
                            outline: none;
                            color: white;
                        }

                        input::placeholder {
                            font-size: 14px;
                            color: #999999FF;
                        }
                    }
                }
            }
        }
        .left {
            position: absolute;
    z-index: 1;
    top: 90px;
    left: 10px;
    width: 80px;
    height: 326px;
    background-color: #FFFFFF;
    border-radius: 5px;
    text-align: center;
    .text{
        color: #888888FF;
    font-size: 12px;
    padding-bottom: 12px;
    margin: 0 14px;
    border-bottom: 1px solid #E8E8EBFF;
    }
    .blue {
        color: #2B7FF2FF;
        font-size:19px;
        font-weight:700;
        margin-top:10px;
    }
        }
        .baidu {
            width: 100%;
            height: 100%;
        }
    }
</style>