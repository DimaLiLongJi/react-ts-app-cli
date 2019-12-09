#! /usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const glob = require('glob');
const projectConfig = require('../project.config.json');

function getPageName(filePath, PAGE_FLODER, ENTRY) {
  return filePath.substring(PAGE_FLODER.length + 1, filePath.indexOf(ENTRY) - 1);
}

function checkFinderName(name) {
  const nameList = new Map();

  const jsFinder = path.resolve(__dirname, '../public/pages');
  const jsEntry = 'main.tsx';
  const jsPages = jsFinder + '/**/' + jsEntry;

  glob.sync(jsPages).forEach((entry) => {
    const pageName = getPageName(entry, jsFinder, jsEntry);
    nameList.set(pageName, pageName);
  });

  return nameList.has(name);
}

async function copyTemplate(templatePath, targetPath) {
  try {
    const paths = fs.readdirSync(templatePath);
    paths.forEach(async (_path) => {
      const _targetPath = path.resolve(targetPath, _path);
      const _templatePath = path.resolve(templatePath, _path);
      console.log('创建中...  ' + _targetPath);
      if (!fs.statSync(_templatePath).isFile()) {
        fs.mkdirSync(_targetPath);
        await copyTemplate(_templatePath, _targetPath);
      } else {
        await copyFile(_targetPath, _templatePath);
      }
    });
  } catch (error) {
    console.log(error);
    console.log('    ', '----------------------------------------');
    console.log('    ', chalk.red('★'), chalk.red('构建失败'));
    console.log('    ', chalk.red('★'), chalk.red(`失败原因: ${error}`));
    return false;
  }
  return true;
}

async function replaceTemplate(targetPath, pathname) {
  try {
    const paths = fs.readdirSync(targetPath);
    paths.forEach(async (_path) => {
      const _targetPath = path.resolve(targetPath, _path);
      console.log('替換中...  ' + _targetPath);
      if (!fs.statSync(_targetPath).isFile()) await replaceTemplate(_targetPath, pathname);
      else await replaceFile(_targetPath, pathname);
    });
  } catch (error) {
    console.log(error);
    console.log('    ', '----------------------------------------');
    console.log('    ', chalk.red('★'), chalk.red('构建失败'));
    console.log('    ', chalk.red('★'), chalk.red(`失败原因: ${error}`));
    return false;
  }
  return true;
}

async function replaceFile(targetPath, pathname) {
  const content = fs.readFileSync(targetPath, 'utf8');
  const needReplacePathToken = pathname;
  const needReplaceUpToken = pathname.toLocaleUpperCase();
  const needReplaceUpLowToken = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const newContent = content.replace(/(\$needReplacePathToken\$)/g, needReplacePathToken)
    .replace(/(\$needReplaceUpToken\$)/g, needReplaceUpToken)
    .replace(/(\$needReplaceUpLowToken\$)/g, needReplaceUpLowToken);
  fs.writeFileSync(targetPath, newContent, { encoding: 'utf8' });
  if (targetPath.indexOf('$needReplacePathToken$') !== -1) {
    fs.renameSync(targetPath, targetPath.replace(/(\$needReplacePathToken\$)/g, needReplacePathToken));
  }
}

async function copyFile(_targetPath, _templatePath) {
  await fs.writeFileSync(_targetPath, fs.readFileSync(_templatePath), 'utf-8');
}

program
  .version('0.1.0')
  .parse(process.argv);

program
  // .command('create')
  .description('创建前端项目')
  .action(async (cmd, option) => {
    // 获取交互 使用哪种语言 并获取项目名
    const answers = await inquirer.prompt([{
      type: 'input',
      message: '设置创建的文件夹名',
      name: 'pathname',
      validate: (val) => {
        const has = checkFinderName(val);
        if (!has) return true;
        else return `文件夹名字：${val} 已存在，请重新输入`;
      },
    }]);
    // 设置模板路径
    let templatePath = path.resolve(__dirname, './template/page');
    // 设置创建目录路径
    let targetPath = path.resolve(__dirname, `../public/pages/${answers.pathname.toLowerCase()}`);
    // store相关
    let storeTemplatePath = path.resolve(__dirname, './template/store');
    let storeTargetPath = path.resolve(__dirname, `../public/typings/store/${answers.pathname.toLowerCase()}`);

    // 创建文件目录
    fs.mkdirSync(targetPath);
    fs.mkdirSync(storeTargetPath);

    // 复制模板
    const templateResult = await copyTemplate(templatePath, targetPath);
    if (templateResult) await replaceTemplate(targetPath, answers.pathname.toLowerCase());
    const storeResult = await copyTemplate(storeTemplatePath, storeTargetPath);
    if (storeResult) await replaceTemplate(storeTargetPath, answers.pathname.toLowerCase());

    const storeIndexPath = path.resolve(__dirname, '../public/typings/store/index.d.ts');
    const storeIndexContent = fs.readFileSync(storeIndexPath, 'utf8');
    const newContent = storeIndexContent
          + `export * from './${answers.pathname.toLowerCase()}/state';\n`
          + `export * from './${answers.pathname.toLowerCase()}/actions';\n`;
    fs.writeFileSync(storeIndexPath, newContent, { encoding: 'utf8' });

    if (templateResult && storeResult) {
      console.log('    ', '----------------------------------------');
      console.log('    ', chalk.green('★'), chalk.green('构建成功'));
      console.info('    ', chalk.green('★'), chalk.green(`请运行 npm start 并在浏览器打开 http://localhost:${projectConfig.server.port}${projectConfig.front.router.baseUrl}/${answers.pathname}`));
    } else {
      console.log('    ', '----------------------------------------');
      console.log('    ', chalk.red('★'), chalk.res(`构建${templateResult ? '页面成功' : '页面失败'}`));
      console.log('    ', chalk.red('★'), chalk.res(`构建${storeResult ? 'redux成功' : 'redux失败'}`));
    }
  });

program.parse(process.argv);
