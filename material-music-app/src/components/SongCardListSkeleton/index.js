import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export default function SongCardListSkeleton() {
  
  return (
    <div className="song-list-card">
      <div className="song-list-img-warp">
        <Skeleton className="song-list-img" variant="rect"/>
      </div>
      <Skeleton style={{ marginTop: "10px" }} width="100%" />
    </div>  )
}