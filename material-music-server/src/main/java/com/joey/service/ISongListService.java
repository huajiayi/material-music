package com.joey.service;

import com.joey.common.response.Response;
import com.joey.dto.SongListDTO;
import com.joey.model.SongList;
import com.joey.vo.SongListVO;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ISongListService {

    /** 
    * @Description: 创建歌单 
    * @Param: [songListDTO]
    * @return: com.joey.common.response.Response 
    */ 
    Response createSongList(SongListDTO songListDTO);

    /** 
    * @Description: 获取最新歌单
    * @Param: [limit] 
    * @return: com.joey.common.response.Response<java.util.List<com.joey.model.SongList>> 
    */ 
    Response<List<SongListVO>> getLatestSongLists(Integer limit);

    /** 
    * @Description: 通过id获取歌单详情
    * @Param: [id] 
    * @return: com.joey.common.response.Response<com.joey.model.SongList> 
    */ 
    Response<SongListVO> getSongListById(int id);

    /** 
    * @Description: 订阅歌单
    * @Param: [songListId]
    * @return: com.joey.common.response.Response 
    */ 
    Response subscribeSongList(int songListId);

    /** 
    * @Description: 把歌曲加入歌单 
    * @Param: [songId, songListId] 
    * @return: com.joey.common.response.Response 
    */ 
    Response addSong(int songId, int songListId);

    /**
     * @Description: 获取歌单文件资源
     * @Param: [fileName, request]
     * @return: org.springframework.http.ResponseEntity<org.springframework.core.io.Resource>
     */
    public ResponseEntity<Resource> loadFileAsResource(String fileName, HttpServletRequest request);

}
