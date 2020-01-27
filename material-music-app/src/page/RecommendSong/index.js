import React, { useState, useEffect, useCallback } from 'react'
import SongCard from '@/components/SongCard'
import SongCardSkeleton from '@/components/SongCardSkeleton'
import Grid from '@material-ui/core/Grid'
import { getTopSongs } from '@/api'
import useRequest from '@/hook/useRequest'
import useLazyLoad from '@/hook/useLazyLoad'
import './index.scss'

export default function RecommendSong() {

  const [list, setList] = useState([])
  const [data, loading] = useRequest(useCallback(() => getTopSongs(0), []))
  const ref = useLazyLoad(loading)

  useEffect(() => {
    setList(data.data)
  }, [data])

  return (
    <>
      <Grid ref={ref} container className="test">
        {loading ? Array.from(new Array(14)).map((item, index) => (
          <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={index}>
            <SongCardSkeleton />
          </Grid>)) :
          list.map((songWrap, index) => (
            <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={songWrap.id}>
              <SongCard
                id={index + 1}
                neteaseId={songWrap.id}
                name={songWrap.name}
                picUrl={songWrap.album.picUrl}
                author={songWrap.artists[0].name}
                album={songWrap.album.name}
                duration={songWrap.duration}
              />
            </Grid>))}
      </Grid>
    </>
  )
}