package com.joey.dao;

import com.joey.model.Song;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ISongDAO {

    @Select("select * from song where name like %query%")
    List<Song> findLike(String query);

    @Select("select id from song where netease_id=#{neteaseId}")
    int findByNeteaseId(int neteaseId);

    @Select("select count(1) from song where netease_id=#{id}")
    int checkSongById(int id);

    @Insert("insert into song (netease_id, name, pic_url, duration, author, album, song_url, lyric, create_time, update_time) " +
            "values (#{neteaseId}, #{name}, #{picUrl}, #{duration}, #{author}, #{album}, #{songUrl}, #{lyric}, now(), now())")
    int insert(Song song);
}
