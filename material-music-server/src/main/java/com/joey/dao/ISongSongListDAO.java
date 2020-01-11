package com.joey.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ISongSongListDAO {

    @Insert("insert into song_song_list (song_id, song_list_id, create_time, update_time) " +
            "values (#{songId}, #{songListId}, now(), now())")
    int insert(int songId, int songListId);
}
