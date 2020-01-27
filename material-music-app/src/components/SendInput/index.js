import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import { postComment } from '@/api'
import { hasLogin } from '@/common/utils'
import { useHistory } from 'react-router-dom'
import Toast from '@/components/Toast'
import './index.scss'

export default function SendInput({ topicId, topicType, beRepliedCommentId = 0, onAddComment}) {

  const [content, setContent] = useState('')
  const history = useHistory()

  const handleComment = async () => {
    if (!hasLogin()) {
      Toast.error("请先登录！")
      history.push('/login')
      return
    }

    const isSuccess = await postComment({
      topicId,
      topicType,
      content,
      beRepliedCommentId
    })

    if(isSuccess) {
      setContent('')
      onAddComment()
    }
  }

  const handleChangeText = e => {
    setContent(e.target.value)
  }

  return (
    <div className="comments-form">
      <Input className="comments-input" value={content} onChange={handleChangeText} placeholder="评论才是本体" fullWidth/>
      <IconButton className="send-icon" onClick={handleComment}>
        <SendIcon/>
      </IconButton>
    </div>
  )
}