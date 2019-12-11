package com.joey.common.response;

public enum Result implements IResult {

    /* 成功状态码 */
    SUCCESS(1, "成功"),
    /* 未知错误状态码 */
    ERROR(2, "未知错误"),
    /* 用户端错误: 1001-1999 */
    PARAM_IS_INVALID(1001, "参数无效"),
    PARAM_IS_BLANK(1002, "参数为空"),
    PARAM_NOT_MATCH(1003, "参数不匹配"),
    METHOD_NOT_ALLOWED(1004, "HTTP谓词不支持"),
    /* 用户错误: 2001-2999 */
    USER_NOT_LOGIN(2001, "用户未登录"),
    USER_LOGIN_ERROR(2002, "用户名或密码错误"),
    USER_HAS_EXISTED(2003, "用户名已存在"),
    USER_IS_FORBIDDEN(2004, "用户无访问权限");

    private int code;

    private String msg;

    Result(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    @Override
    public int getCode() {
        return this.code;
    }

    @Override
    public String getMsg() {
        return this.msg;
    }
}
