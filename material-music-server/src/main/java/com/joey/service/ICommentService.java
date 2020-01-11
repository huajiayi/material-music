package com.joey.service;

import com.github.pagehelper.PageInfo;
import com.joey.common.response.Response;
import com.joey.model.Comment;
import com.joey.vo.CommentVO;

import java.util.List;

public interface ICommentService {

    /**
    * @Description: 获取分页的评论 
    * @Param: [topicType, topicId, pageNum, pageSize] 
    * @return: com.joey.common.response.Response<com.github.pagehelper.PageInfo<com.joey.vo.CommentVO>> 
    */ 
    Response<PageInfo<CommentVO>> getPagedComments(int topicType, int topicId, int pageNum, int pageSize);
    
    /**
    * @Description: 评论 topic_type 0 歌曲 1歌单
    * @Param: [comment]
    * @return: com.joey.common.response.Response
    */
    Response comment(Comment comment);

    /** 
    * @Description: 评论点赞 type：0 取消点赞 1 点赞
    * @Param: [commentId, type]
    * @return: com.joey.common.response.Response 
    */ 
    Response like(int commentId, int type);
}
