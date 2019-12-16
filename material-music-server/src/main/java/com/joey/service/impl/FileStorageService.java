package com.joey.service.impl;

import com.joey.common.exception.FileStorageException;
import com.joey.common.properties.FileStorageProperties;
import com.joey.common.response.Response;
import com.joey.service.IFileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
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
    public String storeFile(MultipartFile file, String fileName) {
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
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
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
    public String getFileUrl(String mapping, String fileName) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(mapping) // 和控制器对应路径相同
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
