package com.joey.service.impl;

import com.joey.common.constant.Base;
import com.joey.common.response.Response;
import com.joey.common.response.Result;
import com.joey.common.util.PasswordHelper;
import com.joey.dao.IUserDAO;
import com.joey.dao.IUserSongListDAO;
import com.joey.dto.RegisterDTO;
import com.joey.model.User;
import com.joey.service.IUserService;
import com.joey.vo.SongListVO;
import com.joey.vo.UserVO;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserDAO userDAO;

    @Autowired
    private IUserSongListDAO userSongListDAO;

    @Autowired
    private FileStorageService fileStorageService;

    private final static String UPLOAD_DIR = "avatar";

    private final static String MAPPER = "/user/" + UPLOAD_DIR + "/";

    /**
     * @Description: 注册
     * @Param: [registerDTO]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response register(RegisterDTO registerDTO) {
        int resultCount = userDAO.checkUsername(registerDTO.getUsername());
        if(resultCount > 0) {
            return Response.failure(Result.USER_HAS_EXISTED);
        }

        MultipartFile avatar = registerDTO.getAvatar();
        if(avatar == null) {
            return Response.failure(Result.PARAM_NOT_MATCH);
        }
        String fileName = fileStorageService.storeFile(avatar, UPLOAD_DIR, null);

        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(registerDTO.getPassword());
        user.setNickname(registerDTO.getNickname());
        user.setAvatarUrl(fileName);

        PasswordHelper.encryptPassword(user);
        userDAO.insert(user);

        return Response.success();
    }

    /**
     * @Description: 登录
     * @Param: [username, password]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response login(String username, String password) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        subject.login(token);

        return Response.success();
    }

    /**
     * @Description: 登出
     * @Param: []
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();

        return Response.success();
    }

    /**
     * @Description: 更新用户信息
     * @Param: [registerDTO]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response updateUserInfo(RegisterDTO registerDTO) {
        User user = getCurrentUser();
        if(user == null) {
            throw new UnauthenticatedException();
        }

        MultipartFile avatar = registerDTO.getAvatar();
        if(avatar != null) {
            fileStorageService.storeFile(registerDTO.getAvatar(), UPLOAD_DIR, user.getAvatarUrl());
        }

        user.setPassword(registerDTO.getPassword());
        user.setNickname(registerDTO.getNickname());

        PasswordHelper.encryptPassword(user);
        userDAO.update(user);

        return Response.success();
    }

    /**
     * @Description: 获取当前用户信息
     * @Param: [username]
     * @return: com.joey.common.response.Response<com.joey.model.User>
     */
    @Override
    public Response<UserVO> getUserInfo() {
        User user = getCurrentUser();
        if(user == null) {
            throw new UnauthenticatedException();
        }

        UserVO userVO = new UserVO(user);
        String fileUri = fileStorageService.getFileUrl(MAPPER, user.getAvatarUrl());
        userVO.setAvatarUrl(fileUri);

        return Response.success(userVO);
    }

    /**
     * @Description: 获取其他用户信息
     * @Param: [id]
     * @return: com.joey.common.response.Response<com.joey.vo.UserVO>
     */
    @Override
    public Response<UserVO> getOtherUserInfo(int id) {
        User user = userDAO.findById(id);
        UserVO userVO = new UserVO(user);
        String fileUri = fileStorageService.getFileUrl(MAPPER, user.getAvatarUrl());
        userVO.setAvatarUrl(fileUri);

        return Response.success(userVO);
    }

    /**
     * @Description: 获取用户歌单
     * @Param: []
     * @return: com.joey.common.response.Response<java.util.List < com.joey.vo.SongListVO>>
     */
    @Override
    public Response<List<SongListVO>> getUserSongLists(int userId) {
        List<SongListVO> songListVOs = userSongListDAO.findByUserId(userId);

        return Response.success(songListVOs);
    }

    /**
     * @Description: 获取默认头像url
     * @Param: []
     * @return: com.joey.common.response.Response<java.lang.String>
     */
    @Override
    public Response<String> getDefaultAvatarUrl() {
        return Response.success(Base.DEFAULT_AVATAR_URL);
    }

    /** 
    * @Description: 返回图片资源
    * @Param: [fileName, request] 
    * @return: org.springframework.http.ResponseEntity<org.springframework.core.io.Resource> 
    */ 
    @Override
    public ResponseEntity<Resource> loadFileAsResource(String fileName, HttpServletRequest request) {
        return fileStorageService.loadFileAsResource(UPLOAD_DIR, fileName, request);
    }

    /**
    * @Description: 获取当前用户
    * @Param: []
    * @return: com.joey.model.User
    */
    public User getCurrentUser() {
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();

        if(username == null) {
            return null;
        }

        User user = userDAO.findByUsername(username);

        return user;
    }
}
