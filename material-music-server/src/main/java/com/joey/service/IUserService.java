package com.joey.service;

import com.joey.common.response.Response;
import com.joey.dto.RegisterDTO;
import com.joey.model.User;
import com.joey.vo.SongListVO;
import com.joey.vo.UserVO;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IUserService {

    /** 
    * @Description: 注册 
    * @Param: [user] 
    * @return: com.joey.common.response.Response 
    */ 
    Response register(RegisterDTO registerDTO);

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
     * @Description: 更新用户信息
     * @Param: [registerDTO]
     * @return: com.joey.common.response.Response
     */
    Response updateUserInfo(RegisterDTO registerDTO);

    /** 
    * @Description: 获取当前用户信息
    * @Param: []
    * @return: com.joey.common.response.Response<com.joey.model.User> 
    */ 
    Response<UserVO> getUserInfo();

    /**
    * @Description: 获取其他用户信息
    * @Param: [id]
    * @return: com.joey.common.response.Response<com.joey.vo.UserVO>
    */
    Response<UserVO> getOtherUserInfo(int id);

    /**
     * @Description: 获取用户歌单
     * @Param: []
     * @return: com.joey.common.response.Response<java.util.List<com.joey.vo.SongListVO>>
     */
    Response<List<SongListVO>> getUserSongLists(int userId);

    /** 
    * @Description: 获取默认头像url 
    * @Param: [] 
    * @return: com.joey.common.response.Response<java.lang.String> 
    */ 
    Response<String> getDefaultAvatarUrl();

    /**
    * @Description: 返回图片资源 
    * @Param: [fileName, request] 
    * @return: org.springframework.http.ResponseEntity<org.springframework.core.io.Resource> 
    */ 
    ResponseEntity<Resource> loadFileAsResource(String fileName, HttpServletRequest request);
}
