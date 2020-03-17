#! /usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const glob = require('glob');

function getPageName(filePath, PAGE_FLODER, ENTRY) {
  return filePath.substring(PAGE_FLODER.length + 1, filePath.indexOf(ENTRY) - 1);
}

function checkFinderName(name) {
  const nameList = new Map();

  const jsFinder = path.resolve(__dirname, '../public/components');
  const jsEntry = 'index.tsx';
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
  const needReplaceUpLowToken = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const newContent = content.replace(/(\$ComponentName\$)/g, needReplaceUpLowToken);
  fs.writeFileSync(targetPath, newContent, { encoding: 'utf8' });
}

async function copyFile(_targetPath, _templatePath) {
  await fs.writeFileSync(_targetPath, fs.readFileSync(_templatePath), 'utf-8');
}

program
  .version('0.1.0')
  .parse(process.argv);

program
  .description('创建组件')
  .action(async (cmd, option) => {
    // 获取交互 使用哪种语言 并获取项目名
    const answers = await inquirer.prompt([{
      type: 'list',
      name: 'componentChoice',
      message: '请选择组件类型',
      choices: [
        {
          name: 'Class组件',
          value: 'class',
        },
        {
          name: 'Functional组件',
          value: 'functional',
        },
      ],
    }, {
      type: 'input',
      message: '创建的组件名',
      name: 'pathname',
      validate: (val) => {
        const has = checkFinderName(val);
        if (has) return `项目文件夹：${val} 已存在，请重新输入`; 
        if (!/^\w+$/.test(val)) return '项目名只能使用英文数字及_字符';
        return true;
      },
    }]);
    const projectName = answers.pathname.toLowerCase();
    // 设置模板路径
    let templatePath = '';
    if (answers.componentChoice === 'class') {
      templatePath = path.resolve(__dirname, './template/components/class');
    } else {
      templatePath = path.resolve(__dirname, './template/components/function');
    }
    // 设置创建目录路径
    let targetPath = path.resolve(__dirname, `../public/components/${projectName}`);

    // 创建文件目录
    fs.mkdirSync(targetPath);

    // 复制模板
    const templateResult = await copyTemplate(templatePath, targetPath);

    if (templateResult) {
      await replaceTemplate(targetPath, projectName);
      console.log('    ', '----------------------------------------');
      console.log('    ', chalk.green('★'), chalk.green('构建成功'));
    } else {
      console.log('    ', '----------------------------------------');
      console.log('    ', chalk.red('★'), chalk.res(`构建${templateResult ? '组件成功' : '组件失败'}`));
    }
  });

program.parse(process.argv);
