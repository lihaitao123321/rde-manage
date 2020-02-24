import Tools from '../util/Tools';
export default {
    async init () {
        try {
            let localVersion = this.getLocalVersion();
            let newVersion=0;
            let downloadUrl=0;
            let newVersionInfo = this.getNewVersionInfo();
            if (newVersionInfo.code === 200) {
                newVersion = newVersionInfo.data.version;
                downloadUrl = newVersionInfo.data.url;
            }
            if(newVersion>localVersion){

            }
        } catch (exception) {
            alert(exception);
        }
    },
    //获取本地版本号
    getLocalVersion() {
        return window.cordova.getAppVersion.getVersionNumber();
    },
    //获取线上版本信息
    getNewVersionInfo(){
        return Tools.ajax({
            method: '/app/masterdata/appversion/getNewOne',
            data: {}
        });
    },
    update() {
        if(window.device.platform==='iOS'){
            this.$toast.fail('请到appstore更新');
            return false;
        }
        let fileTransfer = new window.FileTransfer();
        let uri = encodeURI(this.versionInfo.url);
        // let fileURL = 'cdvfile://localhost/temporary/tuner.apk';
        let fileURL = 'cdvfile://localhost/temporary/path/to/tuner.apk';

        // fileTransfer.onprogress(res=>{
        //     if(res.lengthComputable){
        //         percentage = res.loaded / res.total * 100;
        //     }
        // });
        fileTransfer.download(
            uri, fileURL, entry => {
                console.log('entry',entry);
                this.t_loading.hide();
                cordova.plugins.fileOpener2.open(
                    fileURL,
                    'application/vnd.android.package-archive',
                    {
                        error : function(e) {
                            console.log('Error: ' + e);
                        },
                        success : function () {
                            console.log('file opened successfully');
                        }
                    }
                );
            },
            error => {
                console.log('error',error);
                this.t_loading.hide();
            },
            false, {}
        )
    },
};
