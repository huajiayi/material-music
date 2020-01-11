import React, { useState, useEffect, useCallback } from 'react'
import SongCard from '@/components/SongCard'
import SongCardSkeleton from '@/components/SongCardSkeleton'
import Grid from '@material-ui/core/Grid'
import { getTopSongs, getSongUrl } from '@/api'
import useRequest from '@/hook/useRequest'
import useLazyLoad from '@/hook/useLazyLoad'
import { setCurrentSong } from '@/store/music/action'
import { useDispatch } from 'react-redux'
import Toast from '@/components/Toast'
import './index.scss'

export default function RecommendSong() {

  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [data, loading] = useRequest(useCallback(() => getTopSongs(0), []))
  const ref = useLazyLoad(loading)

  useEffect(() => {
    setList(data.data)
  }, [data])

  const _setCurrentSong = useCallback(song => dispatch(setCurrentSong(song)), [dispatch])

  const play = useCallback(song => async () => {
    const res = await getSongUrl(song.id)
    if(!res.data[0].url) {
      Toast.error('歌曲无法播放')
      return
    }

    _setCurrentSong({
      name: song.name,
      picUrl: song.album.picUrl,
      author: song.artists[0].name,
      album: song.album.name,
      url: res.data[0].url
    })
  }, [_setCurrentSong])

  return (
    <>
      <Grid ref={ref} container className="test">
        {loading ? Array.from(new Array(14)).map((item, index) => (
          <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={index}>
            <SongCardSkeleton />
          </Grid>)) :
          list.map((songWrap, index) => (
            <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={songWrap.id} onClick={play(songWrap)}>
              <SongCard
                id={index + 1}
                name={songWrap.name}
                picUrl={songWrap.album.picUrl}
                author={songWrap.artists[0].name}
                album={songWrap.album.name}
              />
            </Grid>))}
      </Grid>
    </>
  )
}