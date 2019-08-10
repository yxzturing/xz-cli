#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const symbol = require('log-symbols')
const download = require('download-git-repo')
const fs = require('fs')
const handlebars = require('handlebars')
const version = require('../package.json').version
const prompList = require('../src/promp')
const templateUrl = require('../src/template')

program
  .version(version, '-v, --version')
  .command('init')
  .description('init a project')
  .action(() => {
    inquirer.prompt(prompList).then(answers => {
      if (fs.existsSync(answers.name)) {
        // 已存在同名的项目
        console.log(symbol.error, chalk.red('there is a project with same name, please change a name.'))
        return
      }
      initTemplate(answers)
    })
  })

program.parse(process.argv)

function initTemplate(answers) {
  const { template, name, description, author } = answers
  const { vueUrl, reactUrl, alipayMiniappUrl, wechatMiniappUrl } = templateUrl
  let url = ''
  switch(template) {
    case 'vue':
      url = vueUrl
      break
    case 'react':
      url = reactUrl
      break
    case 'alipay-miniapp':
      url = alipayMiniappUrl
      break
    case 'wechat-miniapp':
      url = wechatMiniappUrl
      break
    default:
  }
  const spinner = ora(`downloading ${template} template...`)
  spinner.start()
  download(url, name, err => {
    if (!err) {
      spinner.succeed()
      const meta = {
        name,
        description,
        author,
      }
      const fileName = `${name}/package.json`
      if (fs.existsSync(fileName)) {
        const content = fs.readFileSync(fileName).toString()
        const result = handlebars.compile(content)(meta)
        fs.writeFileSync(fileName, result)
      }
      console.log(symbol.success, chalk.green(`init ${name} successfuly`))
    } else {
      spinner.fail()
      console.log(symbol.error, chalk.red('download template error'))
      console.log(err)
    }
  })
}