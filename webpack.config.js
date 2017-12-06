const webpack = require('webpack');

module.exports = {
    entry: {
      bundle:  __dirname  + '/src/app.js'
    },
    output: {
      path: __dirname  + '/resources',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          test: /\.js[x]?$/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2017'],
            plugins: ["transform-function-bind"]
          }
        }
      ]
    },
    devtool: 'source-map'
};
