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
        ok:'同意协议并注册'
    },
    //注册成功页
    registerOk:{
        title: '注册成功',
        success:'恭喜您注册成功，平台管理员审核通过后即可登录！',
        desc:'管理员在24小时内审核，并将审核结果发生给您！',
        ok:'确定'
    },
    map:{
        title:''
    }
};