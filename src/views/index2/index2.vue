<style>
    #allmap{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div id="allmap">

    </div>
</template>

<script>
    import { VChart, VGuide, VLine, VArea, VScale } from 'vux'

    export default {
        components: {
            VChart,
            VGuide,
            VArea,
            VLine,
            VScale
        },
        data () {
            return {

            }
        },
        mounted(){
            //创建实例
            var map = new BMap.Map("allmap");
            //创建坐标点
            var point = new BMap.Point(121.126,31.296);
            //初始化实例，传入坐标点并设置地图级别
            map.centerAndZoom(point,15);
            map.enableScrollWheelZoom(true);
        },
    }
</script>

