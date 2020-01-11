package com.joey.service;

import com.joey.common.response.Response;
import com.joey.model.Comment;
import com.joey.model.Song;

public interface ISongService {

    /**
    * @Description: 添加歌曲
    * @Param: [song]
    * @return: com.joey.common.response.Response
    */
    Response addSong(Song song);
}
