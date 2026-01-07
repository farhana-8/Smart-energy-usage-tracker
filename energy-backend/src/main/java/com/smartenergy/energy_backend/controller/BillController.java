package com.smartenergy.energy_backend.controller;

import com.smartenergy.energy_backend.model.EnergyUsage;
import com.smartenergy.energy_backend.repository.EnergyUsageRepository;
import com.smartenergy.energy_backend.service.BillPdfService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayInputStream;
@RestController
@RequestMapping("/api/bill")
@CrossOrigin
public class BillController {
        private final EnergyUsageRepository usageRepo;
        private final BillPdfService pdfService;

        public BillController(EnergyUsageRepository usageRepo, BillPdfService pdfService) {
            this.usageRepo = usageRepo;
            this.pdfService = pdfService;
        }

        @GetMapping("/download/{id}")
        public ResponseEntity<InputStreamResource> downloadBill(@PathVariable Long id) {

            EnergyUsage usage = usageRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Bill not found"));

            ByteArrayInputStream pdf = pdfService.generateBillPdf(usage);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=bill.pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new InputStreamResource(pdf));
        }
}

