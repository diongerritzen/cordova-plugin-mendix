var path = require("path");
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
      filename: "mx.js"
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
      new UglifyJSPlugin({
        sourceMap: true
      })
    ]
  };

  return config;
};
