package com.joey.dao;

import com.joey.model.Comment;
import com.joey.vo.CommentVO;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ICommentDAO {

    @Insert("insert into comment (topic_id, topic_type, user_id, content, like_count, be_replied_comment_id, create_time, update_time) " +
            "values (#{topicId}, #{topicType}, #{userId}, #{content}, 0, #{beRepliedCommentId}, now(), now())")
    int insert(Comment songListComment);

    @Select("select `user`.id as uid, username, nickname, avatar_url, comment.id, content, like_count, be_replied_comment_id, comment.create_time, if(`like`.user_id is null, 0, 1) as liked from comment " +
            "left join `user` on user.id=comment.user_id " +
            "left join (SELECT * FROM `like` where user_id=#{userId}) `like` " +
            "on comment.id=`like`.comment_id " +
            "where topic_type=#{topicType} and topic_id=#{topicId} order by create_time desc")
    @Results(
            id = "userResultMap",
            value =  {
            @Result(column = "uid", property = "user.id", javaType = Integer.class, jdbcType = JdbcType.INTEGER),
            @Result(column = "username", property = "user.username", javaType = String.class, jdbcType = JdbcType.VARCHAR),
            @Result(column = "nickname", property = "user.nickname", javaType = String.class, jdbcType = JdbcType.VARCHAR),
            @Result(column = "avatar_url", property = "user.avatarUrl", javaType = String.class, jdbcType = JdbcType.VARCHAR),
    })
    List<CommentVO> findByTopicWithUserAndLiked(int topicType, int topicId, int userId);

    @Select("select `user`.id as uid, username, nickname, avatar_url, comment.id, content, like_count, comment.create_time from comment " +
            "left join `user` on user.id=comment.user_id " +
            "where comment.id=#{id}")
    @ResultMap("userResultMap")
    CommentVO findByIdWithUser(int id);

    @Update("update comment set like_count=like_count+${num} where id=#{id}")
    int updateLikeCount(int id, int num);
}
