module.exports = {
    outputDir: 'D:\\project\\rde-cordova\\www\\',
    publicPath: './',
    devServer: {
        proxy: {
            'organ/api': {
                target: 'http://106.12.37.142/'
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