import React from 'react'
import Grid from '@material-ui/core/Grid'
import './index.scss'
import coverall from '@/assets/img/coverall.png'

export default function SongListCard({ name, picUrl }) {
  
  return (
    <Grid className="song-list-card" container item xs={4} sm={4} md={3} lg={2}>
      <div className="song-list-img-warp">
        <img className="song-list-img" src={picUrl} alt={name}/>
        <img className="song-list-img-cover" src={coverall} alt="cover"></img>
      </div>
      <span className="song-list-name">{name}</span>
    </Grid>
  )
}