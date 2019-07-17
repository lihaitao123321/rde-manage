import xiongjian from './xiongjian';
import qianchong from './qianchong';
export default {
    ...xiongjian,
    ...qianchong,
    login: {
        title: '登陆',
        register:'注册',
        phone:'手机号码',
        password:'登陆密码',
    },
    register:{
        title: '新用户注册',
        username:'用户姓名',
        password: '登陆密码',
        phone:'手机号',
        code:'验证码',
        email:'邮箱',
        ok:'同意协议并注册'
    },
    registerOk:{
        title: '注册成功',
        success:'恭喜您注册成功，平台管理员审核通过后即可登录！',
        desc:'管理员在24小时内审核，并将审核结果发生给您！',
        ok:'确定'
    },

};