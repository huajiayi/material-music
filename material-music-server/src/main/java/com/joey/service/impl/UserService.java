package com.joey.service.impl;

import com.joey.common.constant.Base;
import com.joey.common.response.Response;
import com.joey.common.response.Result;
import com.joey.common.util.PasswordHelper;
import com.joey.dao.IUserDao;
import com.joey.dto.RegisterDTO;
import com.joey.model.User;
import com.joey.service.IUserService;
import com.joey.vo.UserVO;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserDao userDao;

    @Autowired
    private FileStorageService fileStorageService;

    private static final String MAPPING = "/user/avatar/";

    /**
     * @Description: 注册
     * @Param: [registerDTO]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response register(RegisterDTO registerDTO) {
        int resultCount = userDao.checkUsername(registerDTO.getUsername());
        if(resultCount > 0) {
            return Response.failure(Result.USER_HAS_EXISTED);
        }

        String fileName = fileStorageService.storeFile(registerDTO.getAvatar(), null);

        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(registerDTO.getPassword());
        user.setNickname(registerDTO.getNickname());
        user.setAvatarUrl(fileName);

        PasswordHelper.encryptPassword(user);
        userDao.insert(user);

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
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();

        if(username == null) {
            throw new UnauthenticatedException();
        }

        User user = userDao.findByUsername(username);

        MultipartFile avatar = registerDTO.getAvatar();
        if(avatar != null) {
            fileStorageService.storeFile(registerDTO.getAvatar(), user.getAvatarUrl());
        }

        user.setPassword(registerDTO.getPassword());
        user.setNickname(registerDTO.getNickname());

        PasswordHelper.encryptPassword(user);
        userDao.update(user);

        return Response.success();
    }

    /**
     * @Description: 获取当前用户信息
     * @Param: [username]
     * @return: com.joey.common.response.Response<com.joey.model.User>
     */
    @Override
    public Response<UserVO> getUserInfo() {
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();

        if(username == null) {
            throw new UnauthenticatedException();
        }

        User user = userDao.findByUsername(username);
        UserVO userVO = new UserVO();
        userVO.setId(user.getId());
        userVO.setUsername(user.getUsername());
        userVO.setPassword(user.getPassword());
        userVO.setNickname(user.getNickname());
        String fileUri = fileStorageService.getFileUrl(MAPPING, user.getAvatarUrl());
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
        User user = userDao.findById(id);
        UserVO userVO = new UserVO();
        userVO.setId(id);
        userVO.setNickname(user.getNickname());
        String fileUri = fileStorageService.getFileUrl(MAPPING, user.getAvatarUrl());
        userVO.setAvatarUrl(fileUri);

        return Response.success(userVO);
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
}
