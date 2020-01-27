package com.joey.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.joey.common.constant.TopicType;
import com.joey.common.response.Response;
import com.joey.dao.*;
import com.joey.dto.SongListDTO;
import com.joey.model.Comment;
import com.joey.model.Song;
import com.joey.model.SongList;
import com.joey.model.User;
import com.joey.service.ISongListService;
import com.joey.vo.CommentVO;
import com.joey.vo.SongListVO;
import com.joey.vo.UserVO;
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
    private ISongDAO songDAO;

    @Autowired
    private ISongSongListDAO songSongListDAO;

    @Autowired
    private IUserSongListDAO userSongListDAO;

    @Autowired
    private ICommentDAO commentDAO;

    @Autowired
    private FileStorageService fileStorageService;

    private final static String UPLOAD_DIR = "songListPic";

    public final static String MAPPER = "/song-list/" + UPLOAD_DIR + "/";

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
        songList.setDescription(songListDTO.getDescription());
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
        for(SongListVO songListVO: songListVOList) {
            String fileUri = fileStorageService.getFileUrl(MAPPER, songListVO.getPicUrl());
            songListVO.setPicUrl(fileUri);
            UserVO user = songListVO.getCreator();
            fileUri = fileStorageService.getFileUrl(userService.MAPPER, user.getAvatarUrl());
            user.setAvatarUrl(fileUri);
        }

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
        User user = userService.getCurrentUser();
        int userId = user == null ? 0 : user.getId();

        SongListVO songListVO = songListDAO.findByIdWithAllDetails(id);
        String fileUri = fileStorageService.getFileUrl(MAPPER, songListVO.getPicUrl());
        songListVO.setPicUrl(fileUri);
        // 获取歌单创建者信息
        UserVO creator = songListVO.getCreator();
        fileUri = fileStorageService.getFileUrl(userService.MAPPER, creator.getAvatarUrl());
        creator.setAvatarUrl(fileUri);
        List<Song> songs = songSongListDAO.findSongsBySongListId(songListVO.getId());
        songListVO.setSongs(songs);
        // 检查是否订阅
        if(creator.getId() == userId) {
            songListVO.setHasSubscribed(true);
        }else {
            int result = userSongListDAO.checkHasSubscribe(userId, songListVO.getId());
            if(result > 0) {
                songListVO.setHasSubscribed(true);
            }
        }
        // 获取评论
        PageHelper.startPage(1, 10);
        List<CommentVO> list = commentDAO.findByTopicWithUserAndLiked(TopicType.SONG_LIST, songListVO.getId(), userId);
        for (CommentVO comment: list) {
            if(comment.getBeRepliedCommentId() != 0) {
                comment.setBeReplied(commentDAO.findByIdWithUser(comment.getBeRepliedCommentId()));
            }
            fileUri = fileStorageService.getFileUrl(userService.MAPPER, comment.getUser().getAvatarUrl());
            comment.getUser().setAvatarUrl(fileUri);
        }
        PageInfo<CommentVO> commentVOs = new PageInfo<>(list);
        songListVO.setComments(commentVOs);

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

        int userId = user.getId();
        int result = userSongListDAO.checkHasSubscribe(userId, songListId);
        if(result < 1) {
            userSongListDAO.insert(userId, songListId);
            songListDAO.updateCollectCount(songListId, 1);
        }

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
    public Response addSong(int neteaseId, int songListId) {
        int songId = songDAO.findByNeteaseId(neteaseId);
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
