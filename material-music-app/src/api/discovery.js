import { musicInstance as axios } from '@/common/axios'

// 获取个性推荐
export const getPersonalized = params => axios.get(`/music-api/personalized`, { params })

// 获取最新歌曲
export const getNewSongs = () => axios.get('/music-api/personalized/newsong')