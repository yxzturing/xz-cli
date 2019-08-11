module.exports = [
  {
    type: 'list',
    message: 'please select a project template',
    name: 'template',
    choices: ['vue', 'react', 'alipay-miniapp', 'wechat-miniapp'],
  },
  {
    type: 'input',
    message: 'please input the project name',
    name: 'name',
    default: 'xz-init-project',
  },
  {
    type: 'input',
    message: 'please input the project description',
    name: 'description',
    when: answers => {
      return answers.template === 'vue' || answers.template === 'react'
    }
  },
  {
    type: 'input',
    message: 'please input the author',
    name: 'author',
    when: answers => {
      return answers.template === 'vue' || answers.template === 'react'
    }
  }
]