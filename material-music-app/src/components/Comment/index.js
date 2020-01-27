import React from 'react'
import Divider from '@material-ui/core/Divider'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import SendInput from '@/components/SendInput'
import { like } from '@/api'
import { hasLogin } from '@/common/utils'
import { useHistory } from 'react-router-dom'
import Toast from '@/components/Toast'
import './index.scss'

export default function Comment({ topicId, id, avatarUrl, name, date, content, likeCount, liked, beReplied, onChangeLikeStatus, replyId, onReply, onAddComment }) {

  const history = useHistory()

  const handleLike = async e => {
    e.stopPropagation()
    if (!hasLogin()) {
      Toast.error("请先登录！")
      history.push('/login')
      return
    }
    
    const isSuccess = await like({
      commentId: id, 
      type: liked ? 0 : 1 // 1 点赞 0 取消点赞
    })
    
    if(isSuccess) {
      onChangeLikeStatus(id, liked)
    }
  }

  const handleReply = () => {
    onReply(id)
  }

  return (
    <div onClick={handleReply}>
      <div className="comment">
        <div className="comment-img-warp">
          <Avatar className="comment-img" src={avatarUrl} alt="" />
        </div>
        <div className="comment-warp">
          <span className="comment-name">{name}</span>
          <span className="comment-date">{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
        {likeCount !== 0 && likeCount}
        <LikeIcon className={"like-icon" + (liked ? " liked" :"")} onClick={handleLike}/>
      </div>
      <div className="comment-content-warp">
        <span>{content}</span>
        {beReplied && (
          <div className="comment-be-replyed">
            <span className="name">{beReplied.user.nickname}: </span>
            <span>{beReplied.content}</span>
          </div>
        )}
        {replyId === id && 
          <SendInput 
            topicId={topicId}
            topicType={1}
            beRepliedCommentId={id}
            onAddComment={onAddComment}/>}
      </div>
      <Divider className="divider" light />
    </div>
  )
}