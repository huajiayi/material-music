import { musicInstance as axios } from '@/common/axios'

export const getPersonalized = params => axios.get(`/personalized`, { params })

export const getNewSongs = () => axios.get('/personalized/newsong')

export const getPersonalizedMv = () => axios.get(`/personalized/mv`)