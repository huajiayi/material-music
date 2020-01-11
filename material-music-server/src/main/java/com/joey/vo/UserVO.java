package com.joey.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.joey.model.SongList;
import com.joey.model.User;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserVO extends User {

    private List<SongList> songLists;

    public UserVO() {}

    public UserVO(User user) {
        this.setId(user.getId());
        this.setUsername(user.getUsername());
        this.setNickname(user.getNickname());
    }

    public List<SongList> getSongLists() {
        return songLists;
    }

    public void setSongLists(List<SongList> songLists) {
        this.songLists = songLists;
    }
}
