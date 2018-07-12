const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const buildPath = path.resolve(__dirname, 'dist');
const plugins = [new HtmlWebpackPlugin({
  template: 'src/index.tpl.html',
  filename: 'index.html',
  path: path.resolve(__dirname, 'dist')
})]
// new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/)];

plugins.push(new BundleAnalyzerPlugin({
  analyzerPort: process.env.BUNDLE_ANALYZER_PORT || 8888
}));

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    pin: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: buildPath,
    publicPath: `/`,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  plugins,
  devServer: {
    port: process.env.DEV_SERVER_PORT || 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-0', 'airbnb', 'es2015'],
            plugins: [
              [
                'react-hot-loader/babel',
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
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]'
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
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
