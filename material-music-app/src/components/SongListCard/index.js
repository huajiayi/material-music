import React, { useCallback } from 'react'
import './index.scss'
import coverall from '@/assets/img/coverall.png'
import thumbnail from '@/assets/img/thumbnail.png'
import useHistoryWithName from '@/hook/useHistoryWithName'

export default function SongListCard({ id, name, picUrl }) {

  const history = useHistoryWithName()
  
  const handleShowDetail = useCallback(() => history.push(`/song-list/${id}`), [history, id])

  return (
    <div className="song-list-card" onClick={handleShowDetail}>
      <div className="song-list-img-warp">
        <img className="song-list-img lazy" src={thumbnail} data-src={picUrl} alt={name}/>
        <img className="song-list-img-cover" src={coverall} alt="cover"></img>
      </div>
      <span className="song-list-name">{name}</span>
    </div>
  )
}