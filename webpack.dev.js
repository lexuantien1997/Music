const path = require("path");
const webpack = require('webpack');


module.exports = { 
  /**
   * entry: where we will start running webpack
   * in react app this is index.js script
   */
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'     
      },
      {
        loader: ['style-loader','css-loader'],
        test: /\css.$/
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          }, 
          {
            loader: 'css-loader',
          }, 
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/styles'],
            }
          }
        ]
      },
      {
        loader: 'file-loader',
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
      }
    ]
  },
  mode: "development"
}