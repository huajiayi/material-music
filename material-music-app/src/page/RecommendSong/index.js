import React, { useState, useEffect, useRef } from 'react'
import SongCard from '@/components/SongCard'
import SongCardSkeleton from '@/components/SongCardSkeleton'
import Grid from '@material-ui/core/Grid'
import { getTopSongs } from '@/api'
import useIO from '@/hook/useIO'
import './index.scss'

export default function RecommendSong() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const RecommendSongRef = useRef(null)

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null
  })
  

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopSongs(0)
      setList(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if(!loading && RecommendSongRef) {
      let imgs = Array.from(RecommendSongRef.current.getElementsByClassName('lazy'))
      setElements(imgs)
    }
  }, [list, RecommendSongRef, loading, setElements])

  useEffect(() => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        let lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove("lazy")
        observer.unobserve(lazyImage)
      }
    })
  }, [entries, observer])

  return (
    <>
      <Grid ref={RecommendSongRef} container className="test">
        {loading ? Array.from(new Array(14)).map((item, index) => (
          <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={index}>
            <SongCardSkeleton />
          </Grid>)) :
        list.map((songWrap, index) =>(
          <Grid className="recommend-song-card-wrap" container item xs={12} md={6} key={songWrap.id}>
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