package com.spring.be_booktours.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.dtos.tour.DefaultTour;
import com.spring.be_booktours.entities.Tour;
import com.spring.be_booktours.services.TourService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/admin/tour")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
public class AdminTourController {

    @Autowired
    private TourService tourService;

    @PostMapping
    public ResponseEntity<?> createDefaultTour(@Valid @RequestBody DefaultTour defaultTour) {
        return ResponseEntity.ok(tourService.createDefaultTour(defaultTour));
    }

    @PutMapping("{tourId}")
    public ResponseEntity<?> updateTour(@PathVariable String tourId, @RequestBody Tour updatedTour) {
        return ResponseEntity.ok(tourService.updateTour(tourId, updatedTour));
    }

    @PutMapping("/confirm/{tourId}/{bookingCode}")
    public ResponseEntity<?> confirmTour(@PathVariable String tourId, @PathVariable String bookingCode) {
        return ResponseEntity.ok(tourService.confirmTour(tourId, bookingCode));
    }


    // Thống kê

    // Tìm ra 3 tour có doanh thu cao nhất, trả về mã, tên và doanh thu của tour đó
    @GetMapping("/top-revenue")
    public ResponseEntity<?> getTopRevenueTours() {
        return ResponseEntity.ok(tourService.getTopRevenueTours());
    }

    // Tính tổng doanh thu trong n ngày gần nhất
    @GetMapping("/total-revenue")
    public ResponseEntity<?> getTotalRevenue(@RequestParam(defaultValue = "7", required = false) int days) {
        return ResponseEntity.ok(tourService.getTotalRevenue(days));
    }

    // Số lượng tour đã được đặt trong n ngày gần nhất(á đù, biết luôn hả)
    @GetMapping("/total-booked-tours")
    public ResponseEntity<?> getTotalBookedTours(@RequestParam(defaultValue = "7", required = false) int days) {
        return ResponseEntity.ok(tourService.getTotalBookedTours(days));
    }

    // Tính doanh thu trong n ngày gần nhất
    @GetMapping("/revenue-by-day")
    public ResponseEntity<?> getRevenueByDay(@RequestParam(defaultValue = "7", required = false) int days
    ) {
        return ResponseEntity.ok(tourService.getRevenueByDay(days));
    }

    // Lọc ra 10 tour được đặt nhiều nhất sắp xếp theo lượt đăng ký giảm dần
    @GetMapping("/top-booked-tours")
    public ResponseEntity<?> getTopBookedTours() {
        return ResponseEntity.ok(tourService.getTopBookedTours());
    }

    // Đếm số lượng đặt tour theo từng miền
    @GetMapping("/total-booked-tours-by-region")
    public ResponseEntity<?> getTotalBookedToursByRegion() {
        return ResponseEntity.ok(tourService.getTotalBookedToursByRegion());
    }

    // Doanh thu trong 7 ngày gần nhất
    @GetMapping("/total-booking-of-7-days")
    public ResponseEntity<?> gettotalBookedOf7Days() {
        return ResponseEntity.ok(tourService.gettotalBookedOf7Days());
    }

    // Lọc ra 5 tour có đánh giá tích cực nhất
    @GetMapping("/top-positive-rating-tours")
    public ResponseEntity<?> getTopPositiveRatingTours() {
        return ResponseEntity.ok(tourService.getTopPositiveRatingTours());
    }

    // Tour được đặt nhiều nhất trong tháng
    @GetMapping("/max-booked-tour-of-month")
    public ResponseEntity<?> getMaxBookedTourOfMonth() {
        return ResponseEntity.ok(tourService.getMaxBookedTourOfMonth());
    }

}
