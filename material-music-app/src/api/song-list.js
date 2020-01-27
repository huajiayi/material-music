import axios from '@/common/axios'

// 获取歌单详情
export const getSongListDetail = id => axios.get(`/api/song-list/${id}`)

// 收藏歌单
export const subscribeSongList = id => axios.post(`/api/song-list/subscribe`, {songListId: id})

// 新建歌单
export const addSongList = data => axios.post(`/api/song-list`, data)

// 收藏到歌单
export const track = data => axios.post(`/api/song-list/track`, data)