import React, { useMemo, useCallback, useEffect, useState } from 'react'
import ProgressBar from '@/base/ProgressBar'
import SongPic from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PrevIcon from '@material-ui/icons/SkipPrevious'
import NextIcon from '@material-ui/icons/SkipNext'
import IconButton from '@material-ui/core/IconButton'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
// import PlaylistIcon from '@material-ui/icons/PlaylistPlay'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CollectIcon from '@material-ui/icons/Queue'
import PauseIcon from '@material-ui/icons/PauseCircleOutline'
import { useSelector } from 'react-redux'
import { useAudio } from 'react-use'
import { percent } from '@/common/utils'
import { useDispatch } from 'react-redux'
import { setShowCollectSongPage } from '@/store/common/action'
import { prevSong, nextSong } from '@/store/music/action'
import { hasLogin } from '@/common/utils'
import Toast from '@/components/Toast'
import { useHistory } from 'react-router-dom'
import { getSongUrl } from '@/api'
import './index.scss'

export default function Player() {

  const dispatch = useDispatch()
  const history = useHistory()

  const [songUrl, setSongUrl] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { neteaseId, name, picUrl, author, album } = useSelector(state => state.musicReducer.currentSong)

  const _setShowCollectSongPage = useCallback(showCollectSongPage => dispatch(setShowCollectSongPage(showCollectSongPage)), [dispatch])
  const _prevSong = useCallback(() => dispatch(prevSong()), [dispatch])
  const _nextSong = useCallback(() => dispatch(nextSong()), [dispatch])

  const [audio, state, controls] = useAudio({
    src: songUrl,
    autoPlay: true,
  })

  // 计算百分比
  const percentage = useMemo(() => percent(state.time, state.duration), [state.duration, state.time])

  const progressChanged = useCallback(value => {
    controls.seek(state.duration * (value / 100))
  }, [controls, state.duration])

  const handleCollect = useCallback(() => {
    if (!hasLogin()) {
      Toast.error("请先登录！")
      history.push('/login')
      return
    }

    _setShowCollectSongPage(true)
  }, [_setShowCollectSongPage, history])

  const handleOpenMenu = useCallback(event => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  useEffect(() => {
    const getSongUrlSync = async () => {
      if (!neteaseId) return

      const res = await getSongUrl(neteaseId)
      if (!res.data[0].url) {
        Toast.error('歌曲无法播放')
        return
      }

      const songUrl = res.data[0].url
      setSongUrl(songUrl)
    }

    getSongUrlSync()
  }, [neteaseId])

  useEffect(() => {
    if (percentage >= 100) {
      _nextSong()
    }
  }, [_nextSong, percentage])

  return (
    <>
      {audio}
      <div className="progress-bar-wrap">
        <ProgressBar value={percentage} onChange={progressChanged} className="progress-bar" />
      </div>
      <div className="player">
        <div className="player-left">
          <SongPic src={`${picUrl}?param=120y120`} />
          <div className="player-song-warp">
            <span className="player-song-name">{name}</span>
            <span className="player-song-detail">{author} - {album}</span>
          </div>
        </div>
        <div className="player-right">
          <IconButton edge="start" color="default" onClick={handleOpenMenu}>
            <MoreVertIcon className="player-icon" />
          </IconButton>
          {state.paused ? (
            <IconButton edge="start" color="default" className="play-icon" onClick={controls.play}>
              <PlayIcon className="player-icon" />
            </IconButton>)
            : (
              <IconButton edge="start" color="default" className="play-icon" onClick={controls.pause}>
                <PauseIcon className="player-icon" />
              </IconButton>)}
        </div>
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCollect}>
          <CollectIcon className="menu-item-icon"/>
          收藏到歌单
        </MenuItem>
        <MenuItem onClick={_prevSong}>
          <PrevIcon className="menu-item-icon"/>
          上一首
        </MenuItem>
        <MenuItem onClick={_nextSong}>
          <NextIcon className="menu-item-icon"/>
          下一首
        </MenuItem>
      </Menu>
    </>
  )
}