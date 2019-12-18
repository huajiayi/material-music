import axios from 'axios'
import Toast from '@/components/Toast'

const createMusicInstance = () => {
  const musicInstance = axios.create({
    baseURL: 'http://localhost:3001'
  })

  musicInstance.interceptors.response.use(res => {
    return res.data
  }, err => {
    Toast.error(err.message)
    throw err
  })

  return musicInstance
}

export const musicInstance = createMusicInstance()

// if(process.env.NODE_ENV === 'production') process.env.BASE_URL = 'http://localhost:8081'
// console.log(process.env.BASE_URL)

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true
})

instance.interceptors.response.use(res => {
  const { code, msg, data } = res.data
  // code为1代表成功
  if(code === 1) {
    if(data) return data
    Toast.success(msg)
    return true
  }else {
    Toast.error(msg)
    return false
  }
}, err => {
  Toast.error(err.message)
  return false
})

export default instance