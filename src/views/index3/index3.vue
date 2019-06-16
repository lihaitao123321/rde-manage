<template>
    <baidu-map class="baidu" :center="center" :zoom="zoom" @ready="ready" ak="bLH7rG3fQ75DhH6dLkjhQbD7LV3rsmM7"></baidu-map>
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
            ready ({BMap, map}) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
            }
        }
    }
</script>
<style>
    .baidu{
        width: 100%;
        height: 100%;
    }
</style>