package com.joey.controller;

import com.joey.common.response.Response;
import com.joey.common.response.Result;
import com.joey.dto.SongListDTO;
import com.joey.service.impl.SongListService;
import com.joey.vo.SongListVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/song-list")
public class SongListController {

    @Autowired
    private SongListService songListService;

    @GetMapping("/latest")
    public Response<List<SongListVO>> getLatestSongLists(@RequestParam(required = false) Integer limit) {
        return songListService.getLatestSongLists(limit);
    }

    @GetMapping("/{id}")
    public Response<SongListVO> getSongListById(@PathVariable int id) {
        return songListService.getSongListById(id);
    }

    @PostMapping
    public Response createSongList(@Valid @ModelAttribute SongListDTO songListDTO) {
        return songListService.createSongList(songListDTO);
    }

    @PostMapping("subscribe")
    public Response subscribeSongList(@RequestBody Map<String, Integer> map) {
        Integer songListId = map.get("songListId");
        if(songListId == null) {
            return Response.failure(Result.PARAM_NOT_MATCH);
        }

        return songListService.subscribeSongList(songListId);
    }

    @PostMapping("track")
    public Response addSongToList(@RequestBody Map<String, Integer> map) {
        Integer songId = map.get("songId");
        Integer songListId = map.get("songListId");
        if(songId == null || songListId == null) {
            return Response.failure(Result.PARAM_NOT_MATCH);
        }

        return songListService.addSong(songId, songListId);
    }

    @GetMapping("/songListPic/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        return  songListService.loadFileAsResource(fileName, request);
    }
}
