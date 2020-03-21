import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import SongCard from '@/components/SongCard'
import SongCardSkeleton from '@/components/SongCardSkeleton'
import { getNewSongs } from '@/api'
import Title from '@/components/Title'
import useLazyLoad from '@/hook/useLazyLoad'
import { useRequest } from '@umijs/hooks'
import './index.scss'

export default function NewSong() {

  const [canLazy, setCanLazy] = useState(false)
  const [list, setList] = useState([])
  const {data, loading} = useRequest(getNewSongs)
  const ref = useLazyLoad(canLazy)

  useEffect(() => {
    if(data) {
      setList(data.result)
      setCanLazy(true)
    }
  }, [data])

  return (
    <>
      <Title>最新音乐</Title>
      <Grid ref={ref} container>
        {loading ? Array.from(new Array(10)).map((item, index) => (
          <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={index}>
            <SongCardSkeleton />
          </Grid>)) :
          list.map((songWrap, index) => (
            <Grid className="discovery-song-card-wrap" container item xs={12} md={6} key={songWrap.id}>
              <SongCard
                id={index + 1}
                neteaseId={songWrap.id}
                name={songWrap.song.name}
                picUrl={songWrap.picUrl}
                author={songWrap.song.artists[0].name}
                album={songWrap.song.album.name}
                duration={songWrap.duration}
              />
            </Grid>))}
      </Grid>
    </>
  )
}