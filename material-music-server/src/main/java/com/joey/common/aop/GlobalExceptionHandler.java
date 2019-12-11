package com.joey.common.aop;

import com.joey.common.response.Response;
import com.joey.common.response.Result;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

    /**
    * @Description: 处理参数不匹配的异常
    * @Param: [request, e]
    * @return: com.example.demo.common.response.Response
    */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public Response handleMissingServletRequestParameterException(HttpServletRequest request, MissingServletRequestParameterException e) {
        return Response.failure(Result.PARAM_NOT_MATCH);
    }

    /**
     * @Description: 处理用户未登录的异常
     * @Param: [request, e]
     * @return: com.example.demo.common.response.Response
     */
    @ExceptionHandler(UnauthenticatedException.class)
    public Response handleUnauthenticatedException(HttpServletRequest request, UnauthenticatedException e) {
        return Response.failure(Result.USER_NOT_LOGIN);
    }

    /**
    * @Description: 处理用户无权限的异常
     * @Param: [request, e]
    * @return: com.example.demo.common.response.Response
    */
    @ExceptionHandler(UnauthorizedException.class)
    public Response handleUnauthorizedException(HttpServletRequest request, UnauthorizedException e) {
        return Response.failure(Result.USER_IS_FORBIDDEN);
    }

    /**
    * @Description: 处理用户登录失败的异常
     * @Param: [request, e]
    * @return: com.example.demo.common.response.Response
    */
    @ExceptionHandler(IncorrectCredentialsException.class)
    public Response handleUnauthenticatedException(HttpServletRequest request, IncorrectCredentialsException e) {
        return Response.failure(Result.USER_LOGIN_ERROR);
    }

    /**
     * @Description: 处理用户登录失败的异常
     * @Param: [request, e]
     * @return: com.example.demo.common.response.Response
     */
    @ExceptionHandler(UnknownAccountException.class)
    public Response handleUnknownAccountException(HttpServletRequest request, UnknownAccountException e) {
        return Response.failure(Result.USER_LOGIN_ERROR);
    }

    /**
     * @Description: 处理HTTP谓词不支持的异常
     * @Param: [request, e]
     * @return: com.example.demo.common.response.Response
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public Response handleHttpRequestMethodNotSupportedException(HttpServletRequest request, HttpRequestMethodNotSupportedException e) {
        return Response.failure(Result.METHOD_NOT_ALLOWED);
    }

    /**
     * @Description: 处理其他的异常
     * @Param: [request, e]
     * @return: com.example.demo.common.response.Response
     */
    @ExceptionHandler(Exception.class)
    public Response handleException(HttpServletRequest request, Exception e) {
        System.out.println(request.getRequestURI());
//        System.out.println(e.toString());
        return Response.failure(Result.ERROR);
    }
}
