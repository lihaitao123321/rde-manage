module.exports = {
    outputDir: '//Users//lihaitao//Downloads//my//project//rde-cordova-mac//www//',
    publicPath: './',
    devServer: {
        proxy: {
            '/cloud': {
                target: 'http://106.12.36.121:9080'
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