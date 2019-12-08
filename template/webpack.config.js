const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const projectConfig = require('./project.config.json');
const { initEntry } = require('./utils/build-entry');

module.exports = (env) => {
  const entry = initEntry();

  const output = {
    path: path.resolve(__dirname, 'static/dist'),
    filename: '[name].js',
    publicPath:
      // 生产模式在/static/dist/ 本地开发在下面
      env === 'production'
        ? '/static/dist/'
        : `http://localhost:${projectConfig.server.hmr.port}/static/dist/`,
  };

  const resolve = {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx',
    ],
    alias: {
      Components: path.resolve(__dirname, 'public/components'),
      Pages: path.resolve(__dirname, 'public/pages'),
      Constants: path.resolve(__dirname, 'public/constants'),
      Utils: path.resolve(__dirname, 'public/utils'),
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
      maxInitialRequests: 5,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /node_modules/,
          name: 'vendor',
          minSize: 0,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
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
            ['import', { libraryName: 'antd-mobile', style: true }],
          ],
        },
      }],
    },
    {
      test: [
        /\.ts$/, /\.tsx$/,
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
            [ 'import', { libraryName: 'antd-mobile', style: true }],
          ],
        },
      }, 'ts-loader'],
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')(),
            require('./utils/postcss-px-to-rem-vw')(),
          ],
        },
      }, 'css-loader'],
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
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')(),
            require('./utils/postcss-px-to-rem-vw')(),
          ],
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
    }, {
      test: /\.(png|jpg|gif|svg|)$/,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]?[hash]',
      },
      include: [
        path.resolve(__dirname, 'public'),
        path.resolve(__dirname, 'project.config.json'),
      ],
    }],
  };

  //配置此静态文件服务器，可以用来预览打包后项目
  const devServer = {
    inline: true, //打包后加入一个websocket客户端
    hot: true, //热重载
    contentBase: path.resolve(__dirname, './'), //开发服务运行时的文件根目录
    host: 'localhost', //主机地址
    port: projectConfig.server.hmr.port, //端口号
    compress: true, //开发服务器是否启动gzip等压缩
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  return {
    entry,
    output,
    resolve,
    plugins,
    optimization,
    module,
    devServer,
  };
};
