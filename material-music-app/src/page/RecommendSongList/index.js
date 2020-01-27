import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import SongListCard from '@/components/SongListCard'
import SongCardListSkeleton from '@/components/SongCardListSkeleton'
import { getPersonalized } from '@/api'
import useRequest from '@/hook/useRequest'
import useLazyLoad from '@/hook/useLazyLoad'
import './index.scss'

export default function RecommendSongList() {

  const [list, setList] = useState([])
  const [data, loading] = useRequest(getPersonalized)
  const ref = useLazyLoad(loading)

  useEffect(() => {
    setList(data)
  }, [data])

  return (
    <Grid ref={ref} container>
      {loading ? Array.from(new Array(12)).map((item, index) => (
        <Grid className="recommend-song-card-wrap" container item xs={4} sm={4} md={3} lg={2} key={index}>
          <SongCardListSkeleton />
        </Grid>)) :
        list.map(songList => (
          <Grid className="discovery-song-list-card-wrap" container item xs={4} sm={4} md={3} lg={2} key={songList.id}>
            <SongListCard
              id={songList.id}
              name={songList.name}
              picUrl={songList.picUrl}
            />
          </Grid>
        ))}
    </Grid>
  )
}