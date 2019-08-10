module.exports = [
  {
    type: 'list',
    message: 'select a project template',
    name: 'template',
    choices: ['vue', 'react', 'alipay-miniapp', 'wechat-miniapp'],
  },
  {
    type: 'input',
    message: 'input the project name',
    name: 'name',
    default: 'xz-init-project',
  },
  {
    type: 'input',
    message: 'input the project description',
    name: 'description',
    when: answers => {
      return answers.template === 'vue' || answers.template === 'react'
    }
  },
  {
    type: 'input',
    message: 'input the author',
    name: 'author',
    when: answers => {
      return answers.template === 'vue' || answers.template === 'react'
    }
  }
]