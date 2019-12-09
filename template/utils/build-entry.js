const glob = require('glob');
const path = require('path');

const ENTRY = 'main.tsx';
const PAGE_FLODER = path.resolve(__dirname, '../public/pages');
const PAGES = PAGE_FLODER + '/**/' + ENTRY;

/**
 * 初始化 pages 下所有的页面
 *
 * @returns {{}}
 */
function initEntry() {
  const pageMap = {};
  glob.sync(PAGES).forEach((entry) => {
    const pageName = getPageName(entry, PAGE_FLODER, ENTRY);
    pageMap[pageName] = entry;
  });
  return pageMap;
}

/**
 * 获取目录名字
 *
 * @param {string} filePath
 * @param {string} PAGE_FLODER
 * @param {string} ENTRY
 * @returns
 */
function getPageName(filePath, PAGE_FLODER, ENTRY) {
  return filePath.substring(PAGE_FLODER.length + 1, filePath.indexOf(ENTRY) - 1);
}

module.exports = {
  initEntry,
};
