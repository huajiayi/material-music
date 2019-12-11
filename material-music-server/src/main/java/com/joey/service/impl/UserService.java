package com.joey.service.impl;

import com.joey.common.constant.Base;
import com.joey.common.response.Response;
import com.joey.common.response.Result;
import com.joey.common.util.PasswordHelper;
import com.joey.dao.IUserDao;
import com.joey.model.User;
import com.joey.service.IUserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserDao userDao;

    /**
     * @param user
     * @Description: 注册
     * @Param: [user]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response register(User user) {
        int resultCount = userDao.checkUsername(user.getUsername());
        if(resultCount > 0) {
            return Response.failure(Result.USER_HAS_EXISTED);
        }

        PasswordHelper.encryptPassword(user);
        userDao.insert(user);

        return Response.success();
    }

    /**
     * @param username
     * @param password
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
     * @Description: 获取用户信息
     * @Param: [username]
     * @return: com.joey.common.response.Response<com.joey.model.User>
     */
    @Override
    public Response<User> getUserInfo() {
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();

        if(username == null) {
            throw new UnauthenticatedException();
        }

        User user = userDao.findByUsername(username);
        user.setPassword("");
        return Response.success(user);
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
