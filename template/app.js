'use strict';

const express = require('express');
const path = require('path');
const projectConfig = require('./project.config.json');
const env = require('./utils/env');
const { initEntry } = require('./utils/build-entry');

const app = express();

// app.use((req, res, next) => res.sendFile(path.join(__dirname, 'MP_verify_pOMwKMk4RsznX9Wn.txt')));

// ejs 相关
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// 静态文件
if (!env.isProd && !env.isDev) {
  app.set('views', './views');
  app.use(express.static('./'));
} else {
  app.set('views', path.join(__dirname, 'rev/views'));
}

// 构建页面
const pageRoutes = Object.keys(initEntry()).map(path => `${projectConfig.front.router.baseUrl}/${path}`);
pageRoutes.forEach(route => {
  app.use(route, async (req, res, next) => {
    const reg = new RegExp(`^${projectConfig.front.router.baseUrl}/([^/?]+)[^/]*`);
    const urlPath = req.baseUrl.match(reg)[1];
    res.render('index', {
      path: urlPath,
      port: projectConfig.server.hmr.port,
    });
  });
});

app.listen(projectConfig.server.port);
console.info(`listening port ${projectConfig.server.port}.`);

exports = module.exports = app;
