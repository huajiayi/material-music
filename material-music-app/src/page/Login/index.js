import React, { useState } from 'react'
import './index.scss'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { setShowLoginPage, setShowRegisterPage } from '@/store/common/action'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ResponsiveDialog from '../../components/ResponsiveDialog'

function Login({ showLoginPage, setShowLoginPage, setShowRegisterPage }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChangeUsername = e => {
    setUsername(e.target.value)
  }

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = e => {
    e.preventDefault()
  }

  const handleClose = () => {
    setShowLoginPage(false)
  }

  const handleRegister = () => {
    setShowLoginPage(false)
    setShowRegisterPage(true)
  }

  return (
    <ResponsiveDialog
      showDialog={showLoginPage}
      setShowDialog={setShowLoginPage}
    >
      <DialogTitle>登录</DialogTitle>
      <DialogContent>
        <FormControl className="form" fullWidth>
          <InputLabel htmlFor="standard-adornment-username">用户名</InputLabel>
          <Input
            id="standard-adornment-username"
            value={username}
            onChange={handleChangeUsername}
          />
        </FormControl>
        <FormControl className="form" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">密码</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleRegister} color="default">
          注册
        </Button>
        <Button onClick={handleClose} color="default">
          确定
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

const mapStateToProps = state => {
  return {
    showLoginPage: state.commonReducer.showLoginPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setShowLoginPage: showLoginPage => dispatch(setShowLoginPage(showLoginPage)),
    setShowRegisterPage: showRegisterPage => dispatch(setShowRegisterPage(showRegisterPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)