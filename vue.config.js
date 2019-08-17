module.exports = {
    outputDir: '//Users//lihaitao//Downloads//my//project//rde-cordova-mac//www//',
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