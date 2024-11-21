package com.spring.be_booktours.entities.sub_entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRide {
    private String bookRideId; // Mã lượt đặt
    private Date bookingDate; // Ngày đặt
    private String address; // Địa chỉ rước/đến
    private boolean airfieldToAddress; // true: rước từ sân bay, false: đến sân bay
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDate pickUpDate; // Ngày rước
    @JsonFormat(pattern = "HH:mm")
    private LocalTime pickUpTime; // Giờ rước
    private String vehicleId; // Mã phương tiện
    private int quantityVehicle; // Số lượng phương tiện
    private double totalCost; // Tổng chi phí
    // Thông tin người đặt
    private String bookerEmail; // Email người đặt
    private String bookerName; // Tên người đặt
    private String bookerPhone; // Số điện thoại người đặt
}
