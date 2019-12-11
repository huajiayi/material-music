import React from 'react'
import Layout from './layout'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { setTheme } from '@/store/common/action'
import Login from './page/Login'
import Register from './page/Register'

function App({ theme, setTheme }) {

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
      <Layout />
      <Login />
      <Register />
    </ThemeProvider>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App)