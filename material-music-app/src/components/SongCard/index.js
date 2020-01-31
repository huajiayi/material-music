import React, { useCallback } from 'react'
import coverall from '@/assets/img/coverall.png'
import thumbnail from '@/assets/img/thumbnail.png'
import { useDispatch } from 'react-redux'
import { addSong } from '@/api'
import { setCurrentSong } from '@/store/music/action'
import './index.scss'

export default function SongListCard({ id, neteaseId, name, picUrl, author, album, duration }) {

  const dispatch = useDispatch()

  const _setCurrentSong = useCallback(song => dispatch(setCurrentSong(song)), [dispatch])

  const play = useCallback(async () => {
    await addSong({
      neteaseId,
      name,
      picUrl,
      author,
      album,
      songUrl: '',
      duration
    })

    _setCurrentSong({
      neteaseId,
      name,
      picUrl,
      author,
      album
    })
  }, [_setCurrentSong, album, author, duration, name, neteaseId, picUrl])

  return (
    <div className="song-card" onClick={play}>
      <span className="song-id">{id}</span>
      <div className="song-img-warp">
        <img className="song-img lazy" src={thumbnail} data-src={`${picUrl}?param=120y120`} alt="" />
        <img className="song-img-cover" src={coverall} alt="cover"></img>
      </div>
      <div className="song-warp">
        <span className="song-name">{name}</span>
        <span className="song-detail">{author} - {album}</span>
      </div>
    </div>
  )
}