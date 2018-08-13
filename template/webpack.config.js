const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const entry = {
    'app': './web/apps/main.tsx',
    'vendor-flexible': './web/vendors/flexible.js',
  };

  const output = {
    path: path.resolve(__dirname, 'web/scripts'),
    filename: '[name].js',
    publicPath: '/scripts/',
  };

  if (env === 'production') {
    // output.publicPath = 'https://static.careerfrog.com.cn/cf-tutor/scripts/';
  }

  const resolve = {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx',
    ],
    alias: {
      Actions: path.resolve(__dirname, 'web/store/actions'),
      Components: path.resolve(__dirname, 'web/components'),
      Pages: path.resolve(__dirname, 'web/pages'),
      Constants: path.resolve(__dirname, 'web/constants'),
      Containers: path.resolve(__dirname, 'web/containers'),
      Utils: path.resolve(__dirname, 'web/utils'),
      Axios: path.resolve(__dirname, 'web/utils/axios'),
      Service: path.resolve(__dirname, 'web/utils/service'),
    },
  };

  const plugins = [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ];

  const optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests : 5,
      automaticNameDelimiter: '~',
      cacheGroups:{
        vendor: {
          chunks: 'initial',
          test: /node_modules/,
          name: 'vendor',
          minSize: 0,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 5,
          maxInitialRequests : 3,
          reuseExistingChunk: true,
        },
      },
    },
  };

  const module = {
    rules: [{
      test: [
        /\.js$/, /\.jsx$/,
      ],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            'env', 'react', 'stage-1', 'stage-3',
          ],
          plugins: [
            'syntax-dynamic-import',
            'dynamic-import-webpack',
            [
              'import',
              {
                libraryName: 'antd-mobile',
                style: true,
              },
            ],
          ],
        },
      },
      ],
    }, 
    {
      test: [
        /\.ts$/,/\.tsx$/,
      ],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              'env', 'react', 'stage-1', 'stage-3',
            ],
            plugins: [
              'syntax-dynamic-import',
              'dynamic-import-webpack',
              [
                'import',
                {
                  libraryName: 'antd-mobile',
                  style: true,
                },
              ],
            ],
          },
        },
        {
          loader: 'awesome-typescript-loader',
        },
      ],
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        }],
        fallback: 'style-loader',
      }),
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        }, {
          loader: 'less-loader',
          options: {
            paths: [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, 'web/styles'),
            ],
            javascriptEnabled: true,
          },
        }],
        fallback: 'style-loader',
      }),
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|gif|png)$/,
      loader: 'url-loader',
    }, {
      test: require.resolve('moment'),
      use: [{
        loader: 'expose-loader',
        options: 'moment',
      }],
    }],
  };
  const config = {
    entry,
    output,
    resolve,
    plugins,
    optimization,
    module,
  };
  return config;
};
