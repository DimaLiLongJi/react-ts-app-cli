'use strict';

/*
 ! 需要注意的一点是可能同时存在多个 isXxx 为 true
 ! 例如在 dev 分支提交到 jenkins 时，此时测试使用的的环境为 dev-mocha 此时 isMocha 和 isDev 同时为 true
*/

let env = process.env.NODE_ENV;

const isMocha = env === 'mocha' || env === 'dev-mocha' || env === 'master-mocha' || !env;
const isDev = env === 'develop' || env === 'dev' || env === 'dev-mocha';
const isProd = env === 'production' || env === 'prod' || env === 'master-mocha';

exports = module.exports = {
  isMocha: isMocha,
  isProd: isProd,
  isDev: isDev,
};
