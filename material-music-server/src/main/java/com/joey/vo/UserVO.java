package com.joey.vo;

import com.joey.model.SongList;
import com.joey.model.User;

import java.util.List;

public class UserVO {

    private int id;

    private String username;

    private String password;

    private String nickname;

    private String avatarUrl;

    private List<SongList> songLists;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<SongList> getSongLists() {
        return songLists;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setSongLists(List<SongList> songLists) {
        this.songLists = songLists;
    }
}
