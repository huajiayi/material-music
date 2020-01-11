package com.joey.vo;

import com.joey.model.Comment;
import com.joey.model.Song;
import com.joey.model.SongList;

import java.util.List;

public class SongVO extends Song {

    private List<SongList> songLists;

    private List<Comment> comments;

    public List<SongList> getSongLists() {
        return songLists;
    }

    public void setSongLists(List<SongList> songLists) {
        this.songLists = songLists;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
