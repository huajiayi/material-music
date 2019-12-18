import axios from '@/common/axios'

// 获取当前用户信息
export const getUserInfo = () => axios.get('/api/user')

// 获取其他用户信息
export const getOtherUserInfo = id => axios.get(`/api/user/${id}`)

// 注册
export const register = data => axios.post('/api/user/register', data)

// 登录
export const login = data => axios.post('/api/user/login', data).then(isSuccess => isSuccess && getUserInfo())

// 注销
export const logout = () => axios.get('/api/user/logout')

// 更新当前用户信息
export const updateUserInfo = data => axios.put('/api/user/update', data)