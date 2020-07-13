import store from '../store';
export default {
    //初始化 配置
    init(){
        if(window.device){
            GaodeLocation.configLocation({
                appName: '国訾云物联',
                android: {
                    locationMode: 1
                },
                ios: {
                    accuracy: 1,
                    locationTimeout: 10
                }
            },  successMsg => {
            });
        }
    },
    getCurrentLocation(cb){
        if(window.device){
            window.GaoDe.getCurrentPosition(locationInfo=> {
                if(locationInfo.longitude){
                    let center =[locationInfo.longitude,locationInfo.latitude];
                    cb(center);
                }else{
                    cb(false);
                }
            }, function (err) {
                cb(false);
            },{
                androidOption:{
                    locationMode: 1,
                    gpsFirst:true
                },
                iosOption:{
                    accuracy: 1,
                    locationTimeout: 10
                }
            });
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
                console.log('complete',res);
                let center = [res.position.lng, res.position.lat];
                cb(center);
            });
            //返回定位出错信息
            AMap.event.addListener(geolocation, 'error', err => {
                console.log('error',err);
                cb(false);
            });
            geolocation.getCurrentPosition();
        }
    }
}
