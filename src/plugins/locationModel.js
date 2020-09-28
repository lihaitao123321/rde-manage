import store from '../store';
export default {
    getCurrentLocation(cb){
        if(window.device){
            let obj={
                androidOption:{
                    locationMode:1,//定位精度 1.精确定位 2.仅设备定位模式；3.低功耗定位模式
                    gpsFirst:false,//设置是否gps优先，只在高精度模式下有效。默认关闭
                    HttpTimeOut:30000,//设置网络请求超时时间。默认为30秒。在仅设备模式下无效
                    interval:2000,//设置定位间隔。默认为2秒 连续定位有效
                    needAddress:true,//设置是否返回逆地理地址信息。默认是true
                    onceLocation:false,//设置是否单次定位。默认是false
                    onceLocationLatest:false,//设置是否等待wifi刷新，默认为false.如果设置为true,会自动变为单次定位，持续定位时不要使用
                    locationProtocol:1,// 设置网络请求的协议。可选HTTP或者HTTPS。默认为HTTP。1.http 2.https
                    sensorEnable:false,//设置是否使用传感器。默认是false
                    wifiScan:true,//设置是否开启wifi扫描。默认为true，如果设置为false会同时停止主动刷新，停止以后完全依赖于系统刷新，定位位置可能存在误差
                    locationCacheEnable:true//设置是否使用缓存定位，默认为true
                },
                iosOption:{
                    desiredAccuracy:4,// 1。最适合导航用的定位  iOS4.0以后新增 2.精度最高的定位 3.定位精度在10米以内定位精度在10米以内 4.定位精度在100米以内 5.定位精度在1000米以内 6.3000m
                    pausesLocationUpdatesAutomatically:"YES",//指定定位是否会被系统自动暂停。默认为NO。
                    allowsBackgroundLocationUpdates:"NO",//是否允许后台定位。默认为NO。只在iOS 9.0及之后起作用。设置为YES的时候必须保证 Background Modes 中的 Location updates 处于选中状态，否则会抛出异常。由于iOS系统限制，需要在定位未开始之前或定位停止之后，修改该属性的值才会有效果。
                    locationTimeout:10, //指定单次定位超时时间,默认为10s。最小值是2s。注意单次定位请求前设置。注意: 单次定位超时时间从确定了定位权限(非kCLAuthorizationStatusNotDetermined状态)后开始计算
                    reGeocodeTimeout:5, //指定单次定位逆地理超时时间,默认为5s。最小值是2s。注意单次定位请求前设置。
                    locatingWithReGeocode:"YES" //是否 启用逆地址定位 默认YES
                }
            };
            //兼容android第一次打开地图，权限未获取卡住情况
            function getLocation(){
                window.GaoDe.getCurrentPosition(locationInfo=> {
                    if(locationInfo.longitude){
                        localStorage.setItem('isFirstOpenMap','1')
                        let center =[locationInfo.longitude,locationInfo.latitude];
                        cb(center);
                    }else{
                        cb(false);
                    }
                },  (err) => {
                    cb(false);
                },obj);
            }
            getLocation();
            let timer = setInterval(()=>{
                let isFirstOpenMap = localStorage.getItem('isFirstOpenMap');
                if(!isFirstOpenMap){
                    getLocation();
                }else{
                    clearInterval(timer)
                }
            },5000);
        }
        //浏览器定位
        else{
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(14, 130),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            //返回定位信息
            AMap.event.addListener(geolocation, 'complete', async res => {
                let center = [res.position.lng, res.position.lat];
                cb(center);
            });
            //返回定位出错信息
            AMap.event.addListener(geolocation, 'error', err => {
                cb(false);
            });
            geolocation.getCurrentPosition();
        }
    }
}
