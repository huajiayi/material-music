package com.joey.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.joey.common.response.Response;
import com.joey.dao.ICommentDAO;
import com.joey.dao.ILikeDAO;
import com.joey.model.Comment;
import com.joey.model.User;
import com.joey.service.ICommentService;
import com.joey.vo.CommentVO;
import org.apache.shiro.authz.UnauthenticatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private ICommentDAO commentDAO;

    @Autowired
    private ILikeDAO likeDAO;

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

    /**
     * @Description: 获取分页的评论 topic_type 0 歌曲 1 歌单
     * @Param: [topicType, topicId, pageNum, pageSize]
     * @return: com.joey.common.response.Response<com.github.pagehelper.PageInfo<com.joey.vo.CommentVO>>
     */
    @Override
    public Response<PageInfo<CommentVO>> getPagedComments(int topicType, int topicId, int pageNum, int pageSize) {
        User user = userService.getCurrentUser();
        int userId = user == null ? 0 : user.getId();

        PageHelper.startPage(pageNum, pageSize);
        List<CommentVO> list = commentDAO.findByTopicWithUserAndLiked(topicType, topicId, userId);
        for (CommentVO comment: list) {
            if(comment.getBeRepliedCommentId() != 0) {
                comment.setBeReplied(commentDAO.findByIdWithUser(comment.getBeRepliedCommentId()));
            }
            String fileUri = fileStorageService.getFileUrl(userService.MAPPER, comment.getUser().getAvatarUrl());
            comment.getUser().setAvatarUrl(fileUri);
        }
        PageInfo<CommentVO> commentVOs = new PageInfo<>(list);

        return Response.success(commentVOs);
    }

    /**
     * @param comment
     * @Description: 评论 topic_type: 0 歌曲 1 歌单
     * @Param: [comment]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response comment(Comment comment) {
        User user = userService.getCurrentUser();
        if(user == null) {
            throw new UnauthenticatedException();
        }

        comment.setUserId(user.getId());
        commentDAO.insert(comment);

        return Response.success();
    }

    /**
     * @Description: 评论点赞 type：0 取消点赞 1 点赞
     * @Param: [commentId, type]
     * @return: com.joey.common.response.Response
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Response like(int commentId, int type) {
        User user = userService.getCurrentUser();
        if(user == null) {
            throw new UnauthenticatedException();
        }

        switch (type){
            case 0:
                likeDAO.delete(user.getId(), commentId);
                commentDAO.updateLikeCount(commentId, -1);
                break;
            case 1:
                likeDAO.insert(user.getId(), commentId);
                commentDAO.updateLikeCount(commentId, 1);
                break;
            default:
                break;
        }

        return Response.success();
    }
}
