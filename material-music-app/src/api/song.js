import { musicInstance as axios } from '@/common/axios'

// 获取音乐url
export const getSongUrl = id => axios.get(`/music-api/song/url?id=${id}`)

// 获取音乐详情
export const getSongDetail = ids => axios.get(`/music-api/song/detail?ids=${ids}`)

// 新歌速递     全部:0  华语:7  欧美:96  日本:8  韩国:16
export const getTopSongs = type => axios.get(`/music-api/top/song?type=${type}`)

// 相似音乐
export const getSimiSongs = (id, option) => axios.get(`/music-api/simi/song?id=${id}`, option)

// 歌词
export const getLyric = id => axios.get(`/music-api/lyric?id=${id}`)