package com.spring.be_booktours.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.be_booktours.entities.File;

@Repository
public interface FileRepository extends MongoRepository<File, String> {
    Optional<File> findByFileName(String fileName);
    void deleteByFileName(String fileName);
}
