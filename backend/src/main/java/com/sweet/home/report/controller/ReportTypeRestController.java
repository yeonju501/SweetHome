package com.sweet.home.report.controller;

import com.sweet.home.report.controller.dto.response.ReportTypeResponse;
import com.sweet.home.report.domain.ReportType;
import com.sweet.home.report.service.ReportTypeService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boards/articles")
public class ReportTypeRestController {

    private final ReportTypeService reportTypeService;

    public ReportTypeRestController(ReportTypeService reportTypeService) {
        this.reportTypeService = reportTypeService;
    }

    @GetMapping("/reporttypes")
    public ResponseEntity<List<ReportTypeResponse>> getReportTypes() {
        return ResponseEntity.ok().body(reportTypeService.getReportTypes());
    }
}
