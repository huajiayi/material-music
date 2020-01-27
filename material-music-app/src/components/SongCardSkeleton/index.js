import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export default function SongCardSkeleton() {
  
  return (
    <div className="song-card">
      <Skeleton width="5%"/>
      <Skeleton style={{ marginLeft: "10px" }} variant="rect" width={80} height={80} />
      
      <div className="song-warp">
        <Skeleton width="25%"/>
        <Skeleton width="50%"/>
      </div>
    </div>
  )
}