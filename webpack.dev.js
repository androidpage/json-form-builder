const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './temp/temp.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dev'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts','.tsx','.js','.jsx']
  },
  module: {
    rules: [
      { 
        test: /\.scss$/, 
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'temp')],
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
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    compress: true,
    port: 8080
  }
}