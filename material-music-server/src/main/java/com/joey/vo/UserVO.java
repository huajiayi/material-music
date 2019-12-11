package com.joey.vo;

import com.joey.model.SongList;
import com.joey.model.User;

import java.util.List;

public class UserVO extends User {

    private List<SongList> songLists;

    public List<SongList> getSongLists() {
        return songLists;
    }

    public void setSongLists(List<SongList> songLists) {
        this.songLists = songLists;
    }
}
