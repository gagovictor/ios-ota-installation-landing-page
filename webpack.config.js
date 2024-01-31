const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const configData = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

  const replacements = Object.keys(configData).map((key) => ({
    pattern: new RegExp(`{{${key}}}`, 'g'),
    replacement: configData[key],
  }));

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'src'),
      },
      compress: true,
      port: 9000,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/manifest.plist',
            to: 'manifest.plist',
            noErrorOnMissing: true,
          },
        ],
      }),
      new HtmlReplaceWebpackPlugin(replacements),
      new webpack.DefinePlugin({
        'process.env.CONFIG': JSON.stringify(configData),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ],
        },
      ],
    },
  };
};
