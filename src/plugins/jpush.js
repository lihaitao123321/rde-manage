const jPush = {
    config:{
        registrationId:''
    },
    init: function () {
        document.addEventListener('jpush.receiveRegistrationId', function (event) {
            console.log(event.registrationId)
            jPush.config.registrationId=event.registrationId;
        }, false);
        window.JPush.init();
        window.JPush.setDebugMode(true);

    },
    stopPush:function(){
        window.JPush.stopPush();
    },
    resumePush:function(){
        window.JPush.resumePush();
    },
    isPushStopped(callback){
        window.JPush.isPushStopped(callback);
    },
    getRegistrationID:function(callback){
        window.JPush.getRegistrationID(callback);
    },
    openNotification(){
        document.addEventListener("jpush.openNotification", function (event) {
            var alertContent
            if(device.platform == "Android") {
                alertContent = event.alert
            } else {
                alertContent = event.aps.alert
            }
        }, false)
    },
    receiveNotification(){
        document.addEventListener("jpush.receiveNotification", function (event) {
            var alertContent
            if(device.platform == "Android") {
                alertContent = event.alert
            } else {
                alertContent = event.aps.alert
            }
            alert("open Notification:" + alertContent)
        }, false)
    },
    receiveMessage(){
        document.addEventListener("jpush.receiveMessage", function (event) {
            var message
            if(device.platform == "Android") {
                message = event.message;
            } else {
                message = event.content;
            }
        }, false)
    }
};
export default jPush;