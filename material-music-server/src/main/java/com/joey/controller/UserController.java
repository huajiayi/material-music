package com.joey.controller;

import com.joey.common.response.Response;
import com.joey.common.response.Result;
import com.joey.dto.RegisterDTO;
import com.joey.model.User;
import com.joey.service.impl.UserService;
import com.joey.vo.SongListVO;
import com.joey.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Response register(@Valid @ModelAttribute RegisterDTO registerDTO) {
        return userService.register(registerDTO);
    }

    @PostMapping("/login")
    public Response login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }

    @GetMapping("/logout")
    public Response logout() {
        return userService.logout();
    }

    @PutMapping("/update")
    public Response updateUserInfo(@Valid @ModelAttribute RegisterDTO registerDTO) {
        return userService.updateUserInfo(registerDTO);
    }

    @GetMapping
    public Response<UserVO> getUserInfo() {
        return userService.getUserInfo();
    }

    @GetMapping("/{id}")
    public Response<UserVO> getOtherUserInfo(@PathVariable int id) {
        return userService.getOtherUserInfo(id);
    }

    @GetMapping("/avatar/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        return userService.loadFileAsResource(fileName, request);
    }

    @GetMapping("/default-avatar-url")
    public Response<String> getDefaultAvatarUrl() {
        return userService.getDefaultAvatarUrl();
    }

    @GetMapping("/song-list")
    public Response<List<SongListVO>> getUserSongLists(@RequestParam int userId) {
        return userService.getUserSongLists(userId);
    }
}
