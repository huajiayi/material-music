package com.joey.controller;

import com.joey.common.response.Response;
import com.joey.dto.RegisterDTO;
import com.joey.model.User;
import com.joey.service.impl.FileStorageService;
import com.joey.service.impl.UserService;
import com.joey.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

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
        System.out.println("asd");
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
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("default-avatar-url")
    public Response<String> getDefaultAvatarUrl() {
        return userService.getDefaultAvatarUrl();
    }
}
