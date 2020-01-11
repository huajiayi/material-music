package com.joey.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.joey.model.Comment;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentVO extends Comment {

    private boolean liked;

    private CommentVO beReplied;

    private UserVO user;

    public UserVO getUser() {
        return user;
    }

    public void setUser(UserVO user) {
        this.user = user;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }

    public CommentVO getBeReplied() {
        return beReplied;
    }

    public void setBeReplied(CommentVO beReplied) {
        this.beReplied = beReplied;
    }
}
