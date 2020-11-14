import Vue from 'vue';
import axios from 'axios';
const Qs = require('qs');
import router from '../router';
import store from '@/store';
import config from '../config';
//测试
let isTest = false;
//上线
// let isTest= false;
export default {
    codeMessage: {
        0: '服务器未响应！',
        200: '服务器成功返回请求的数据',
        201: '新建或修改数据成功',
        202: '一个请求已经进入后台排队（异步任务）',
        204: '删除数据成功',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
        401: '用户没有权限（令牌、用户名、密码错误）',
        403: '用户得到授权，但是访问是被禁止的',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
        406: '请求的格式不可得',
        410: '请求的资源被永久删除，且不会再得到的',
        422: '当创建一个对象时，发生一个验证错误',
        500: '服务器发生错误，请检查服务器',
        502: '网关错误',
        503: '服务不可用，服务器暂时过载或维护',
        504: '网关超时'
    },
    //通用接口
    ajax: function (obj) {
        let userToken = localStorage.getItem('userToken');
        let token = '';
        if (userToken) {
            // token = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMTZhYjNjMTdlNTA4ODM3OTQxYjY5YmQ1ODBkMDA0NSIsImF1dGgiOiJST0xFX0FOT05ZTU9VUyIsIlVTRVJUWVBFIjowLCJjb21wIjoiIiwiZXhwIjoxNTgyNTQ3MjA5fQ.9GaoVeCSgdbq4--etqieHriRv0t3B5uYYZtQampq84PcJMeWVir4k-G00eV6HY4CsOaiP7zPX-EzsU36TMqJ-A`;
            token = userToken;
        }
        let defaultHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            // Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
            Authorization: token,
            // "blade-auth": token
        };
        if (obj.headers) {
            for (let key in obj.headers) {
                if (obj.headers.hasOwnProperty(key)) {
                    defaultHeaders[key] = obj.headers[key];
                }
            }
        }
        // 配置默认值
        const service = axios.create({
            baseURL: process.env.NODE_ENV === 'production' ? config.baseUrl : '',
            url: '',
            method: 'post',
            timeout: 30000,
            responseType: 'json',
            headers: defaultHeaders
        });
        // 请求拦截器
        service.interceptors.request.use(config => {
            if (obj.type) {
                config.method = obj.type;
            }
            config.url = obj.method;
            return config;
        }, error => {
            // 请求错误
        });
        //响应拦截器
        service.interceptors.response.use(response => {
            if(response.data){
                if (response.data.status === 401 || response.data.code === 401) {
                    router.push('/login');
                }
                return response.data;
            }else{
                return {status:-1,msg:'系统错误请稍后再试'};
            }
        }, error => {
            if(error.response.status === 401){
                router.push('/login');
            }
            // 请求错误
            return {};
        });
        let postData = obj.data;
        // if(obj.headers && obj.headers['Content-type']){
        //     postData=JSON.stringify(obj.data);
        // }else{
        //     postData = Qs.stringify(obj.data);
        // }
        return service({
            data: postData
        });
    },
    uploadFile(fileUrl, fileName) {
        return new Promise(resolve => {
            let options = new FileUploadOptions();
            options.fileKey = "file";
            //获取后缀，用于生成图片时用
            let point = fileUrl.lastIndexOf(".");
            let type = fileUrl.substring(point+1);
            options.fileName = fileName || new Date().getTime().toString();
            options.mimeType = "text/plain";
            let loginInfo = localStorage.getItem('loginInfo');
            let token = 'bearer ' + JSON.parse(loginInfo).token;
            options.headers = {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": "multipart/form-data",
                "Authorization": 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
                "blade-auth": token
            };
            //上传附带参数,图片类型
            let params = {};
            params.type = type;
            options.params = params;
            //设置提交方式，可以修改，修改方式如上
            options.httpMethod = "POST";
            let ft = new FileTransfer();
            alert(JSON.stringify(fileUrl))
            ft.upload(fileUrl, encodeURI('https://chargeapi.de-vo.cn/app/user/uploadImg'), res => {
                resolve(res);
            }, err => {
                resolve(err);
            }, options);
        });
    },
    //获取url传参集合
    getQuery() {
        let url = location.search;
        let theRequest = {};
        if (url.indexOf("?") !== -1) {
            let str = url.substr(1);
            let strList = str.split("&");
            for (let i = 0; i < strList.length; i++) {
                theRequest[strList[i].split("=")[0]] = unescape(strList[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    //获取url传参集合
    getDecodeQuery() {
        let url = location.search;
        let theRequest = '';
        if (url.indexOf("?") !== -1) {
            let str = url.substr(1);
            let strList = str.split("&");
            for (let i = 0; i < strList.length; i++) {
                if (strList[i].split("=")[0] === 'query') {
                    theRequest = strList[i].split("=")[1];
                    break;
                }
            }
        }
        if (theRequest) {
            return JSON.parse(decodeURIComponent(theRequest));
        } else {
            return {};
        }
    },
    IsPC() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    isAndroid() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["iPhone"];
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                return true;
            }
        }
        return false;
    },
    isIos() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPad", "iPod"];
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                return true;
            }
        }
        return false;
    },
    //合并json对象
    extend(json1, json2) {
        for (let key in json2) {
            json1[key] = json2[key];
        }
        return json1;
    },
    //日志打印
    log(content) {
        if (this.config.isTest) {
            console.log(content)
        }
    },
    //时间
    Date: {
        //获取距离今天的时间,num-天数，reType-返回类型
        getDayDistanceToToday(num, reType) {
            let date = new Date(new Date().getTime() + num * 24 * 60 * 60 * 1000);
            if(reType){
                return this.TimeFormat(date.getTime(), reType);
            }else{
                return date;
            }
             //后一天
        },
        //获取距离某天的时间,time-某天，num-天数，reType-返回类型
        getDateDistanceToOneDay(time, num, reType) {
            let date = new Date(new Date(time).getTime() + num * 24 * 60 * 60 * 1000).getTime();
            return this.TimeFormat(date, reType); //后一天
        },
        //获取相差分钟的时间,time-某时间，num-分钟数，reType-返回类型
        getDateDistanceToOneTimeByMinute(time, num, reType) {
            let date = new Date(new Date(time).getTime() + num *  60 * 1000);
            if(reType){
                return this.TimeFormat(date, reType);
            }else{
                return date;
            }
        },
        checkPost(row, column) {
            for (let i = 0; i < column.length; i++) {
                if (column.required && !row[column[i].key]) {
                    return false;
                }
            }
            return true;
        },
        //格式化时间
        /**
         * @return {string}
         */
        TimeFormat(time, id) {
            if (!time || !id) {
                return '';
            }
            //y=年;ymd=年月日;ymdhm年月日时分;ymdhms年月日时分秒
            let datetime = new Date(time);
            //datetime.setTime(time);
            let year = datetime.getFullYear();
            let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            let month2 = datetime.getMonth() + 1 < 10 ? datetime.getMonth() + 1 : datetime.getMonth() + 1;
            let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            let date2 = datetime.getDate() < 10 ? datetime.getDate() : datetime.getDate();
            let hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            let minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            let second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            year = year + '';
            month = month + '';
            month2 = month2 + '';
            date = date + '';
            date2 = date2 + '';
            hour = hour + '';
            minute = minute + '';
            second = second + '';
            if (id == "y") {
                return year;
            } else if (id == "ym") {
                return year + "-" + month;
            } else if (id == "ymd") {
                return year + "-" + month + "-" + date;
            } else if (id == "ymd2") {
                return year + "年" + month + "月" + date + "日";
            } else if (id == "ymd3") {
                return year + "" + month + "" + date;
            } else if (id == "ymdhm") {
                return year + "-" + month + "-" + date + " " + hour + ":" + minute;
            } else if (id == "ymdhms") {
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
            } else if (id == "ymdhms2") {
                return year + "" + month + "" + date + "" + hour + "" + minute + "" + second;
            } else if (id == "mdhms") {
                return month + "-" + date + " " + hour + ":" + minute + ":" + second;
            } else if (id == "md") {
                return month + "-" + date;
            } else if (id == "hm") {
                return hour + ":" + minute;
            } else if (id == "xs") {
                return hour + ":" + hour;
            } else if (id == "md2") {
                return month2 + "月" + date2 + "日";
            } else if (!id) {
                return year + "-" + month + "-" + date;
            } else if (id == "mdhm") {
                return month + "-" + date + " " + hour + ":" + minute;
            } else if (id == "md3") {
                //仿微信
                return "<span>" + month2 + "  </span><span style='font-size:.7em;'>" + date2 + "日</span>";
            } else if (id == "rf") {
                return year + '' + month + '' + date + '' + hour + '' + minute + '' + second;
            }
        }
    },
    //打印,param-打印模板接口返回的html数据
    print(param) {
        let data = param.replace(/<body /g, '<body onLoad="self.print();self.close();" ');
        let newWin = window.open('', '', '');
        if (newWin == null) {
            this.$Message.info("要使用打印功能，请在浏览器设置中允许本站点弹出窗口！");
        } else {
            newWin.document.open();
            newWin.document.write(data);
            newWin.document.close();
            newWin.focus();
        }
    },
    downloadFile(url) {
        try {
            let elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        } catch (e) {

        }
    },
    //断言
    assert(condition, msg) {
        if (!condition) throw new Error(`[vuex] ${msg}`)
    },
    //excel操作
    xlsx: {
        transToUpload(origin, config) {
            let newList = [];
            for (let i = 0; i < origin.length; i++) {
                let newObj = {};
                for (let key in origin[i]) {
                    newObj[config[key]] = origin[i][key];
                }
                newList.push(newObj);
            }
            return newList;
        },
        //config={'数量'='a'} origin={a=100} 输出xsl 数量 100
        tableToExcel(origin, config) {
            if (origin.length == 0) {
                return false;
            }
            //反转config
            let newConfig = {};
            for (let key in config) {
                newConfig[config[key]] = key;
            }
            //去掉newConfig无用列
            let json = JSON.parse(JSON.stringify(origin[0]));
            let newConfigList = {};
            for (let key in json) {
                if (newConfig[key]) {
                    newConfigList[key] = newConfig[key];
                }
            }
            //头部组装
            let title = '<tr>';
            for (let key in newConfigList) {
                title += '<td>' + newConfigList[key] + '</td>';
            }
            title += '</tr>';
            //表身组装
            for (let i = 0; i < origin.length; i++) {
                title += '<tr>';
                for (let key in newConfigList) {
                    //增加\t为了不让表格显示科学计数法或者其他格式
                    title += '<td style="mso-number-format:\'\\@\';">' + origin[i][key] + '\t' + '</td>';
                }
                title += '</tr>';
            }
            //Worksheet名
            let worksheet = 'Sheet1';
            let uri = 'data:application/vnd.ms-excel;base64,';
            //下载需要的表格模板数据
            let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
                              xmlns:x="urn:schemas-microsoft-com:office:excel" 
                              xmlns="http://www.w3.org/TR/REC-html40">
                              <head><meta charset='UTF-8'><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                                <x:Name>${worksheet}</x:Name>
                                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                                </x:ExcelWorksheets></x:ExcelWorkbook></xml>
                                </head><body><table style="vnd.ms-excel.numberformat:@">${title}</table></body></html>`;
            //开始下载xlsx文件
            window.location.href = uri + window.btoa(unescape(encodeURIComponent(template)));
        }
    },
    //自定义spin
    getSpinConfig(desc) {
        return this.$loading({
            lock: true,
            text: '上传中……',
            background: 'background-color: rgba(255, 255, 255, .9);'
        })
    },
    //正则表达式
    RegExp: {
        required: /\S/,
        //折扣
        discount: /\b0(\.\d{1,2})\b/,
        //正则匹配价格金额允许保留小数点后面两位数
        fixed1_2: /^\d{0,8}\.{0,1}(\d{1,2})?$/,
        //正数
        plus: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
        //正整数
        integer_plus: /^\+?[1-9][0-9]*$/,
        //不大于100个字符串
        integer_1_100: /^.{1,100}$/,
        //0-100之间数字
        integer_0_100: /^([1-9][0-9]?)$/,
        //身份证
        IDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        //传真
        Fax: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
        //手机号
        Phone: /^1\d{10}$/,
        //座机
        Tel: /([0-9]{3,4}-)?[0-9]{7,8}/,
        email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
        password: /^[-_a-zA-Z0-9]+$/
    },
    //form表单校验，RegExpKey-RegExp的key errorMsg-校验失败返回的提示信息 required-是否必填
    formValidator_RegExp(RegExpKey, errorMsg, required) {
        return (rule, value, callback) => {
            //允许为空
            if (!required && (!value || !value.toString().trim())) {
                return callback();
            }
            if (RegExpKey === 'array') {
                if (value.length > 0) {
                    return callback();
                } else {
                    return callback(new Error(errorMsg || ''));
                }
            }
            if (this.RegExp[RegExpKey].test(value) === false) {
                return callback(new Error(errorMsg || ''));
            } else {
                return callback();
            }
        };
    },
    //将url转换为文件
    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    },
    components: {
        mount() {
            try {
                Vue
            } catch (e) {
                return false;
            }
            this.t_Loading();
        },
        t_loading() {
            let template = {
                template: `<div style="color: #2d8cf0;position: fixed;z-index: 666;left: 0;top: 0;right: 0;bottom: 0;background-color: rgba(255,255,255,0.7);display: flex;align-items: center;justify-content: center;flex-direction: column;">
                              <van-loading type="spinner" />
                              <div style="font-size: 14px;">{{propsData.text}}</div>
                            </div>`,
                data() {
                    return {
                        propsData: {
                            text: '',
                            timeout: ''
                        }
                    };
                },
                watch: {}
            };
            let constructor = Vue.extend(template); // 直接将Vue组件作为Vue.extend的参数
            // 对有效参数进行赋值
            let instance = new constructor({
                el: document.createElement('div'),
            });
            instance.callback = function (row) {
            };
            // 关闭方法，删除节点
            instance.show = function (data) {
                let text, timeout;
                if (typeof (data) === 'object') {
                    text = data.text || '';
                    timeout = data.timeout || '';
                } else if (typeof (data) === 'string') {
                    text = data;
                    timeout = '';
                } else {
                    text = '';
                    timeout = '';
                }
                if (timeout) {
                    setTimeout(() => {
                        instance.hide();
                    }, data.timeout);
                }
                instance.propsData.text = text;
                document.body.appendChild(instance.$el);
            };
            instance.hide = function () {
                instance.$el.parentNode.removeChild(instance.$el);
            };
            Vue.prototype.t_Loading = instance;
        }
    }
};
