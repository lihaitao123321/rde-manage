import { Toast } from 'vux'
export default {
    checkApp(packageName, yes, no) {
        window.appAvailability.check(packageName, yes, no);
    },
    openAmap(originLat, originLng, originName, destinationLat, destinationLng, destinationName) {
        if (window.device && window.device.platform=='iOS') {
            // this.hasIosPackage(originLat, originLng, originName, destinationLat, destinationLng, destinationName);
            this.checkApp('iosamap://', () => this.hasIosPackage(originLat, originLng, originName, destinationLat, destinationLng, destinationName), this.notIosPackage);
        } else {
            this.checkApp('com.autonavi.minimap', () => this.hasAndroidPackage(originLat, originLng, originName, destinationLat, destinationLng, destinationName), this.notAndroidPackage);
        }
    },
    hasAndroidPackage(originLat, originLng, originName, destinationLat, destinationLng, destinationName) { // 存在对应APP  
        let sApp = window.startApp.set({ //跳转对应APP
            "action": "ACTION_VIEW",
            "category": "CATEGORY_DEFAULT",
            "type": "text/css",
            "package": "com.autonavi.minimap",
            "uri": "amapuri://route/plan/?slat=" + originLat + "&slon=" + originLng + "&sname=" + originName + "&dlat=" + destinationLat + "&dlon=" + destinationLng + "&dname=" + destinationName + "&dev=0&t=0&did=BGVIS2",
            "flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
            "intentstart": "startActivity"
        });
        sApp.start(function () { //跳转成功
        }, function (error) { //失败 
        });
    },
    notAndroidPackage(res) { // 不存在对应APP
        Toast('请下载高德地图');
    },
    hasIosPackage(originLat, originLng, originName, destinationLat, destinationLng, destinationName) { // 存在对应APP  
        let sApp = document.createElement('a');
        sApp.href=`iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat=${originLat}&slon=${originLng}&sname=${originName}&did=BGVIS2&dlat=${destinationLat}&dlon=${destinationLng}&dname=${destinationName}&dev=0&t=0`
        try {
            sApp.click();
        }catch (e) {
            Toast('请先安装高德地图APP');
        }

        // let sApp = window.startApp.set(`iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat=${originLat}&slon=${originLng}&sname=${originName}&did=BGVIS2&dlat=${destinationLat}&dlon=${destinationLng}&dname=${destinationName}&dev=0&t=0`);
        // sApp.start(function () {
        //     alert("OK");
        // }, function (error) {
        //     alert(error);
        // });
    },
    notIosPackage() { // 不存在对应APP 
        Toast('请请先安装高德地图APP');
    }
};