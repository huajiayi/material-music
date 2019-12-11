const theme = {}
const requireTheme = require.context('@/style/theme', false, /[a-z0-9]+\.theme\.js$/i)

requireTheme.keys().forEach(fileName => {
  const themeFile = requireTheme(fileName)
  const name = themeFile.default.name
  theme[name] = themeFile.default.variables
})

export default theme