import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import SongCard from '@/components/SongCard'
import SongCardSkeleton from '@/components/SongCardSkeleton'
import { getNewSongs } from '@/api'
import Title from '@/components/Title'
import useIO from '@/hook/useIO'
import './index.scss'

export default function NewSong() {

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const NewSongRef = useRef(null)

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null
  })

  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getNewSongs()
      setList(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!loading && NewSongRef) {
      let imgs = Array.from(NewSongRef.current.getElementsByClassName('lazy'))
      setElements(imgs)
    }
  }, [list, loading, setElements])

  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove("lazy")
        observer.unobserve(lazyImage)
      }
    })
  }, [entries, observer])

  return (
    <>
      <Title>最新音乐</Title>
      <Grid ref={NewSongRef} container>
        {loading ? Array.from(new Array(10)).map((item, index) => (
          <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={index}>
            <SongCardSkeleton />
          </Grid>)) :
          list.map((songWrap, index) => (
            <Grid className="discovery-song-card-wrap" container item xs={12} md={6} key={songWrap.id}>
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