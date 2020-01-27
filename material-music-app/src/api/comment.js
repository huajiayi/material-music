import axios from '@/common/axios'

// 获取评论
export const getComments = params => axios.get(`/api/comment`, {params})

// 发布评论
export const postComment = data => axios.post(`/api/comment`, data)

// 点赞评论
export const like = data => axios.post(`/api/comment/like`, data)