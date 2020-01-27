import axios from '@/common/axios'

// 获取当前用户信息
export const getUserInfo = () => axios.get('/api/user')

// 获取其他用户信息
export const getOtherUserInfo = id => axios.get(`/api/user/${id}`)

// 注册
export const register = user => axios.post('/api/user/register', user)

// 登录
export const login = user => axios.post('/api/user/login', user).then(isSuccess => isSuccess && getUserInfo())

// 注销
export const logout = () => axios.get('/api/user/logout')

// 更新当前用户信息
export const updateUserInfo = user => axios.put('/api/user/update', user)

// 获取用户歌单
export const getUserSongList = userId => axios.get(`/api/user/song-list`, {params: {userId}})