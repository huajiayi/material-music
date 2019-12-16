import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import SongCard from '@/components/SongCard'
import { getNewSongs } from '@/api'
import Title from '@/components/Title'

export default function NewSong() {

  const [list, setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getNewSongs()
      setList(result)
      console.log(result)
    }
    fetchData()
  }, [])

  return (
    <>
      <Title>最新音乐</Title>
      <Grid container>
        {list.map((songWrap, index) => <SongCard
          key={songWrap.id}
          id={index + 1}
          name={songWrap.song.name}
          picUrl={songWrap.picUrl}
          author={songWrap.song.artists[0].name}
          album={songWrap.song.album.name}
        />)}
      </Grid>
    </>
  )
}