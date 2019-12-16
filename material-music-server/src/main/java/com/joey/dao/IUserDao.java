package com.joey.dao;

import com.joey.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface IUserDao {

    @Select("select * from user where id=#{id}")
    User findById(int id);

    @Select("select * from user where username=#{username}")
    User findByUsername(String username);

    @Select("select password from user where username=#{username}")
    String getPasswordByUsername(String username);

    @Select("select count(1) from user where username=#{username}")
    int checkUsername(String username);

    @Insert("insert into user (username, password, nickname, avatar_url, salt, create_time, update_time) " +
            "values (#{username}, #{password}, #{nickname}, #{avatarUrl}, #{salt}, now(), now())")
    int insert(User user);

    @Update("update user set password=#{password}, nickname=#{nickname}, salt=#{salt}, update_time=now() " +
            "where id=#{id}")
    int update(User user);
}
