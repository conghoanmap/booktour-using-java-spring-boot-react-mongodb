package com.spring.be_booktours.entities;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Loại bỏ các trường null khi trả về response
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "files")
public class File {
    private String fileId;
    private String fileName;
    private String fileType;
    private long size;
    private String url;
    private Date uploadDate;
}
