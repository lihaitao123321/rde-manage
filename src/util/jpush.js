const jPush = {
    config:{
        registrationId:''
    },
    init: function () {
        console.log(window.JPush)
        document.addEventListener('jpush.receiveRegistrationId', function (event) {
            console.log(event.registrationId)
            jPush.config.registrationId=event.registrationId;
        }, false);
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
    }
};
export default jPush;