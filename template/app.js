'use strict';

const express = require('express');
const path = require('path');
// const config = require('./config');
// const scripts = require('./scripts');
const env = require('./utils/env');
// const logger = require('./utils/logger')('cf-tutor');

/* istanbul ignore next */
// if (env.isProd) scripts.startAll();

const app = express();

// app.use((req, res, next) => res.sendFile(path.join(__dirname, 'MP_verify_pOMwKMk4RsznX9Wn.txt')));

// ejs 相关
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// 静态文件
if (!env.isProd && !env.isDev) {
  app.set('views', './views');
  app.use(express.static('./public'));
  app.use(express.static('./web'));
} else {
  app.set('views', path.join(__dirname, 'rev/views'));
}

// app.use(require('./api/router'));

app.use('/', async (req, res, next) => {
  // await config.prepare();
  // const appid = config.wechat.appId;
  res.render('app', {});
});

app.listen(1234);
console.info(`listening port ${1234}.`);

// 运行脚本
// scripts.startAll();

exports = module.exports = app;
