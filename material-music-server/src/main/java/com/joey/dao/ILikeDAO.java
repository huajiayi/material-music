package com.joey.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ILikeDAO {

    @Insert("insert into `like` (user_id, comment_id) " +
            "values (#{userId}, #{commentId})")
    int insert(int userId, int commentId);

    @Delete("delete from `like` " +
            "where userId=#{userId} and commentId=#{commentId}")
    int delete(int userId, int commentId);
}
