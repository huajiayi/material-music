import React, { useState, useRef, useCallback, useEffect } from 'react'
import './index.scss'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useSelector, useDispatch } from 'react-redux'
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
import defaultAvatar from '@/assets/img/defaultAvatar.jpg'
import { register } from '@/api'
import Toast from '@/components/Toast'
import { base64toBlob } from '@/common/utils'
import { useLocation } from 'react-router-dom'
import useHistoryWithName from '@/hook/useHistoryWithName'

export default function Register() {

  const dispatch = useDispatch()
  const history = useHistoryWithName()
  const location = useLocation()

  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const avatarInput = useRef(null)

  const showRegisterPage = useSelector(state => state.commonReducer.showRegisterPage)

  const _setShowRegisterPage = useCallback(showRegisterPage => dispatch(setShowRegisterPage(showRegisterPage)), [dispatch])

  const handleChangeAvatar = useCallback(() => avatarInput.current.click(), [])
  const validate = useCallback(file => {
    if(!/^image\//.test(file.type)) return '只能上传图片'
    if(file.size > (2 * 1024 * 1024)) return '图片不能大于2MB'
  }, [])
  const handleAvatarChanged = useCallback(() => {
    const file = avatarInput.current.files[0]
    const errMsg = validate(file)
    if(errMsg) {
      Toast.error(errMsg)
      return
    }
    var reader = new FileReader()
    reader.onload = e => {
      setAvatar(e.target.result)
    }
    reader.readAsDataURL(file)
  }, [validate])
  const handleChangeUsername = useCallback(e => setUsername(e.target.value), [])
  const handleChangePassword = useCallback(e => setPassword(e.target.value), [])
  const toggleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword])
  const handleMouseDownPassword = useCallback(e => e.preventDefault(), [])
  const handleChangeNickname = useCallback(e => setNickname(e.target.value), [])
  const reset = useCallback(() => {
    setAvatar(defaultAvatar)
    setUsername('')
    setPassword('')
    setNickname('')
    setShowPassword(false)
  }, [])
  const handleConfirm = useCallback(async () => {
    if(username === '' || password === '' || nickname === '') {
      Toast.error('值不能为空')
      return
    }
    const data = new FormData()
    let file = avatar === defaultAvatar ? base64toBlob(avatar) : avatarInput.current.files[0]
    data.append('avatar', file)
    data.append('username', username)
    data.append('password', password)
    data.append('nickname', nickname)
    const isSuccess = await register(data)
    if(isSuccess) {
      history.push('/login')
    }
  }, [avatar, history, nickname, password, username])

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    _setShowRegisterPage(location.pathname === '/register' ? true : false) 
  }, [_setShowRegisterPage, location])

  return (
    <ResponsiveDialog
      title="注册"
      showDialog={showRegisterPage}
    >
      <DialogContent>
        <input className="avatar-input" ref={avatarInput} type="file" accept="image/*" onChange={handleAvatarChanged}></input>
        <div className="login-avatar-container">
          <Avatar className="avatar" src={avatar} onClick={handleChangeAvatar}/>
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
        <Button onClick={handleConfirm} color="default">
          确定
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}