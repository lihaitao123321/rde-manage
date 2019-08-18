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
                            <input placeholder="搜索电站" readonly @click="openSearchPage"/>
                        </div>
                    </div>
                </div>
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
                // flex-grow: 1;
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

        .baidu {
            width: 100%;
            height: 100%;
        }
    }
</style>