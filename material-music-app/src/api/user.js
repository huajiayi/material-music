import axios from '@/common/axios'

export const getUserInfo = () => axios.get('/api/user')

export const getOtherUserInfo = id => axios.get(`/api/user/${id}`)

export const register = data => axios.post('/api/user/register', data)

export const login = data => axios.post('/api/user/login', data).then(isSuccess => isSuccess && getUserInfo())

export const logout = () => axios.get('/api/user/logout')

export const updateUserInfo = data => axios.put('/api/user/update', data)