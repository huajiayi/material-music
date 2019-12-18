import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import SongListCard from '@/components/SongListCard'
import SongCardListSkeleton from '@/components/SongCardListSkeleton'
import { getPersonalized } from '@/api'
import Title from '@/components/Title'
import useIO from '@/hook/useIO'
import './index.scss'

export default function NewSongList() {

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const NewSongListRef = useRef(null)

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null
  })

  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getPersonalized({ limit: 12 })
      setList(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!loading && NewSongListRef) {
      let imgs = Array.from(NewSongListRef.current.getElementsByClassName('lazy'))
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
      <Title>推荐歌单</Title>
      <Grid ref={NewSongListRef} container>
        {loading ? Array.from(new Array(12)).map((item, index) => (
          <Grid className="recommend-song-card-wrap" container item xs={4} sm={4} md={3} lg={2} key={index}>
            <SongCardListSkeleton />
          </Grid>)) :
          list.map(songList => (
            <Grid className="discovery-song-list-card-wrap" container item xs={4} sm={4} md={3} lg={2} key={songList.id}>
              <SongListCard
                name={songList.name}
                picUrl={songList.picUrl}
              />
            </Grid>
          ))}
      </Grid>
    </>
  )
}