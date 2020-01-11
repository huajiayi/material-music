package com.joey.dto;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

public class SongListDTO {
    @NotNull
    private String name;

    @NotNull
    private MultipartFile songListPic;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MultipartFile getSongListPic() {
        return songListPic;
    }

    public void setSongListPic(MultipartFile songListPic) {
        this.songListPic = songListPic;
    }

}
