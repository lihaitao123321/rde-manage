module.exports = {
    outputDir:'D:\\project\\rde-cordova\\www\\',
    publicPath:'./',
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: ['vux-ui']
        })
    }
}