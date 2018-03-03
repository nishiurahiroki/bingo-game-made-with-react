const webpack = require('webpack');

const isProduction = !!process.env.COMMIT_HASH

const COMMIT_HASH = isProduction ?
                      process.env.COMMIT_HASH : 'dev-environment'

const mode = isProduction ? 'production' : 'development'

module.exports = {
    entry: {
      bundle:  __dirname  + '/src/app.js'
    },
    output: {
      path: __dirname  + '/resources',
      filename: `bundle.${COMMIT_HASH}.js`
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          exclude: [ /node_modules/ ],
          test: /\.js[x]?$/,
          options: {
            cacheDirectory: true,
            presets: ['react', 'es2017', 'env'],
            plugins: ["transform-function-bind"]
          }
        }
      ]
    },
    mode
};
