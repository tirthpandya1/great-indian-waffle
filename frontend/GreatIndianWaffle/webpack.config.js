const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add React Native packages that need compiling
  'react-native-gesture-handler',
  'react-native-safe-area-context',
  'react-native-screens',
  'redux',
  'redux-persist',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'App.js'),
    path.resolve(appDirectory, 'src'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: ['react-native-web', '@babel/plugin-transform-runtime'],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(appDirectory, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'bundle.[contenthash].js',
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
    },
    modules: [
      path.resolve(appDirectory, 'src'),
      path.resolve(appDirectory, 'node_modules'),
    ],
  },
  devServer: {
    static: {
      directory: path.join(appDirectory, 'public'),
    },
    compress: true,
    port: 8081,
    open: true,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
    },
    devMiddleware: {
      stats: {
        colors: true,
        chunks: false,
        children: false,
        modules: false,
        chunkModules: false,
      },
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration, 
      imageLoaderConfiguration,
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDirectory, 'web/index.html'),
      favicon: path.join(appDirectory, 'public/favicon.ico'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(appDirectory, 'public'),
          to: path.join(appDirectory, 'dist'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'eval-source-map',
};
