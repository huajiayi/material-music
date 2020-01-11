package com.joey.controller;

import com.github.pagehelper.PageInfo;
import com.joey.common.response.Response;
import com.joey.common.response.Result;
import com.joey.model.Comment;
import com.joey.service.impl.CommentService;
import com.joey.vo.CommentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public Response<PageInfo<CommentVO>> getPagedComment(@RequestParam int topicType, @RequestParam int topicId, @RequestParam int pageNum, @RequestParam int pageSize) {
        return commentService.getPagedComments(topicType, topicId, pageNum, pageSize);
    }

    @PostMapping
    public Response comment(@RequestBody Comment comment) {
        return commentService.comment(comment);
    }

    @PostMapping("like")
    public Response like(@RequestBody Map<String, Integer> map) {
        Integer commentId = map.get("commentId");
        Integer type = map.get("type");
        if(commentId == null|| type == null) {
            return Response.failure(Result.PARAM_NOT_MATCH);
        }

        return commentService.like(commentId, type);
    }
}
