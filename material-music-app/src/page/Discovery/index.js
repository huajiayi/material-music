import React from 'react'
import NewSongList from './components/NewSongList'
import NewSong from './components/NewSong'
import './index.scss'

function Discovery() {

  return (
    <div className="discovery">
      <NewSongList />
      <NewSong />
    </div>
  )
}

export default Discovery