const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require(`terser-webpack-plugin`);
module.exports = {
    entry : `./src/indexx.js` ,
    output: {
        filename: 'main.js'
    },
    plugins: [new MiniCssExtractPlugin(),
        new TerserWebpackPlugin(),],
    optimization: {
        minimizer: [new CssMinimizerPlugin({}),new TerserWebpackPlugin({})],
        minimize: true,
    },
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.ts$/,
                use: `ts-loader`
            }
        ],

    },


};