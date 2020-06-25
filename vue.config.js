let config = require('./src/config/index.js')
module.exports = {
    outputDir: config.outputDir,//build输出地址
    publicPath: './',
    devServer: {
        proxy: {
            '/cloud': {
                target: config.baseUrl
            }
        }
    },
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: [
                'vux-ui',
                {
                    name: 'less-theme',
                    path: './src/css/theme.less'
                }
            ]
        })
    }
}
