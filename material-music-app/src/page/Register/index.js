import React, { useState } from 'react'
import './index.scss'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { setShowRegisterPage } from '@/store/common/action'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ResponsiveDialog from '../../components/ResponsiveDialog'
import Avatar from '@material-ui/core/Avatar'

function Register({ showRegisterPage, setShowRegisterPage }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
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

  const handleChangeNickname = e => {
    setNickname(e.target.value)
  }

  const handleClose = () => {
    setShowRegisterPage(false)
  }

  return (
    <ResponsiveDialog
      showDialog={showRegisterPage}
      setShowDialog={setShowRegisterPage}
    >
      <DialogTitle>注册</DialogTitle>
      <DialogContent>
        <div className="login-avatar-container">
          <Avatar className="avatar" src="https://p3.music.126.net/ma8NC_MpYqC-dK_L81FWXQ==/109951163250233892.jpg?param=80y80" />
        </div>
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
        <FormControl className="form" fullWidth>
          <InputLabel htmlFor="standard-adornment-nickname">昵称</InputLabel>
          <Input
            id="standard-adornment-nickname"
            value={nickname}
            onChange={handleChangeNickname}
          />
        </FormControl>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleClose} color="default">
          确定
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

const mapStateToProps = state => {
  return {
    showRegisterPage: state.commonReducer.showRegisterPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setShowRegisterPage: showRegisterPage => dispatch(setShowRegisterPage(showRegisterPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)