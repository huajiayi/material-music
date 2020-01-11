package com.joey.service.impl;

import com.joey.common.response.Response;
import com.joey.dao.ISongListDAO;
import com.joey.dao.ISongSongListDAO;
import com.joey.dao.IUserSongListDAO;
import com.joey.dto.SongListDTO;
import com.joey.model.SongList;
import com.joey.model.User;
import com.joey.service.ISongListService;
import com.joey.vo.SongListVO;
import org.apache.shiro.authz.UnauthenticatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class SongListService implements ISongListService {

    @Autowired
    private UserService userService;

    @Autowired
    private ISongListDAO songListDAO;

    @Autowired
    private ISongSongListDAO songSongListDAO;

    @Autowired
    private IUserSongListDAO userSongListDAO;

    @Autowired
    private FileStorageService fileStorageService;

    private final static String UPLOAD_DIR = "songListPic";

    private final static String MAPPER = "/song-list/" + UPLOAD_DIR + "/";

    /**
     * @param songListDTO
     * @Description: 创建歌单
     * @Param: [songListDTO]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response createSongList(SongListDTO songListDTO) {
        User user = userService.getCurrentUser();
        if(user == null) {
            throw new UnauthenticatedException();
        }

        String fileName = fileStorageService.storeFile(songListDTO.getSongListPic(), UPLOAD_DIR, null);

        SongList songList = new SongList();
        songList.setName(songListDTO.getName());
        songList.setPicUrl(fileName);
        songList.setCreatorId(user.getId());
        songListDAO.insert(songList);

        return Response.success();
    }

    /**
     * @Description: 获取最新歌单
     * @Param: [limit]
     * @return: com.joey.common.response.Response<java.util.List < com.joey.model.SongList>>
     */
    @Override
    public Response<List<SongListVO>> getLatestSongLists(Integer limit) {
        List<SongListVO> songListVOList = songListDAO.findLatestWithCreator(limit == null ? 30 : limit);

        return Response.success(songListVOList);
    }

    /**
     * @param id
     * @Description: 通过id获取歌单详情
     * @Param: [id]
     * @return: com.joey.common.response.Response<com.joey.model.SongList>
     */
    @Override
    public Response<SongListVO> getSongListById(int id) {
        SongListVO songListVO = songListDAO.findByIdWithAllDetails(id);

        return Response.success(songListVO);
    }

    /**
     * @param songListId
     * @Description: 订阅歌单
     * @Param: [songListId]
     * @return: com.joey.common.response.Response
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Response subscribeSongList(int songListId) {
        User user = userService.getCurrentUser();
        if(user == null) {
            throw new UnauthenticatedException();
        }

        userSongListDAO.insert(user.getId(), songListId);
        songListDAO.updateCollectCount(songListId, 1);

        return Response.success();
    }

    /**
     * @param songId
     * @param songListId
     * @Description: 把歌曲加入歌单
     * @Param: [songId, songListId]
     * @return: com.joey.common.response.Response
     */
    @Override
    public Response addSong(int songId, int songListId) {
        songSongListDAO.insert(songId, songListId);

        return Response.success();
    }

    /** 
    * @Description: 获取歌单文件资源
    * @Param: [fileName, request] 
    * @return: org.springframework.http.ResponseEntity<org.springframework.core.io.Resource> 
    */ 
    @Override
    public ResponseEntity<Resource> loadFileAsResource(String fileName, HttpServletRequest request) {
        return fileStorageService.loadFileAsResource(UPLOAD_DIR, fileName, request);
    }
}
