package com.spring.be_booktours.services;

import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.entities.File;
import com.spring.be_booktours.repositories.FileRepository;

@Service
public class FileService {

    // Đường dẫn đến thư mục static/images trong project
    private static String UPLOAD_DIR = "src/main/resources/static/files/";
    @Autowired
    private FileRepository fileRepository;

    public MyResponse<List<File>> upload(MultipartFile[] files) {
        MyResponse<List<File>> response = new MyResponse<>();
        List<File> savedFiles = new ArrayList<>();
        try {
            // Duyệt qua từng file trong mảng files
            for (MultipartFile file : files) {
                File fileUpload = new File();

                // Kiểm tra định dạng file
                List<String> imageTypes = List.of("image/jpeg", "image/png", "image/gif");
                if (imageTypes.contains(file.getContentType())) {
                    fileUpload.setFileType("Hình ảnh");
                } else {
                    fileUpload.setFileType("Khác");
                }

                // File không được lớn hơn 2MB
                if (file.getSize() > 5 * 1024 * 1024) {
                    response.setStatus(400);
                    response.setMessage(
                            "Lỗi: File " + file.getOriginalFilename() + " quá lớn, vui lòng chọn file dưới 2MB");
                    return response;
                }

                // Xử lý và lưu từng file
                String id = UUID.randomUUID().toString();
                String fileName = id + "_" + file.getOriginalFilename();

                // Kiểm file có kí tự khoảng trắng không
                if (fileName.contains(" ")) {
                    fileName = fileName.replace(" ", "_");
                }

                long size = file.getSize();
                byte[] bytes = file.getBytes();
                Path path = Paths.get(UPLOAD_DIR + fileName);

                // Lưu file vào thư mục
                Files.write(path, bytes);

                // Tạo url để truy cập file
                String url = "http://localhost:8081/files/" + fileName;

                // Tạo đối tượng Image

                fileUpload.setFileName(fileName);
                fileUpload.setSize(size);
                fileUpload.setUrl(url);
                fileUpload.setUploadDate(new Date());

                // Lưu Image vào database
                File savedFile = fileRepository.save(fileUpload);
                if (savedFile == null) {
                    response.setStatus(500);
                    response.setMessage("Lỗi: Không thể lưu file " + fileName);
                    return response;
                } else {
                    savedFiles.add(savedFile);
                }
            }

            // Nếu lưu thành công tất cả các file
            response.setStatus(200);
            response.setMessage("Tất cả file đã được lưu thành công");
            response.setData(savedFiles);

        } catch (Exception e) {
            response.setStatus(500);
            response.setMessage("Gặp gián đoạn khi upload file(" + e.getMessage() + ")");
        }
        return response;
    }

    public MyResponse<?> delete(String fileName) {
        MyResponse<?> response = new MyResponse<>();
        try {
            // Tìm File theo tên
            Optional<File> optionalFile = fileRepository.findByFileName(fileName);
            if (!optionalFile.isPresent()) {
                response.setStatus(404);
                response.setMessage("Lỗi: Không tìm thấy file với tên: " + fileName);
                return response;
            }

            // Xóa file trong thư mục
            Path path = Paths.get(UPLOAD_DIR + optionalFile.get().getFileName());
            Files.delete(path);

            // Xóa Image trong database
            fileRepository.deleteByFileName(optionalFile.get().getFileName());

            response.setStatus(200);
            response.setMessage("Xóa file thành công");

        } catch (Exception ex) {
            response.setStatus(500);
            response.setMessage("Lỗi: " + ex.getMessage());
        }
        return response;
    }

    public MyResponse<List<File>> getAll() {
        MyResponse<List<File>> response = new MyResponse<>();
        try {
            List<File> files = fileRepository.findAll();
            response.setStatus(200);
            response.setMessage("Lấy danh sách file thành công");
            response.setData(files);
        } catch (Exception e) {
            response.setStatus(500);
            response.setMessage("Lỗi: " + e.getMessage());
        }
        return response;
    }

}
