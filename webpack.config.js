const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const buildPath = path.resolve(__dirname, 'dist');
const BASE_PREFIX = process.env.BASE_PREFIX || '';
module.exports = () => {
  const plugins = [
    new ExtractTextPlugin('css/[name].[hash].css'),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/)
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(new CleanWebpackPlugin(['dist'], { root: __dirname }));
  }
  plugins.push(new HtmlWebpackPlugin({
    favicon: 'app/../src/assets/favicon.png',
    template: path.join(__dirname, './src/index.tpl.html'),
    filename: 'index.html',
    path: buildPath
  }));
  // plugins.push(new BundleAnalyzerPlugin({
  //   analyzerPort: process.env.BUNDLE_ANALYZER_PORT || 8888
  // }));
  return {

    entry: {
      vendor: ['react', 'react-dom'],
      pin: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')]
    },
    output: {
      path: buildPath,
      filename: 'js/[name]-[hash].js',
      publicPath: `${BASE_PREFIX}/dist/`,
      chunkFilename: 'js/[name]-[chunkhash].js'
    },
    // performance: {
    //   maxEntrypointSize: 500000, // ~500kb
    //   maxAssetSize: 50000 // ~50kb
    // },
    devServer: {
      port: process.env.DEV_SERVER_PORT || 9000,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          // test: que tipo de archivo quiero reconocer,
          // use: que loader se va a encargar del archivo
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-0', 'airbnb'],
              plugins: [
                [
                  'transform-class-properties',
                  'import'
                ] // `style: true` for less
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          issuer: {
            exclude: /\.less$/
          },
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: 'file-loader'
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]'
            }
          }
        }
      ]
    },
    plugins,
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            minChunks: Infinity,
            enforce: true
          }
        }
      }
    }
  };
};
