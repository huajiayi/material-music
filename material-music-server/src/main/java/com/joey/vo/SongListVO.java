package com.joey.vo;

import com.joey.model.Song;
import com.joey.model.SongComment;
import com.joey.model.SongList;

import java.util.List;

public class SongListVO extends SongList {

    private List<Song> songs;

    private List<SongComment> comments;

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }

    public List<SongComment> getComments() {
        return comments;
    }

    public void setComments(List<SongComment> comments) {
        this.comments = comments;
    }
}
