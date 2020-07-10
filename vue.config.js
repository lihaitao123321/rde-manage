let config = require('./src/config/index.js')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
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
    },
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 autoprefixer(),
    //                 pxtorem({
    //                     rootValue: 37.5,
    //                     propList: ['*'],
    //                     // 该项仅在使用 Circle 组件时需要
    //                     // 原因参见 https://github.com/youzan/vant/issues/1948
    //                     selectorBlackList: ['van-circle__layer']
    //                 })
    //             ]
    //         }
    //     }
    // }
}
