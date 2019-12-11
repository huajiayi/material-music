package com.joey.vo;

import com.joey.model.Song;
import com.joey.model.SongComment;
import com.joey.model.SongList;

import java.util.List;

public class SongVO extends Song {

    private List<SongList> songLists;

    private List<SongComment> comments;

    public List<SongList> getSongLists() {
        return songLists;
    }

    public void setSongLists(List<SongList> songLists) {
        this.songLists = songLists;
    }

    public List<SongComment> getComments() {
        return comments;
    }

    public void setComments(List<SongComment> comments) {
        this.comments = comments;
    }
}
