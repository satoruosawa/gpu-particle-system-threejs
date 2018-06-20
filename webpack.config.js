const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',  // enhance debugging
  entry: {
    main: [
      'babel-polyfill',
      './src/js/index.js'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          }
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
    })
  ],
  devServer: {
    contentBase: __dirname + '/dist',
    host: '0.0.0.0',
    port: 5000
  }
}
