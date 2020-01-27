package com.joey.dao;

import com.joey.model.Song;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ISongSongListDAO {

    @Insert("insert into song_song_list (song_id, song_list_id, create_time, update_time) " +
            "values (#{songId}, #{songListId}, now(), now())")
    int insert(int songId, int songListId);

    @Select("select a.id, netease_id, `name`, pic_url, duration, author, album, song_url, lyric from song_song_list a " +
            "left join song b on a.song_id=b.id " +
            "where song_list_id=#{songListId}")
    List<Song> findSongsBySongListId(int songListId);
}
