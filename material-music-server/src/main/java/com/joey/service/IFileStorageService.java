package com.joey.service;

import com.joey.common.properties.FileStorageProperties;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IFileStorageService {
    String storeFile(MultipartFile file, String fileName);

    Resource loadFileAsResource(String fileName);

    String getFileUrl(String mapping, String fileName);

    String getSuffix(String fileName);

    String getUUIDFileName(String fileOriginName);

    String getUUID();
}
