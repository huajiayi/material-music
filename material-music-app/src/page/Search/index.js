import React, { useCallback, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { useRequest, useDebounce } from '@umijs/hooks'
import { search, addSong } from '@/api'
import { setCurrentSong } from '@/store/music/action'
import { useDispatch } from 'react-redux'
import './index.scss'

export default () => {

  const [keywords, setKeywords] = useState('')
  const debouncedKeywords = useDebounce(keywords, 500)
  const { data, run } = useRequest(search, {
    manual: true
  })

  const dispatch = useDispatch()

  const _setCurrentSong = useCallback(song => dispatch(setCurrentSong(song)), [dispatch])

  useEffect(() => {
    if (debouncedKeywords !== '') {
      run(debouncedKeywords)
    }
  }, [debouncedKeywords, run])

  const play = useCallback(async song => {
    await addSong({
      neteaseId: song.id,
      name: song.name,
      picUrl: song.album.artist.img1v1Url,
      author: song.artists[0].name,
      album: song.album.name,
      songUrl: '',
      duration: ''
    })

    _setCurrentSong({
      neteaseId: song.id,
      name: song.name,
      picUrl: song.album.artist.img1v1Url,
      author: song.artists[0].name,
      album: song.album.name
    })
  }, [_setCurrentSong])

  const searchResult = data => {
    const dataCopy = JSON.parse(JSON.stringify(data))
    if (dataCopy.result.songCount === 0) {
      return <div>{`未找到与“${debouncedKeywords}”相关的歌曲`}</div>
    }

    // 高亮关键词
    dataCopy.result.songs.forEach(song => {
      song.prevData = JSON.parse(JSON.stringify(song))
      song.name = highlightKeyWords(song.name, debouncedKeywords)
      song.artists[0].name = highlightKeyWords(song.artists[0].name, debouncedKeywords)
      song.album.name = highlightKeyWords(song.album.name, debouncedKeywords)
    })

    return dataCopy.result.songs.map(song => (
      <div className="song-warp" key={song.id} onClick={() => play(song.prevData)}>
        <span className="song-name" dangerouslySetInnerHTML={{ __html: song.name }}></span>
        <span className="song-detail" dangerouslySetInnerHTML={{ __html: `${song.artists[0].name} - ${song.album.name}` }}></span>
      </div>
    ))
  }

  const highlightKeyWords = (dataStr, keywords) => {
    if (dataStr === '' || keywords === '') return dataStr

    const keywordExp = new RegExp(keywords, 'ig')
    dataStr = dataStr.replace(keywordExp, `<span class="keywords">${keywords}</span>`)

    return dataStr
  }

  return (
    <div className="search-wrap">
      <TextField label="歌曲名" value={keywords} onChange={e => setKeywords(e.target.value)} fullWidth />
      <div className="search-result">
        {data && searchResult(data)}
      </div>
    </div>
  )
}
