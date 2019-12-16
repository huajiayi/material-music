import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import SongListCard from '@/components/SongListCard'
import { getPersonalized } from '@/api'
import Title from '@/components/Title'

export default function NewSongList() {

  const [list, setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getPersonalized({ limit: 12 })
      setList(result)
    }
    fetchData()
  }, [])

  return (
    <>
      <Title>推荐歌单</Title>
      <Grid container>
        {list.map(songList => <SongListCard
          key={songList.id}
          name={songList.name}
          picUrl={songList.picUrl}
        />)}
      </Grid>
    </>
  )
}