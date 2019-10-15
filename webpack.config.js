const path = require('path')

module.exports = {
    entry: {
        'rake': [
             path.resolve(__dirname, 'src/dist.js')
        ]
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
