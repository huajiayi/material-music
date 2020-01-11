import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'

export default function SongListDetail() {
  const [detail, setDetail] = useState({})

  return (
    <div className="song-list-detail">
      <img className="img" src={detail.picUrl} alt="" />
      <div className="detail">
        <span>{detail.name}</span>
        <div>
          <Avatar src={detail.author.picUrl}/>
          <span>{detail.author.name}</span>
          <span>{detail.createTime}</span>
        </div>
      </div>
    </div>
  )
}