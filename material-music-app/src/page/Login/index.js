import React, { useState, useCallback, useEffect } from 'react'
import './index.scss'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useSelector, useDispatch } from 'react-redux'
import { setShowLoginPage, setShowRegisterPage } from '@/store/common/action'
import { setUser } from '@/store/user/action'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ResponsiveDialog from '../../components/ResponsiveDialog'
import { login } from '@/api'
import Toast from '@/components/Toast'

export default function Login() {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const showLoginPage = useSelector(state => state.commonReducer.showLoginPage)

  const _setShowLoginPage = useCallback(showLoginPage => dispatch(setShowLoginPage(showLoginPage)), [dispatch])
  const _setShowRegisterPage = useCallback(showRegisterPage => dispatch(setShowRegisterPage(showRegisterPage)), [dispatch])
  const _setUser = useCallback(user => dispatch(setUser(user)), [dispatch])

  const handleChangeUsername = useCallback(e => setUsername(e.target.value), [])
  const handleChangePassword = useCallback(e => setPassword(e.target.value), [])
  const toggleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword])
  const handleMouseDownPassword = useCallback(e => e.preventDefault(), [])
  const reset = useCallback(() => {
    setUsername('')
    setPassword('')
    setShowPassword(false)
  }, [])
  const handleRegister = useCallback(() => {
    _setShowLoginPage(false)
    _setShowRegisterPage(true)
  }, [_setShowLoginPage, _setShowRegisterPage])
  const handleConfirm = useCallback(async () => {
    if(username === '' || password === '') {
      Toast.error('值不能为空')
      return
    } 
    const user = await login({
      username,
      password
    })
    if(user) {
      _setUser({
        ...user,
        password
      })
      _setShowLoginPage(false)
      localStorage.setItem("userId", user.id)
    }
  }, [_setShowLoginPage, _setUser, password, username])

  useEffect(() => {
    reset()
  }, [reset, showLoginPage])

  return (
    <ResponsiveDialog
      title="登录"
      showDialog={showLoginPage}
      setShowDialog={_setShowLoginPage}
    >
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
        <Button onClick={handleConfirm} color="default">
          确定
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}