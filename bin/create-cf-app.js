#! /usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');

const templatePath = path.resolve(__dirname, '../template');
const cwdPath = process.cwd();

program
  .version('0.1.0')
  .parse(process.argv);

program
  .command('init')
  .description('create a react-app with typescript')
  .action((cmd, option) => {
    const result = copyTemplate(templatePath, cwdPath);
    if (result) console.log('create cf app has finished');
    if (!result) console.log('create cf app failed');
  });

async function copyTemplate(templatePath, targetPath) {
  try {
    const paths = fs.readdirSync(templatePath);
    paths.forEach(_path => {
      const _targetPath = path.resolve(targetPath, _path);
      const _templatePath = path.resolve(templatePath, _path);
      console.log("creating..." + _targetPath);
      if (!fs.statSync(_templatePath).isFile()) {
        fs.mkdirSync(_targetPath);
        copyTemplate(_templatePath, _targetPath);
      } else {
        copyFile(_targetPath, _templatePath);
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

async function copyFile(_targetPath, _templatePath) {
  await fs.writeFileSync(_targetPath, fs.readFileSync(_templatePath), "utf-8");
}
program.parse(process.argv);
