import Qs from 'qs';
//测试
let isTest = false;
//上线
// let isTest= false;
let host = 'http://192.168.3.215:8090';
export default {
    config: {
        host: isTest ? host : '',
        imageFtpUrl: isTest ? host + '/images/test/ftproot/tempupload/0/' : '/images/test/ftproot/tempupload/0/',
    },
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
        // 配置默认值
        const service = axios.create({
            url: Tools.config.host,
            timeout: 30000,
            responseType: 'text'
        });
        // 请求拦截器
        service.interceptors.request.use(config => {
            if (obj.type === 'get') {
                config.method = 'get';
                config.url += '/organ/api';
            } else {
                config.method = 'post';
                config.url += '/organ/api';
            }
            return config;
        }, error => {
            // 请求错误
            checkStatus(error.response);
        });
        //响应拦截器
        service.interceptors.response.use(response => {
            // 对响应数据做些事
            if (response.data.code === 0 || response.code === 0) {
                return response.data;
            } else {
                if (Vue.prototype.$Notice && isTest) {
                    // 接口报错
                    Vue.prototype.$Notice.error({
                        title: '错误编码：' + response.data.code,
                        desc: response.data.message || response.data
                    });
                }
                return response.data;
            }
        }, error => {
            // 请求错误
            checkStatus(error.request);
        });

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            const errortext = Tools.codeMessage[response.status] || response.statusText;
            if (Vue.prototype.$Notice && isTest) {
                // 接口报错
                Vue.prototype.$Notice.error({
                    title: '错误编码：' + response.status,
                    desc: errortext
                });
            }
            const error = new Error(errortext);
            error.name = response.status;
            error.response = response;
            throw error;
        }
        let postData = Qs.stringify(obj);
        if (obj.type === 'get') {
            return service({
                params: postData
            });
        } else {
            return service({
                data: postData
            });
        }
    },

    createQuery: function (obj) {
        /*普通参数*/
        let app_key = "5000",
            data_sign = 0,
            tenant_num_id = 5;
        /*其它声明*/
        let time = Tools.Date.TimeFormat(new Date().getTime(), 'ymdhms2');
        let params = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(obj.data)));
        let sid = '';
        let salt = '';
        let loginInfo = sessionStorage.getItem('loginInfo');
        if (loginInfo) {
            sid = JSON.parse(loginInfo).sid;
            salt = JSON.parse(loginInfo).salt;
        } else {
            sid = localStorage.getItem('sid');
            salt = localStorage.getItem('salt');
        }

        let postData = {
            method: obj.method,
            params: params,
            app_key: app_key,
            timestamp: time,
            data_sign: data_sign,
            tenant_num_id: tenant_num_id,
            sid: sid,
            sign: CryptoJS.SHA1(salt + 'method' + obj.method + 'params' + params + 'sid' + sid + 'timestamp' + time + salt).toString()
        };
        let getData = {
            method: obj.method,
            params: params,
            app_key: app_key
        };
        if (obj.type === 'get') {
            return getData;
        }
        return Qs.stringify(postData);
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
    //权限验证
    Authorization: {
        //获取该用户按钮、菜单、表格列权限
        getMenuPermission: function () {
            return new Promise(resolve => {
                Tools.ajax({
                    method: "gb.cexport.data.export",
                    data: {
                        "sql_id": "XDLERP-9999",
                        "input_param": {
                            "empe_num_id": localStorage.getItem("usrNumId") || "1"
                        },
                    },
                    success: (res) => {
                        if (res.code === 0) {
                            let result = JSON.stringify(res.results);
                            sessionStorage.setItem('rightsList', result);
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    error: (res) => {}
                });
            });
        },
        //获取该用户数据权限，包括门店、捕猎、物理仓
        getDataPermission: function (list) {
            return new Promise(resolve => {
                Tools.ajax({
                    method: "gb.cexport.data.export",
                    data: {
                        "sql_id": "XDLERP-9998",
                        "input_param": {
                            "id": list.join(',')
                        },
                        "page_num": 1,
                        "page_size": 1000000
                    },
                    success: (res) => {
                        if (res.code === 0) {
                            let result = JSON.stringify(res.results);
                            sessionStorage.setItem('dataPermission', result);
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    error: (res) => {}
                });
            });
        },
        //获取该用户数据子查询
        getChildDataPermission: function () {
            return new Promise(resolve => {
                Tools.ajax({
                    method: "gb.cexport.data.export",
                    data: {
                        "sql_id": "XDLERP-9997",
                        "input_param": {
                            "empe_num_id": localStorage.getItem("usrNumId")
                        },
                    },
                    success: (res) => {
                        if (res.code === 0) {
                            let list = [];
                            for (let i = 0; i < res.results.length; i++) {
                                list = list.concat(res.results[i].org_ids.split(','));
                            }
                            resolve(list);
                        } else {
                            resolve(false);
                        }
                    },
                    error: (res) => {}
                });
            });
        },
        //获取该用户部类供应权限查询
        getUnitDataPermission: function () {
            return new Promise(resolve => {
                Tools.ajax({
                    method: "gb.cexport.data.export",
                    data: {
                        "sql_id": "XDLERP-9996",
                        "input_param": {
                            "div_num_id": this.getDivAuth().join(',')
                        },
                        "page_num": 1,
                        "page_size": 1000000
                    },
                    success: (res) => {
                        if (res.code === 0) {
                            let list = [];
                            for (let i = 0; i < res.results.length; i++) {
                                list = list.concat(res.results[i].unit_num_id);
                            }
                            resolve(list.join(','));
                        } else {
                            resolve(false);
                        }
                    },
                    error: (res) => {}
                });
            });
        },
        //获取按钮权限
        getButtonAuth(buttonId) {
            let authList = sessionStorage.getItem('rightsList');
            if (authList) {
                authList = JSON.parse(authList);
                for (let i = 0; i < authList.length; i++) {
                    if (authList[i].resource_id === buttonId) {
                        return true;
                    }
                }
            }
            return false;
        },
        //获取表格列权限
        getColumnAuth(columnId) {
            let authList = sessionStorage.getItem('rightsList');
            if (authList) {
                authList = JSON.parse(authList);
                for (let i = 0; i < authList.length; i++) {
                    if (authList[i].resource_id === columnId) {
                        return true;
                    }
                }
            }
            return false;
        },
        //获取表格可用列列表，用来传给table表格列配置
        getColumnsAuth(columns) {
            let list = [];
            for (let i = 0; i < columns.length; i++) {
                if (!columns[i].authId) {
                    list.push(columns[i]);
                } else if (Tools.Authorization.getColumnAuth(columns[i].authId)) {
                    list.push(columns[i]);
                }
            }
            return list;
        },
        //获取部类权限
        getDivAuth() {
            let list = sessionStorage.getItem('dataPermission');
            if (list) {
                list = JSON.parse(list);
            } else {
                return [];
            }
            let reList = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].rootCode === 'DIV_NUM_ID') {
                    reList.push(list[i].code);
                }
            }
            return reList;
        },
        //获取门店权限
        getSubUnitAuth() {
            let list = sessionStorage.getItem('dataPermission');
            if (list) {
                list = JSON.parse(list);
            } else {
                return [];
            }
            let reList = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].rootCode === 'SUB_UNIT_NUM_ID') {
                    reList.push(list[i].code);
                }
            }
            return reList;
        },
        //获取物理仓权限
        getPhysicalAuth() {
            let list = sessionStorage.getItem('dataPermission');
            if (list) {
                list = JSON.parse(list);
            } else {
                return [];
            }
            let reList = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].rootCode === 'PHYSICAL_NUM_ID') {
                    reList.push(list[i].code);
                }
            }
            return reList;
        },
        //获取部类的供应商权限
        async getUnitAuth() {
            return await this.getUnitDataPermission();
        },

    },
    //获取流水号号tableName-表名，key-字段名，type：1-长号 2-短号
    getSeries(tableName, key, type) {
        return new Promise(function (resolve, reject) {
            let name = tableName + '_' + key;
            let method = "gb.core.sequence.client.series.newGet";
            if (type === 2) {
                name = 'auto_' + name;
                method = "ykcloud.md.automic.sequence.get";
            }
            //做一些异步操作
            Tools.ajax({
                method: method,
                data: {
                    series_name: name
                },
                success: function (res) {
                    if (res.code === 0) {
                        resolve(res.sequence_num)
                    } else {
                        resolve(false)
                    }
                },
                error: (res) => {
                    resolve(false)
                }
            });
        });
    },
    //获取商品条码
    getBarcode1() {
        return new Promise(function (resolve, reject) {
            //做一些异步操作
            Tools.ajax({
                method: "ykcloud.prd.for.product.barcode.generate",
                data: {},
                success: function (res) {
                    if (res.code === 0) {
                        resolve(res.barcode)
                    } else {
                        resolve(false)
                    }
                },
                error: (res) => {
                    resolve(false)
                }
            });
        });
    },
    //登录用户信息
    User: {
        //获取门店id
        getSupplySubUnitNumId: function () {
            let unitObj = localStorage.getItem('EX_ARC_EMPE__sub_unit_num_id_');
            if (unitObj) {
                return JSON.parse(unitObj).value;
            } else {
                return '1';
            }
        },
        //获取门店名称
        getSupplySubUnitName: function () {
            let unitObj = localStorage.getItem('sub_unit_session');
            if (unitObj) {
                return JSON.parse(unitObj).value;
            } else {
                return '1';
            }
        },
        //获取供应商id
        getSupplyUnitNumId: function () {
            let unitObj = localStorage.getItem('EX_ARC_EMPE__unit_num_id_');
            if (unitObj) {
                return JSON.parse(unitObj).value;
            } else {
                return '1';
            }
        },
        //获取用户id
        getEmpeNumId: function () {
            let unitObj = localStorage.getItem('EX_ARC_EMPE__empe_num_id_');
            if (unitObj) {
                return JSON.parse(unitObj).value;
            } else {
                return '1';
            }
        },
        //获取用户id
        getEmpeName: function () {
            let unitObj = localStorage.getItem('EX_ARC_EMPE__empe_name_');
            if (unitObj) {
                return JSON.parse(unitObj).value;
            } else {
                return '1';
            }
        },
    },

    //获取供应商id
    getSupplyUnitNumId: function () {
        let unitObj = localStorage.getItem('EX_ARC_EMPE__unit_num_id_');
        if (unitObj) {
            return JSON.parse(unitObj).value;
        } else {
            return '1';
        }
    },
    //可编辑表格-检测未保存的行
    checkNoSaveRow: function (oldList, newList, itemModelData) {
        let list = [];
        for (let i = 0; i < newList.length; i++) {
            let n = 0;
            for (let key in itemModelData) {
                if (key === 'series' && !newList[i][key]) {
                    n = 1;
                }
                if (oldList[i]) {
                    if (oldList[i][key] !== newList[i][key]) {
                        n = 1;
                    }
                } else {
                    n = 1;
                }
                if (n === 1) {
                    list.push(newList[i]);
                    n = 0;
                    break;
                }
            }
        }
        return list;
    },
    //将通用查询查到的小类组装成树状结构数据
    list_transTo_tree: function (list) {
        let tree = [];
        for (let i = 0; i < list.length; i++) {
            tree = this.checkChildrenByTree(tree, list[i], 'div_num_id');
        }
        return tree;
    },
    //判断list里面是否存在obj
    checkChildrenByTree(tree, obj, key) {
        let newKey = '';
        if (key == 'div_num_id') {
            newKey = 'pty1_num_id';
        } else if (key == 'pty1_num_id') {
            newKey = 'pty2_num_id';
        } else if (key == 'pty2_num_id') {
            newKey = 'pty3_num_id';
        }
        let flag = 0;
        for (let i = 0; i < tree.length; i++) {
            if (tree[i][key] == obj[key]) {
                flag = 1;
                if (key != 'pty3_num_id') {
                    tree[i].children = this.checkChildrenByTree(tree[i].children, obj, newKey);
                }
            }
        }
        if (tree.length == 0 || flag == 0) {
            let template = {
                title: '',
                div_num_id: '',
                pty1_num_id: '',
                pty2_num_id: '',
                pty3_num_id: '',
                key: '',
                checked: false,
                expand: false,
                children: []
            };
            template.key = key;
            template.div_num_id = obj.div_num_id;
            template.pty1_num_id = obj.pty1_num_id;
            template.pty2_num_id = obj.pty2_num_id;
            template.pty3_num_id = obj.pty3_num_id;
            if (key == 'div_num_id') {
                template.title = obj.div_name;
            } else if (key == 'pty1_num_id') {
                template.title = obj.pty1_name;
            } else if (key == 'pty2_num_id') {
                template.title = obj.pty2_name;
            } else if (key == 'pty3_num_id') {
                template.title = obj.pty3_name;
            }
            tree.push(template);
            if (key != 'pty3_num_id') {
                tree[tree.length - 1].children = this.checkChildrenByTree(tree[tree.length - 1].children, obj, newKey);
            }
        }
        return tree;
    },
    //清除树选中状态
    clearTreeChecked(tree) {
        for (let i = 0; i < tree.length; i++) {
            tree[i].checked = false;
            if (tree[i].children && tree[i].children.length > 0) {
                tree[i].children = this.clearTreeChecked(tree[i].children);
            }
        }
        return tree;
    },
    //迭代选中小类
    list_matching_tree(tree, list) {
        //每条匹配的数据所在的树链
        for (let i = 0; i < list.length; i++) {
            this.matching_tree(tree, list[i]);
        }
        return tree;
    },
    matching_tree(tree, obj) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].pty3_num_id == obj.pty_num_3 && tree[i].key == 'pty3_num_id') {
                tree[i].checked = true;
                break;
            }
            if (tree[i].children && tree[i].children.length > 0) {
                tree[i].children = this.matching_tree(tree[i].children, obj);
            }
        }
        return tree;
    },
    //获取选中的小类
    getTreePtyList(tree, key) {
        let checkedList = [];
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].key == key && tree[i].checked) {
                checkedList.push(tree[i][key]);
            }
            if (tree[i].children && tree[i].children.length > 0) {
                checkedList = checkedList.concat(this.getTreePtyList(tree[i].children, key));
            }
        }
        return checkedList;
    },
    //时间
    Date: {
        //获取距离今天的时间,num-天数，reType-返回类型
        getDateDistanceToToday(num, reType) {
            let date = new Date(new Date().getTime() + num * 24 * 60 * 60 * 1000).getTime();
            return this.TimeFormat(date, reType); //后一天
        },
        //获取距离某天的时间,time-某天，num-天数，reType-返回类型
        getDateDistanceToOneDay(time, num, reType) {
            let date = new Date(new Date(time).getTime() + num * 24 * 60 * 60 * 1000).getTime();
            return this.TimeFormat(date, reType); //后一天
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
        TimeFormat(time, id) {
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
        Phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
        //座机
        Tel: /([0-9]{3,4}-)?[0-9]{7,8}/,
        email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
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
    components: {
        mount() {
            try {
                Vue
            } catch (e) {
                return false;
            }
            this.JdLoading();
        },
        JdLoading() {
            let template = {
                template: `<div style="color: #2d8cf0;position: fixed;z-index: 666;left: 0;top: 0;right: 0;bottom: 0;background-color: rgba(255,255,255,0.7);display: flex;align-items: center;justify-content: center;flex-direction: column;">
                              <div style="font-size: 30px;" class="ali-icon JdLoading">&#xe64f;</div>
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
            instance.callback = function (row) {};
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
            Vue.prototype.JdLoading = instance;
        }
    }
};
Tools.components.mount();