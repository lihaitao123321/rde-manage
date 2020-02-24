import Tools from '../util/Tools';

const jPush = {
    config: {
        registrationId: ''
    },
    init: function () {
        try {
            this.onReceiveRegistrationId();
            window.JPush.init();
            this.resetBadge();
        } catch (exception) {
            console.log(exception);
        }
    },
    //监听极光注册id成功
    onReceiveRegistrationId() {
        document.addEventListener("jpush.receiveRegistrationId", event => {
            console.log("receiveRegistrationId" + JSON.stringify(event));
            localStorage.setItem('registrationId', event.registrationId);
        }, false);
    },
    stopPush: function () {
        window.JPush.stopPush();
    },
    resumePush: function () {
        window.JPush.resumePush();
    },
    isPushStopped(callback) {
        window.JPush.isPushStopped(callback);
    },
    resetBadge(){
        if (window.device.platform !== 'Android') {
            window.JPush.resetBadge();
            window.JPush.setApplicationIconBadgeNumber(0);
        }
    },
    //用户点击了通知栏
    openNotification(cb) {
        document.addEventListener("jpush.openNotification", function (event) {
            console.log(event);
            cb(event);
        }, false)
    },
    //收到消息
    onReceiveNotification(cb) {
        document.addEventListener("jpush.receiveNotification", function (event) {
            console.log(event);
            cb(event);
        }, false)
    },
    receiveMessage(cb) {
        document.addEventListener("jpush.receiveMessage", function (event) {
            console.log(event);
            cb(event);
        }, false)
    }
};
export default jPush;