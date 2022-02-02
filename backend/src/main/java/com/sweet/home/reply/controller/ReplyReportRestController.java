package com.sweet.home.reply.controller;

import com.sweet.home.reply.service.ReplyReportService;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/replies")
public class ReplyReportRestController {

    private final ReplyReportService replyReportService;

    public ReplyReportRestController(ReplyReportService replyReportService) {
        this.replyReportService = replyReportService;
    }

    @PostMapping("/{replyId}/reports")
    public ResponseEntity<Void> reportReply(@AuthenticationPrincipal String email, @PathVariable Long replyId, @RequestBody
        ReportSaveRequest request){
        replyReportService.reportReply(email, replyId, request);
        return ResponseEntity.noContent().build();
    }
}
