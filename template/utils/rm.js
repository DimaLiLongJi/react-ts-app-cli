#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

function delDir(rmPath, excludeFinder) {
  let files = [];
  if (fs.existsSync(rmPath)) {
    files = fs.readdirSync(rmPath);
    files.forEach((file, index) => {
      let curPath = rmPath + path.sep + file;
      // 如果是文件夹则递归删除文件
      if (fs.statSync(curPath).isDirectory()) {
        if (file === excludeFinder) return;
        delDir(curPath); //递归删除文件夹内恩建
        fs.rmdirSync(curPath); // 删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
  }
}

const staticPath = path.resolve(__dirname, '../static');

delDir(staticPath, 'common');
