import React, { useMemo, useCallback } from 'react'
import ProgressBar from '@/base/ProgressBar'
import SongPic from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
// import PlaylistIcon from '@material-ui/icons/PlaylistPlay'
import CollectIcon from '@material-ui/icons/Queue'
import PauseIcon from '@material-ui/icons/PauseCircleOutline'
import { useSelector } from 'react-redux'
import { useAudio } from 'react-use'
import { percent } from '@/common/utils'
import { useDispatch } from 'react-redux'
import { setShowCollectSongPage } from '@/store/common/action'
import { hasLogin } from '@/common/utils'
import Toast from '@/components/Toast'
import { useHistory } from 'react-router-dom'
import './index.scss'

export default function Player() {

  const dispatch = useDispatch()
  const history = useHistory()

  const { name, picUrl, author, album, url } = useSelector(state => state.musicReducer.currentSong)

  const _setShowCollectSongPage = useCallback(showCollectSongPage => dispatch(setShowCollectSongPage(showCollectSongPage)), [dispatch])

  const [audio, state, controls] = useAudio({
    src: url,
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
          <IconButton edge="start" color="default" onClick={handleCollect}>
            <CollectIcon className="player-icon" />
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
    </>
  )
}