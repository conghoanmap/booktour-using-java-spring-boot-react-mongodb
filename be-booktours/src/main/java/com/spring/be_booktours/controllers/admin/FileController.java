package com.spring.be_booktours.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.be_booktours.services.FileService;

@RestController
@RequestMapping("/api/v1/admin/file")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(fileService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("files") MultipartFile[] files) {
        return ResponseEntity.ok(fileService.upload(files));
    }

    @DeleteMapping("{fileName}")
    public ResponseEntity<?> delete(@PathVariable String fileName) {
        return ResponseEntity.ok(fileService.delete(fileName));
    }

}
