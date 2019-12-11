package com.joey.service;

import com.joey.common.response.Response;
import com.joey.model.User;

public interface IUserService {

    /** 
    * @Description: 注册 
    * @Param: [user] 
    * @return: com.joey.common.response.Response 
    */ 
    Response register(User user);

    /** 
    * @Description:  登录
    * @Param: [username, password] 
    * @return: com.joey.common.response.Response 
    */ 
    Response login(String username, String password);

    /** 
    * @Description:  登出
    * @Param: [] 
    * @return: com.joey.common.response.Response 
    */ 
    Response logout();

    /** 
    * @Description: 获取用户信息
    * @Param: []
    * @return: com.joey.common.response.Response<com.joey.model.User> 
    */ 
    Response<User> getUserInfo();

    /** 
    * @Description: 获取默认头像url 
    * @Param: [] 
    * @return: com.joey.common.response.Response<java.lang.String> 
    */ 
    Response<String> getDefaultAvatarUrl();
}
