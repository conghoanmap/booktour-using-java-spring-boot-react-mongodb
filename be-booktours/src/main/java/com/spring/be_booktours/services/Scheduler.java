package com.spring.be_booktours.services;

import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class Scheduler {

    Logger logger = Logger.getLogger(Scheduler.class.getName());

    @Autowired
    private DataService dataService;

    // Back up dữ liệu lúc 9 giờ tối mỗi ngày
    @Scheduled(cron = "0 0 21 * * ?")
    public void backupData() {
        dataService.backupData("D:\\backupmongodb");
        try {
            dataService.backupData("D:\\backupmongodb");
            logger.info("Backup data successfully at " + System.currentTimeMillis());
        } catch (Exception ex) {
            logger.info("Backup data failed at " + System.currentTimeMillis() + "(" + ex.getMessage() + ")");
        }
    }

}
