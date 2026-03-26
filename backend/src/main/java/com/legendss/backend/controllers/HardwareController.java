package com.legendss.backend.controllers;

import com.legendss.backend.entities.WheelChair;
import com.legendss.backend.services.WheelChairService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/hardware")
public class HardwareController {

    private final WheelChairService wheelChairService;

    public HardwareController(WheelChairService wheelChairService) {
        this.wheelChairService = wheelChairService;
    }

    @PostMapping("/update")
    public ResponseEntity<String> receiveHardwareData(
            @RequestHeader(value = "X-Device-Token", required = false) String tokenHeader,
            @RequestParam(value = "token", required = false) String tokenParam,
            @RequestBody WheelChair payload) {

        String actualToken = tokenHeader != null ? tokenHeader : tokenParam;

        if (actualToken == null || actualToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Token requires");
        }

        try {
            wheelChairService.updateFromHardware(actualToken, payload);
            return ResponseEntity.ok("Received");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid Token");
        }
    }
}

