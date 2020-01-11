import React, { useState, useEffect, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import SongCard from '@/components/SongCard'
import SongCardSkeleton from '@/components/SongCardSkeleton'
import { getNewSongs, getSongUrl } from '@/api'
import Title from '@/components/Title'
import useLazyLoad from '@/hook/useLazyLoad'
import useRequest from '@/hook/useRequest'
import { setCurrentSong } from '@/store/music/action'
import { useDispatch } from 'react-redux'
import Toast from '@/components/Toast'
import './index.scss'

export default function NewSong() {

  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [data, loading] = useRequest(getNewSongs)
  const ref = useLazyLoad(loading)

  useEffect(() => {
    setList(data.result)
  }, [data])

  const _setCurrentSong = useCallback(song => dispatch(setCurrentSong(song)), [dispatch])

  const play = useCallback(songWrap => async () => {
    const res = await getSongUrl(songWrap.id)
    if(!res.data[0].url) {
      Toast.error('歌曲无法播放')
      return
    }

    _setCurrentSong({
      name: songWrap.name,
      picUrl: songWrap.picUrl,
      author: songWrap.song.artists[0].name,
      album: songWrap.song.album.name,
      url: res.data[0].url
    })
  }, [_setCurrentSong])

  return (
    <>
      <Title>最新音乐</Title>
      <Grid ref={ref} container>
        {loading ? Array.from(new Array(10)).map((item, index) => (
          <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={index}>
            <SongCardSkeleton />
          </Grid>)) :
          list.map((songWrap, index) => (
            <Grid className="discovery-song-card-wrap" container item xs={12} md={6} key={songWrap.id} onClick={play(songWrap)}>
              <SongCard
                id={index + 1}
                name={songWrap.song.name}
                picUrl={songWrap.picUrl}
                author={songWrap.song.artists[0].name}
                album={songWrap.song.album.name}
              />
            </Grid>))}
      </Grid>
    </>
  )
}