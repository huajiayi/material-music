package com.joey.dao;

import com.joey.vo.SongListVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface IUserSongListDAO {

    @Select("select song_list.id as id, name, pic_url, creator_id from user_song_list " +
            "left join song_list on user_song_list.song_list_id=song_list.id " +
            "where user_id=#{userId}")
    List<SongListVO> findByUserId(int userId);

    @Insert("insert into user_song_list (user_id, song_list_id, create_time, update_time) " +
           "values (#{userId}, #{songListId}, now(), now())")
    int insert(int userId, int songListId);

    @Select("select count(1) from user_song_list where user_id=#{userId} and song_list_id=#{songListId}")
    int checkHasSubscribe(int userId, int songListId);
}
