package com.joey.controller;

import com.joey.common.response.Response;
import com.joey.model.Song;
import com.joey.service.impl.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/song")
public class SongController {

    @Autowired
    private SongService songService;

    @PostMapping()
    public Response addSong(@RequestBody Song song) {
        return songService.addSong(song);
    }
}
