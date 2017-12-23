const webpack = require('webpack');
const COMMIT_HASH = process.env.COMMIT_HASH || 'dev-environment'

module.exports = {
    entry: {
      bundle:  __dirname  + '/src/app.js'
    },
    output: {
      path: __dirname  + '/resources',
      filename: `bundle.${COMMIT_HASH}.js`
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          test: /\.js[x]?$/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2017', 'env'],
            plugins: ["transform-function-bind"]
          }
        }
      ]
    },
    devtool: 'source-map'
};
