'use strict';

const express = require('express');
const path = require('path');
const projectConfig = require('../project.config.json');
const env = require('./env');
const { initEntry } = require('./build-entry');
const proxy = require('http-proxy-middleware');

const app = express();

// app.use((req, res, next) => res.sendFile(path.join(__dirname, 'MP_verify_pOMwKMk4RsznX9Wn.txt')));

// ejs 相关
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// 静态文件
// if (!env.isProd && !env.isDev) {
app.set('views', './views');
app.use(express.static('../'));
// } else {
//   app.set('views', path.join(__dirname, 'rev/views'));
// }

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

// 创建代理 
const frontProxy = projectConfig.server.proxy;
if (frontProxy && frontProxy.length > 0) {
  frontProxy.forEach(pr => {
    // 代理注释
    // /api/foo/bar -> target: http://www.example.org ->  http://www.example.org/api/foo/bar
    // app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
    app.use(pr.baseUrl, proxy({ target: pr.target, changeOrigin: true }));
  });
}

app.listen(projectConfig.server.port);
console.info(`listening port ${projectConfig.server.port}.`);

exports = module.exports = app;
