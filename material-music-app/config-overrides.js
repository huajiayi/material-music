const path = require('path')

const resolve = p => path.resolve(__dirname, p)

module.exports = function override(config, env) {
  // 全局引用scss
  config.module.rules[2].oneOf[5].use.push({
    loader: 'sass-resources-loader',
    options: {
      resources: [
        // 这里按照你的文件路径填写
        resolve('src/style/mixin.scss'),
        resolve('src/style/variables.scss')
      ]
    }
  })

  // 路径别名
  config.resolve.alias['@'] = resolve('src')
  return config;
}