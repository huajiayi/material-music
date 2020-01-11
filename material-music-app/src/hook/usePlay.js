import { useCallback, useEffect } from 'react'
import { setCurrentSong } from '@/store/music/action'
import { setShowPlayer } from '@/store/common/action'
import { getSongUrl } from '@/api'
import { useDispatch } from 'react-redux'
import Toast from '@/components/Toast'

export default function usePlay(song) {

  const dispatch = useDispatch()

  const _setCurrentSong = useCallback(song => dispatch(setCurrentSong(song)), [dispatch])
  const _setShowPlayer = useCallback(showPlayer => dispatch(setShowPlayer(showPlayer)), [dispatch])

  useEffect(() => {
    const fetchSong = async id => {
      const res = await getSongUrl(id)
      if(!res.data[0].url) {
        Toast.error('歌曲无法播放')
        return
      }

      _setCurrentSong({
        ...song,
        url: res.data[0].url
      })
      _setShowPlayer(true)
    }
    fetchSong(song.id)
  }, [_setCurrentSong, _setShowPlayer, song])

  return useCallback(song => async () => {
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
    _setShowPlayer(true)
  }, [_setCurrentSong, _setShowPlayer])
}