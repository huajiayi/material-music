package com.joey.controller;

import com.joey.common.response.Response;
import com.joey.model.User;
import com.joey.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Response register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public Response login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }

    @GetMapping("/logout")
    public Response logout() {
        System.out.println("asd");
        return userService.logout();
    }

    @GetMapping
    public Response<User> getUserInfo() {
        return userService.getUserInfo();
    }

    @GetMapping("default-avatar-url")
    public Response<String> getDefaultAvatarUrl() {
        return userService.getDefaultAvatarUrl();
    }
}
