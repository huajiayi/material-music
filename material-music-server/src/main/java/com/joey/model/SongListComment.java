package com.joey.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

public class SongListComment {

    private int id;

    private int songListId;

    private int userId;

    private String content;

    private int likeCount;

    private int beRepliedCommentId;

    @JsonIgnore
    private Date createTime;

    @JsonIgnore
    private Date updateTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSongListId() {
        return songListId;
    }

    public void setSongListId(int songListId) {
        this.songListId = songListId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getBeRepliedCommentId() {
        return beRepliedCommentId;
    }

    public void setBeRepliedCommentId(int beRepliedCommentId) {
        this.beRepliedCommentId = beRepliedCommentId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
