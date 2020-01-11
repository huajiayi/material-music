import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/page/Login'
import Register from '@/page/Register'
import Profile from '@/page/Profile'
import { SnackbarUtilsConfigurator } from '@/components/Toast'

export default function App() {

  const theme = useSelector(state => state.commonReducer.theme)

  const usertheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: theme,
        },
      }),
    [theme]
  )

  return (
    <ThemeProvider theme={usertheme}>
      <SnackbarProvider 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        autoHideDuration={2000}
      >
        <Router>
          <SnackbarUtilsConfigurator />
          <Layout />
          <Login />
          <Register />
          <Profile />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
}