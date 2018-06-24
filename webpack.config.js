const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'source-map', // enhance debugging
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/js/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.glsl$/,
      exclude: /node_modules/,
      loader: 'raw-loader'
    },
    {
      test: /\.glsl$/,
      exclude: /node_modules/,
      loader: 'glslify-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 5000,
    disableHostCheck: true // FIXME: this property is just for iPhone check
  }
}
