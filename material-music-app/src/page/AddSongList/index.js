import React, { useState, useRef, useCallback, useEffect } from 'react'
import './index.scss'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useSelector, useDispatch } from 'react-redux'
import { setShowAddSongListPage } from '@/store/common/action'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import ResponsiveDialog from '../../components/ResponsiveDialog'
import Avatar from '@material-ui/core/Avatar'
import defaultAvatar from '@/assets/img/defaultAvatar.jpg'
import { addSongList } from '@/api'
import Toast from '@/components/Toast'
import { base64toBlob } from '@/common/utils'
import { useLocation } from 'react-router-dom'
import useHistoryWithName from '@/hook/useHistoryWithName'

export default function AddSongList() {

  const dispatch = useDispatch()
  const history = useHistoryWithName()
  const location = useLocation()

  const [songListPic, setSongListPic] = useState(defaultAvatar)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const songListPicInput = useRef(null)

  const showAddSongListPage = useSelector(state => state.commonReducer.showAddSongListPage)

  const _setShowAddSongListPage = useCallback(showAddSongListPage => dispatch(setShowAddSongListPage(showAddSongListPage)), [dispatch])

  const handleChangeAvatar = useCallback(() => songListPicInput.current.click(), [])
  const validate = useCallback(file => {
    if(!/^image\//.test(file.type)) return '只能上传图片'
    if(file.size > (2 * 1024 * 1024)) return '图片不能大于2MB'
  }, [])
  const handleAvatarChanged = useCallback(() => {
    const file = songListPicInput.current.files[0]
    const errMsg = validate(file)
    if(errMsg) {
      Toast.error(errMsg)
      return
    }
    var reader = new FileReader()
    reader.onload = e => {
      setSongListPic(e.target.result)
    }
    reader.readAsDataURL(file)
  }, [validate])
  const handleChangeName = useCallback(e => setName(e.target.value), [])
  const handleChangeDescription = useCallback(e => setDescription(e.target.value), [])
  const reset = useCallback(() => {
    setSongListPic(defaultAvatar)
    setName('')
    setDescription('')
  }, [])
  const handleConfirm = useCallback(async () => {
    if(name === '' || description === '') {
      Toast.error('值不能为空')
      return
    }
    const data = new FormData()
    let file = songListPic === defaultAvatar ? base64toBlob(songListPic) : songListPicInput.current.files[0]
    data.append('songListPic', file)
    data.append('name', name)
    data.append('description', description)
    const isSuccess = await addSongList(data)
    if(isSuccess) {
      history.push('/add-song-list')
      window.location.reload()
    }
  }, [description, history, name, songListPic])

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    _setShowAddSongListPage(location.pathname === '/add-song-list' ? true : false) 
  }, [_setShowAddSongListPage, location])

  return (
    <ResponsiveDialog
      title="新建歌单"
      showDialog={showAddSongListPage}
    >
      <DialogContent>
        <input className="avatar-input" ref={songListPicInput} type="file" accept="image/*" onChange={handleAvatarChanged}></input>
        <div className="login-avatar-container">
          <Avatar className="avatar" src={songListPic} onClick={handleChangeAvatar}/>
        </div>
        <FormControl className="form" fullWidth>
          <InputLabel htmlFor="standard-adornment-username">标题</InputLabel>
          <Input
            id="standard-adornment-username"
            value={name}
            onChange={handleChangeName}
          />
        </FormControl>
        <FormControl className="form" fullWidth>
          <InputLabel htmlFor="standard-adornment-nickname">简介</InputLabel>
          <Input
            id="standard-adornment-nickname"
            value={description}
            onChange={handleChangeDescription}
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