const theme = {}
const requireTheme = require.context('@/style/theme', false, /[a-z0-9]+\.theme\.js$/i)

// 获取 src/style/theme 目录下的所有theme文件
requireTheme.keys().forEach(fileName => {
  const themeFile = requireTheme(fileName)
  const name = themeFile.default.name
  theme[name] = themeFile.default.variables
})

export default theme