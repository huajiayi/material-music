import React, { useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Comment from '@/components/Comment'
import SendInput from '@/components/SendInput'
import { getComments } from '@/api'
import './index.scss'

export default function Comments({ topicId, topicType, comments, onChange }) {

  const [showReplyId, setShowReplyId] = useState(0)
  const [pageNum, setPageNum] = useState(1)

  const handleLoadMore = async () => {
    const moreComments = await getComments({
      topicId,
      topicType,
      pageNum: pageNum + 1,
      pageSize: 10
    })
    const newComments = {
      ...comments,
      list: [...comments.list, ...moreComments.list],
      hasNextPage: moreComments.hasNextPage
    }

    setPageNum(pageNum + 1)
    onChange(newComments)
  }

  const handleChangeLikeStatus = useCallback((commentId, liked) => {
    const comment = comments.list.find(comment => comment.id === commentId)
    if(liked) {
      comment.liked = false
      comment.likeCount--
    }else {
      comment.liked = true
      comment.likeCount++
    }

    onChange(comments)
  }, [comments, onChange])

  const handleAddComment = useCallback(async () => {
    const newComments = await getComments({
      topicId,
      topicType,
      pageNum: 1,
      pageSize: 10
    })

    setShowReplyId(0)
    onChange(newComments)
  }, [onChange, topicId, topicType])

  const handleReply = useCallback(id => {
    setShowReplyId(id)
  }, [])

  return (
    <div className="comments">
      <SendInput
        className="send-input"
        topicId={topicId}
        topicType={topicType}
        onAddComment={handleAddComment}
      />
      {comments && comments.list.map(comment => (
        <Comment
          key={comment.id}
          topicId={topicId}
          id={comment.id}
          avatarUrl={comment.user.avatarUrl}
          name={comment.user.nickname}
          date={comment.createTime}
          content={comment.content}
          likeCount={comment.likeCount}
          liked={comment.liked}
          beReplied={comment.beReplied}
          replyId={showReplyId}
          onReply={handleReply}
          onChangeLikeStatus={handleChangeLikeStatus}
          onAddComment={handleAddComment}
        />
      ))}
      {comments.hasNextPage ? (
        <Button variant="outlined" color="default" onClick={handleLoadMore}>
          加载更多
        </Button>
      ) : (<span className="no-more-text">已经到底啦</span>)}
    </div>
  )
}