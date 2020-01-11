package com.joey.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.joey.model.Comment;
import com.joey.model.Song;
import com.joey.model.SongList;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SongListVO extends SongList {

    private UserVO creator;

    private List<Song> songs;

    private List<Comment> comments;

    private int count;

    public SongListVO() {}

    public SongListVO(SongList songList) {
        this.setId(songList.getId());
        this.setName(songList.getName());
        this.setCollectCount(songList.getCollectCount());
        this.setCreateTime(songList.getCreateTime());
    }

    public UserVO getCreator() {
        return creator;
    }

    public void setCreator(UserVO creator) {
        this.creator = creator;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
