import React from 'react'
import Grid from '@material-ui/core/Grid'
import './index.scss'
import coverall from '@/assets/img/coverall.png'

export default function SongListCard({ id, name, picUrl, author, album }) {
  
  return (
    <Grid className="song-card" container item xs={12} md={6}>
      <span className="song-id">{id}</span>
      <div className="song-img-warp">
        <img className="song-img" src={picUrl} alt={name}/>
        <img className="song-img-cover" src={coverall} alt="cover"></img>
      </div>
      <div className="song-warp">
        <span className="song-name">{name}</span>
        <span className="song-detail">{author} - {album}</span>
      </div>
      
    </Grid>
  )
}