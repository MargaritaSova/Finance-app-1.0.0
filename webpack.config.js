const path = require('path');

module.exports = {
    entry: './src/index',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
    },

    devtool: 'cheap-eval-source-map'
};
