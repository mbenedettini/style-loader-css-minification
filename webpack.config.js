const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/index'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: '[name].[contenthash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
        // ignoreOrder: true
      }),
  ],
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          // I have generated `dist-mini-css-extract-plugin` enabling this loader and disabling `style-loader`
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: 'style-loader',
            options: {
              esModule: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                // modifyVars: theme,
                javascriptEnabled: true,
              }
            },
          },
        ],
      },
    ]
  }
};
