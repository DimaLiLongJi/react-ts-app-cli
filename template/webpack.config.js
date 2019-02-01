const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const entry = {
    'demo-page': './public/apps/demo-page.tsx',
    'vendor-flexible': './public/vendors/flexible.js',
  };

  const output = {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].js',
    publicPath: '/scripts/',
  };

  const resolve = {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx',
    ],
    alias: {
      Actions: path.resolve(__dirname, 'public/store/actions'),
      Components: path.resolve(__dirname, 'public/components'),
      Pages: path.resolve(__dirname, 'public/pages'),
      Constants: path.resolve(__dirname, 'public/constants'),
      Containers: path.resolve(__dirname, 'public/containers'),
      Utils: path.resolve(__dirname, 'public/utils'),
      Axios: path.resolve(__dirname, 'public/utils/axios'),
      Service: path.resolve(__dirname, 'public/utils/service'),
    },
  };

  const plugins = [
    new MiniCssExtractPlugin({
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
            '@babel/preset-env', '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            ['@babel/plugin-proposal-class-properties', { 'loose': true }],
            'dynamic-import-webpack',
            [ 'import', { libraryName: 'antd-mobile', style: true }],
          ],
        },
      }],
    }, 
    {
      test: [
        /\.ts$/,/\.tsx$/,
      ],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env', '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
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
      'awesome-typescript-loader',
      ],
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      ],
    }, {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      }, {
        loader: 'less-loader',
        options: {
          paths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'public/styles'),
          ],
          javascriptEnabled: true,
        },
      },
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|gif|png)$/,
      loader: 'url-loader',
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
