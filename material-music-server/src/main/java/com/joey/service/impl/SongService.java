package com.joey.service.impl;

import com.joey.common.response.Response;
import com.joey.dao.ISongDAO;
import com.joey.model.Song;
import com.joey.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongService implements ISongService {

    @Autowired
    private ISongDAO songDAO;

    /**
     * @param song
     * @Description: 添加歌曲
     * @Param: [song]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response addSong(Song song) {
        if(songDAO.checkSongById(song.getNeteaseId()) < 1) {
            songDAO.insert(song);
        }

        return Response.success();
    }
}
