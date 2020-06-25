 const config = {
    project: 'A',
    //苏州德孚
    A: {
        name: '苏州德孚',
        desc: '德孚智能运维云服务系统',
        logo: 'A.png',
        mqttUrl: 'mqtt://106.12.36.121:8884',
        // baseUrl: 'https://iot.congrongyun.com',
        baseUrl: 'https://iot.de-vo.net/',
        outputDir: '//Users//lihaitao//Downloads//my//project//rde-cordova-mac-A//www//',//打包输出地址
    },
    //从容
    B: {
        name: '江苏从容能源实业有限公司',
        desc: '从容智能运维云服务系统',
        logo: 'B.png',
        mqttUrl: 'mqtt://106.12.36.121:8884',
        baseUrl: 'https://iot.de-vo.net/',
        outputDir: '//Users//lihaitao//Downloads//my//project//rde-cordova-mac-B//www//',//打包输出地址
    }
}
// export default config[config.project]

 module.exports = config[config.project]
