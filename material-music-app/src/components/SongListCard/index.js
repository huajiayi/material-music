import React from 'react'
import './index.scss'
import coverall from '@/assets/img/coverall.png'
import thumbnail from '@/assets/img/thumbnail.png'

export default function SongListCard({ name, picUrl }) {
  
  return (
    <>
      <div className="song-list-img-warp">
        <img className="song-list-img lazy" src={thumbnail} data-src={picUrl} alt={name}/>
        <img className="song-list-img-cover" src={coverall} alt="cover"></img>
      </div>
      <span className="song-list-name">{name}</span>
    </>
  )
}