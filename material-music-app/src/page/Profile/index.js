import React, { useState, useRef, useCallback, useEffect } from 'react'
import './index.scss'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useSelector, useDispatch } from 'react-redux'
import { setShowProfilePage } from '@/store/common/action'
import { setUser } from '@/store/user/action'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ResponsiveDialog from '../../components/ResponsiveDialog'
import Avatar from '@material-ui/core/Avatar'
import { logout, updateUserInfo } from '@/api'
import Toast from '@/components/Toast'

export default function Register() {

  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [canEdit, setCanEdit] = useState(false)
  const avatarInput = useRef(null)
  
  const user = useSelector(state => state.userReducer.user)

  const showProfilePage = useSelector(state => state.commonReducer.showProfilePage)

  const _setShowProfilePage = useCallback(showRegisterPage => dispatch(setShowProfilePage(showRegisterPage)), [dispatch])
  const _setUser = useCallback(user => dispatch(setUser(user)), [dispatch])

  const handleChangeAvatar = useCallback(() => (canEdit && avatarInput.current.click()), [canEdit])
  const validate = useCallback(file => {
    if (!/^image\//.test(file.type)) return '只能上传图片'
    if (file.size > (2 * 1024 * 1024)) return '图片不能大于2MB'
  }, [])
  const handleAvatarChanged = useCallback(() => {
    const file = avatarInput.current.files[0]
    const errMsg = validate(file)
    if (errMsg) {
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
  const handleEdit = useCallback(() => setCanEdit(true), [])
  const handleLogout = useCallback(async () => {
    const isSuccess = await logout()
    if(isSuccess) {
      localStorage.removeItem("userId")
      _setUser({})
      _setShowProfilePage(false)
    }
  }, [_setShowProfilePage, _setUser])
  const handleConfirm = useCallback(async () => {
    if(username === '' || password === '' || nickname === '') {
      Toast.error('值不能为空')
      return
    }
    const data = new FormData()
    let file = avatarInput.current.files[0]
    if(file) data.append('avatar', file)
    data.append('password', password)
    data.append('nickname', nickname)
    const isSuccess = await updateUserInfo(data)
    if (isSuccess) {
      _setUser({
        ...user,
        avatarUrl: avatar,
        password,
        nickname
      })
      _setShowProfilePage(false)
      setCanEdit(false)
    }
  }, [_setShowProfilePage, _setUser, avatar, nickname, password, user, username])

  useEffect(() => {
    if(!showProfilePage) {
      setShowPassword(false)
      setCanEdit(false)
    }
    setAvatar(user.avatarUrl || '')
    setUsername(user.username || '')
    setPassword(user.password || '')
    setNickname(user.nickname || '')
  }, [user, showProfilePage])

  return (
    <ResponsiveDialog
      title="个人信息"
      showDialog={showProfilePage}
      setShowDialog={_setShowProfilePage}
    >
      <DialogContent>
        <input className="avatar-input" ref={avatarInput} type="file" accept="image/*" onChange={handleAvatarChanged}></input>
        <div className="login-avatar-container">
          <Avatar className="avatar" src={avatar} onClick={handleChangeAvatar} />
        </div>
        <FormControl className="form" fullWidth disabled>
          <InputLabel htmlFor="standard-adornment-username">用户名</InputLabel>
          <Input
            id="standard-adornment-username"
            value={username}
            onChange={handleChangeUsername}
          />
        </FormControl>
        <FormControl className="form" fullWidth disabled={!canEdit}>
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
        <FormControl className="form" fullWidth disabled={!canEdit}>
          <InputLabel htmlFor="standard-adornment-nickname">昵称</InputLabel>
          <Input
            id="standard-adornment-nickname"
            value={nickname}
            onChange={handleChangeNickname}
          />
        </FormControl>
      </DialogContent>
      <DialogActions className="dialog-actions">
        {canEdit ? (
          <Button onClick={handleConfirm} color="default">
            确定
          </Button>
        ) : (
          <Button onClick={handleEdit} color="default">
            编辑
          </Button>
        )}
        <Button onClick={handleLogout} color="default">
          注销
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}