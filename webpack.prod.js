const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    library: 'react-json-form'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts','.tsx','.js','.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/, 
        include: [path.join(__dirname, 'src')],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader?modules&sass&namedExport'
          },
          'sass-loader'
        ]
      },
      { 
        test: /\.tsx?$/, 
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      { 
        enforce: 'pre', 
        test: /\.js$/, 
        loader: 'source-map-loader' 
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ]),
    //new BundleAnalyzerPlugin()
  ],
  externals: {
    //'react': 'commonjs react'
  }
}