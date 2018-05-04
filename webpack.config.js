var path = require("path");
var I18nPlugin = require("i18n-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require("webpack");

var utils = require("./node_modules/mendix-hybrid-app-base/utils");

module.exports = function() {
  var config = {
    entry: {
      mxApp: utils.getBaseOrCustomPath("./node_modules/mendix-hybrid-app-base/src/www/scripts/app.js")
    },
    output: {
      path: path.resolve("www"),
      filename: "mx.js",
      library: "mxApp",
      libraryTarget: "umd"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(mendix-hybrid-app-base)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['env', {
                "targets": {
                  "uglify": true
                }
              }]],
              plugins: ["transform-regenerator"],
              cacheDirectory: true
            }
          }
        }
      ]
    },
    plugins: [
      new I18nPlugin(utils.loadConfiguration("./node_modules/mendix-hybrid-app-base/config/texts.json"), {
        hideMessage: true
      })
    ]
  };

  return config;
};
