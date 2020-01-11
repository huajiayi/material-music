package com.joey.dao;

import com.joey.model.SongList;
import com.joey.vo.SongListVO;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ISongListDAO {

    @Insert("insert into song_list (name, pic_url, collect_count, creator_id, create_time, update_time) " +
            "values (#{name}, #{picUrl}, 0, #{creatorId}, now(), now())")
    int insert(SongList songList);

    @Select("select a.id as id, name, pic_url, collect_count, a.create_time, b.id as uid, username, nickname, avatar_url from song_list as a " +
            "left join user as b on a.creator_id=b.id " +
            "order by a.create_time desc " +
            "limit #{limit}")
    @Results(
            id = "creatorResultMap",
            value =  {
            @Result(column = "uid", property = "creator.id", javaType = Integer.class, jdbcType = JdbcType.INTEGER),
            @Result(column = "username", property = "creator.username", javaType = String.class, jdbcType = JdbcType.VARCHAR),
            @Result(column = "nickname", property = "creator.nickname", javaType = String.class, jdbcType = JdbcType.VARCHAR),
            @Result(column = "avatar_url", property = "creator.avatarUrl", javaType = String.class, jdbcType = JdbcType.VARCHAR),
    })
    List<SongListVO> findLatestWithCreator(int limit);

    @Select("select a.id as id, name, pic_url, collect_count, a.create_time, b.id as uid, username, nickname, avatar_url from song_list as a " +
            "left join user as b on a.creator_id=b.id " +
            "where a.id=#{id}")
    @ResultMap("creatorResultMap")
    SongListVO findByIdWithAllDetails(int id);

    @Update("update song_list set collect_count=collect_count+${num} where id=#{id}")
    int updateCollectCount(int id, int num);
}
