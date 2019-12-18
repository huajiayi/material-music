package com.joey;

import com.joey.common.properties.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class CloudMusicServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudMusicServerApplication.class, args);
    }

}
