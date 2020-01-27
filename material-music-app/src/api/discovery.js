import axios, { musicInstance } from '@/common/axios'

// 获取推荐歌单
export const getPersonalized = params => axios.get(`/api/song-list/latest`, { params })

// 获取最新歌曲
export const getNewSongs = () => musicInstance.get('/music-api/personalized/newsong')