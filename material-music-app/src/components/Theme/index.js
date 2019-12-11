import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DarkThemeIcon from '@material-ui/icons/Brightness4'
import LightThemeIcon from '@material-ui/icons/Brightness7'
import Tooltip from '@material-ui/core/Tooltip'
import themeMap from '@/common/theme'
import { connect } from 'react-redux'
import { setTheme } from '@/store/common/action'

function Theme({ theme, setTheme }) {

  const setUserTheme = theme => {
    const variables = themeMap[theme]
    Object.keys(variables).forEach(key => {
      const variable = variables[key]
      document.documentElement.style.setProperty(key, variable)
    })

    localStorage.setItem('theme', theme)
  }

  useEffect(() => {
    setUserTheme(theme)
  }, [theme])

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  
  return (
    <Tooltip title="切换浅色/深色主题">
      <IconButton onClick={changeTheme}>
          {theme === "dark" ? <LightThemeIcon /> : <DarkThemeIcon />}
      </IconButton>
    </Tooltip>
  )
}

const mapStateToProps = state => {
  return {
    theme: state.commonReducer.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTheme: theme => dispatch(setTheme(theme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)