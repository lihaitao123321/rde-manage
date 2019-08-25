import model2 from './model2';
import model1 from './model1';
export default {
    ...model2,
    ...model1,
    //登陆页
    login: {
        title: '登陆',
        register:'注册',
        phone:'手机号码',
        password:'登陆密码',
    },
    //注册页
    register:{
        title: '新用户注册',
        username:'用户姓名',
        password: '登陆密码',
        phone:'手机号',
        code:'验证码',
        email:'邮箱',
        ok:'同意协议并注册',
        RetrievePW:'重置密码',
    },
    //注册成功页
    registerOk:{
        title: '注册成功',
        success:'恭喜您注册成功，平台管理员',
        successNext:'审核通过后即可登录！',
        desc:'管理员在24小时内审核，并将审核结果发生给您！',
        ok:'完成'
    },
    //找回密码页
    retrievePw:{
        reset:'重置密码',
    },
    //启动页
    startPage:{
        wordTitle:'从容智慧运维云平台',
        letter:'CALM INTELLIGENT CLOUD PLATFORM',
        wordLt:'Copyright@2018 南京从容信息科技有限公司',
    },
    EchartsReport:{
        Analysis:'分析',
        startTime:'起始时间',
        endTime:'终止时间',
        serial:'序号',
        time:'时间',
        status:'报警状态',
        seach:'查询',
        acqCycle:'采集周期',
    },
    map:{
        title:''
    }
};