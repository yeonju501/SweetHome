package com.sweet.home.report.service;

import com.sweet.home.report.controller.dto.response.ReportTypeResponse;
import com.sweet.home.report.domain.ReportTypeRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportTypeService {

    private final ReportTypeRepository reportTypeRepository;

    public ReportTypeService(ReportTypeRepository reportTypeRepository) {
        this.reportTypeRepository = reportTypeRepository;
    }

    @Transactional(readOnly = true)
    public List<ReportTypeResponse> getReportTypes() {
        return reportTypeRepository.findAll().stream()
            .map(ReportTypeResponse::from)
            .collect(Collectors.toList());
    }
}
