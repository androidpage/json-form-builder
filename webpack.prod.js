const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
        loader: 'awesome-typescript-loader' 
      },
      { 
        enforce: 'pre', 
        test: /\.js$/, 
        loader: 'source-map-loader' 
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ])
  ],
  externals: {
    'react': 'commonjs react'
  }
}