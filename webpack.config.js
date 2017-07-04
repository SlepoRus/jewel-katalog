const webpack = require('webpack');
var cssName            = 'styles.css';
var jsName             = 'bundle.js';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
var path               = require('path');
var publicPath         = process.env.NODE_ENV !== 'production' ? 'http://0.0.0.0:8050/public/dist/' : '';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(cssName),
  new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
    }),
  new webpack.NoEmitOnErrorsPlugin(),


];
plugins.push(new webpack.DefinePlugin({
    'process.env.BROWSER': JSON.stringify(true)
}));
plugins.push(
  new webpack.DefinePlugin({
        cutCode: JSON.stringify(true)
    })
)
plugins.push(
  new CleanWebpackPlugin([ 'public/dist' ], {
    root: __dirname,
    verbose: true,
    dry: false
  })
);

plugins.push(
  new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })
)

module.exports =  {
  entry: {
      main: ['./src/client.js'],
  },
  output: {
       path: `${__dirname}/public/dist/`,
       filename: jsName,
       publicPath
  },
  plugins,

  module: {
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ],
    rules:
      [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({fallback:'style-loader', use: 'css-loader!autoprefixer-loader'})
         },

         {
           test: /\.less$/,
           loader: ExtractTextPlugin.extract({fallback:'style-loader', use: 'css-loader!postcss-loader!less-loader'}),

         },

         {
           test: /\.js$/,
           use: [{
            loader: 'babel-loader',
            options: {
              presets: [['es2015', {modules: false}],'react'],
            }
          }]

          },
          { test: /\.jsx$/, exclude: /(node_modules)/,use:
            [
              {
                 loader: 'babel-loader',
                 options: {
                   presets: [['es2015', {modules: false}],'react'],
                 }
              }
            ]
          },

          { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },

          { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },

          { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },

          {
              test: /\.(otf|eot|svg|ttf|woff)/,
              loader: 'url-loader?limit=8192'
          },

      ],
    },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
