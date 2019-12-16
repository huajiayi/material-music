import React, { useEffect, useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DarkThemeIcon from '@material-ui/icons/Brightness4'
import LightThemeIcon from '@material-ui/icons/Brightness7'
import Tooltip from '@material-ui/core/Tooltip'
import themeMap from '@/common/theme'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '@/store/common/action'

export default function Theme() {

  const dispatch = useDispatch()

  const theme = useSelector(state => state.commonReducer.theme)

  const _setTheme = useCallback(theme => dispatch(setTheme(theme)), [dispatch])

  const setUserTheme = useCallback(theme => {
    const variables = themeMap[theme]
    Object.keys(variables).forEach(key => {
      const variable = variables[key]
      document.documentElement.style.setProperty(key, variable)
    })

    localStorage.setItem('theme', theme)
  }, []) 

  const changeTheme = useCallback(() => {
    _setTheme(theme === "dark" ? "light" : "dark")
  }, [_setTheme, theme])

  useEffect(() => {
    setUserTheme(theme)
  }, [setUserTheme, theme])

  return (
    <Tooltip title="切换浅色/深色主题">
      <IconButton onClick={changeTheme}>
          {theme === "dark" ? <LightThemeIcon /> : <DarkThemeIcon />}
      </IconButton>
    </Tooltip>
  )
}