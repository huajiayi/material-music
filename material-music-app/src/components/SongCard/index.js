import React from 'react'
import coverall from '@/assets/img/coverall.png'
import thumbnail from '@/assets/img/thumbnail.png'
import './index.scss'

export default function SongListCard({ id, name, picUrl, author, album }) {
  
  return (
    <>
      <span className="song-id">{id}</span>
      <div className="song-img-warp">
        <img className="song-img lazy" src={thumbnail} data-src={`${picUrl}?param=120y120`} alt={name}/>
        <img className="song-img-cover" src={coverall} alt="cover"></img>
      </div>
      <div className="song-warp">
        <span className="song-name">{name}</span>
        <span className="song-detail">{author} - {album}</span>
      </div>
    </>
  )
}