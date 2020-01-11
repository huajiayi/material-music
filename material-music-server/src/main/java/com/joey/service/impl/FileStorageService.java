package com.joey.service.impl;

import com.joey.common.exception.FileStorageException;
import com.joey.common.properties.FileStorageProperties;
import com.joey.service.IFileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService implements IFileStorageService {
    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    /**
    * @Description:  保存文件
    * @Param: [file]
    * @return: java.lang.String
    */
    @Override
    public String storeFile(MultipartFile file, String directory, String fileName) {
        // Normalize file name
        if(fileName == null) {
            fileName = getUUIDFileName(file.getOriginalFilename());
        }

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Files.createDirectories(this.fileStorageLocation.resolve(directory));
            Path targetLocation = this.fileStorageLocation.resolve(directory).resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    /** 
    * @Description: 返回图片
    * @Param: [directory, fileName, request] 
    * @return: org.springframework.http.ResponseEntity<org.springframework.core.io.Resource> 
    */ 
    public ResponseEntity<Resource> loadFileAsResource(String directory, String fileName, HttpServletRequest request) {
        Resource resource = loadFileAsResource(directory + "/" + fileName);

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

    /**
    * @Description: 返回文件资源
    * @Param: [fileName]
    * @return: org.springframework.core.io.Resource
    */
    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileStorageException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileStorageException("File not found " + fileName, ex);
        }
    }

    /** 
    * @Description: 返回文件路径
    * @Param: [mapping, fileName] 
    * @return: java.lang.String 
    */ 
    @Override
    public String getFileUrl(String uploadDir, String fileName) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/" + uploadDir + "/")
                .path(fileName)
                .toUriString();
    }

    /**
     * @Description: 获取文件后缀
     * @Param: [fileName]
     * @return: java.lang.String
     */
    @Override
    public String getSuffix(String fileName){
        int index = fileName.lastIndexOf(".");
        if(index < 0) {
            return ".jpg";
        }

        return fileName.substring(index);
    }

    /**
    * @Description: 生成新的文件名
    * @Param: [fileOriginName]
    * @return: java.lang.String
    */
    @Override
    public String getUUIDFileName(String fileOriginName){
        return getUUID() + getSuffix(fileOriginName);
    }

    /**
     * @Description: 生成UUID字符串
     * @Param: []
     * @return: java.lang.String
     */
    @Override
    public String getUUID(){
        return UUID.randomUUID().toString().replace("-", "");
    }
}
