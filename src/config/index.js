 const config = {
    project: 'A',
    //苏州德孚
    A: {
        projectId: 'A',
        name: '苏州德孚',
        desc: '德孚智能运维云服务系统',
        logo: 'A.png',
        // mqttUrl: 'mqtt://106.12.36.121:8884',
        // mqttUrl: 'mqtt://106.12.18.233:8884',
        // mqttUrl: 'mqtt://106.12.26.67:8884',
        mqttUrl:'mqtt://106.12.84.118:9885/mqtt',
        // baseUrl: 'https://iot.de-vo.net/',
        // baseUrl: 'https://106.12.26.67/',
        baseUrl: 'https://106.12.84.118/',
        // baseUrl: 'https://iot.de-vo.cn/',
        outputDir: '//Users//lihaitao//Downloads//my//project//rde-cordova-mac-A//www//',//打包输出地址
        searchTitle:'德孚智能运维云服务系统'
    },
    //从容
    B: {
        projectId: 'B',
        name: '江苏从容能源实业有限公司',
        desc: '从容智能运维云服务系统',
        logo: 'B.png',
        mqttUrl: 'mqtt://106.12.26.67:8884',
        // mqttUrl: 'mqtt://106.12.36.121:8884',
        baseUrl: 'https://iot.de-vo.net/',
        outputDir: '//Users//lihaitao//Downloads//my//project//rde-cordova-mac-B//www//',//打包输出地址
        searchTitle:'从容智能运维云服务系统'
    },
     //国訾云物联
     C: {
         projectId: 'C',
         name: '国訾云物联',
         desc: '国訾云物联智能运维云服务系统',
         logo: 'C.png',
         // mqttUrl: 'mqtt://180.76.180.64:8884',
         mqttUrl: 'mqtt://180.76.55.124:9885/mqtt',
         baseUrl: 'https://api.guozice.com',
         outputDir: '//Users//lihaitao//Downloads//my//project//rde-cordova-mac-C//www//',//打包输出地址
         searchTitle:'国訾云物联智能运维云服务系统'
     },
 }
// export default config[config.project]

 module.exports = config[config.project]
