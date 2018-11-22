const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill','./src/client.ts'],
  mode: 'production',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bot.bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'production/Procfile'
      },
      {
        from: 'production/package.json'
      },
      {
        from: 'production/yarn.lock'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            "plugins": [
              "@babel/plugin-transform-modules-commonjs",
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread"
            ],
            "presets": [
              "@babel/env",
              "@babel/typescript"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
};